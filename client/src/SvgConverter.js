var path = require('path'),
  xpath = require('xpath'),
  dom = require('xmldom').DOMParser;

function getAttribute(node, name) {
  let attribs = node.attributes;
  for (let k = 0; k < attribs.length; k++) {
    if (attribs[k].name === name) {
      return attribs[k];
    }
  }
  return null;
}

export function processSVGContent(fileContents) {
  let doc = new dom().parseFromString(fileContents);

  // 2. Converting fill attribute to styles
  let nodes = xpath.select('//*[@fill]', doc);
  let j;
  for (j = 0; j < nodes.length; j++) {
    let fillAttrib = nodes[j].getAttribute('fill');
    let styleAttribute = getAttribute(nodes[j], 'style');
    if (styleAttribute) {
      if (!styleAttribute.endsWith(';')) {
        styleAttribute += ';';
      }
    } else {
      styleAttribute = '';
    }
    styleAttribute += 'fill: ' + fillAttrib + ';';
    nodes[j].setAttribute('style', styleAttribute);
    nodes[j].removeAttribute('fill');
  }

  // 3. Searching for fill attribute in styles
  nodes = xpath.select("//*[contains(@style,'fill:')]", doc);

  let classes = [];
  // 3.1 process selected nodes
  for (j = 0; j < nodes.length; j++) {
    let styleAttribute = getAttribute(nodes[j], 'style');
    if (styleAttribute) {
      // 3.1 Extracting fill value
      let styleValue = styleAttribute.value;
      let fillMatch = styleValue.match(/fill:\s*#......;/gi);
      if (!fillMatch) {
        fillMatch = styleValue.match(/fill:\s*#...;/gi);
      }
      if (fillMatch) {
        let fill = fillMatch[0];
        styleValue = styleValue.replace(fill, '');
        styleValue = styleValue.replace(/\s/g, '');
        if (styleValue.length === 4) {
          styleValue = styleValue[0] + styleValue[1] + styleValue[1] + styleValue[2] + styleValue[2]
            + styleValue[3] + styleValue[3];
        }

        let colorN = classes.indexOf(fill);
        if (colorN === -1) {
          classes.push(fill);
          colorN = classes.length;
        } else {
          colorN++;
        }
        // 3.2 Removing fill attribute from style
        nodes[j].setAttribute('style', styleValue);

        // 3.3 Adding proper class
        let styleAttribute = getAttribute(nodes[j], 'class');
        if (styleAttribute) {
          styleAttribute.value = styleAttribute.value + ' color' + colorN;
        } else {
          nodes[j].setAttribute('class', 'color' + colorN);
        }
      }
    }
  }
  // 4. Adding Style node
  let stylesString = '<style type="text/css">\n<![CDATA[\n';
  classes.forEach((c, z) => stylesString += ' .color' + (z + 1) + '{' + c + '}\n');
  stylesString += ']]></style>';
  let newDom = doc.toString();
  if (classes.length > 1) {
    doc.createElement(stylesString);
    const svgTagIndex = newDom.indexOf('<svg');
    let index = newDom.indexOf('>', svgTagIndex);
    if (index !== -1) {
      index += 1;
      newDom = newDom.substring(0, index) + stylesString + newDom.substring(index);
    }
  }
  newDom = clearSVG(newDom);
  const graphicObj = getGraphicObject(classes);
  console.warn(graphicObj);
  console.warn(newDom);
  return {graphicObj, newDom};
}

// clearing SVG string
function clearSVG(data) {
  //clear tabs and new line symbols
  data = data.replace(/(\r\n|\n|\r)/gm, '');

  // clearing extra nodes and attrs - desktop inkscape output
  data = data.replace(/sodipodi:(\w+)=\"([^\"]+)\"/ig, '');
  data = data.replace(/inkscape:(\w+)=\"([^\"]+)\"/ig, '');
  data = data.replace(/<inkscape([^>]+)\/>/ig, '');
  data = data.replace(/(<sodipodi([^>]+)>)/ig, '');
  data = data.replace(/(<\/sodipodi:([^>]+)>)/ig, '');

  // removing metadata tag
  data = removeTag(data, 'metadata');
  return data;
}

// removing tag from svg string
function removeTag(data, tagName) {
  do {
    const iStart = data.indexOf('<' + tagName);
    let iEnd = data.indexOf(tagName + '>');
    if (iStart !== -1 && iEnd !== -1) {
      iEnd += tagName.length + 1;
      data = data.substring(0, iStart) + data.substring(iEnd);
    } else {
      break;
    }
  } while (true);
  return data;
}

function getGraphicObject(classes) {
  const obj = {};
  if (classes.length > 1) {
    obj.multicolor = true;
    obj.colorizableElements = [
      ...classes.map((cl, i) => ({name: `Color ${i + 1}`, id: `.color${i + 1}`}))];
  } else {
    obj.colorize = true;
  }
  return obj;
}
