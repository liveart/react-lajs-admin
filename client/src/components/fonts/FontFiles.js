import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {saveAs} from 'file-saver';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import * as FontFileModel from '../../../../common/models/font-file.json';
const FontFile = FontFileModel.properties;
const location = 'url("//localhost:3000/files/woff/';
const locationEnd = '")';

export default class Table extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    selectedRowId: PropTypes.string,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    upload: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.editingEntityInput = {};
    this.newEntityInput = {};
    this.props.fetchData();
  }

  renderTableHeadings = object => {
    return Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return (
          null
        );
      } else {
        return (<th key={i}>{prop}</th>);
      }
    });
  };

  renderCreatingRow = () => {
    return (
      <tr>{Object.getOwnPropertyNames(FontFile).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        }

        if (prop === 'src') {
          return (<td key={i}><FormControl type="file" accept=".woff" id="woff"
                                           ref={input => this.newEntityInput[prop] = input}/>
          </td> );
        }
        return (<td key={i}><FormControl type='text' ref={input => this.newEntityInput[prop] = input}/>
        </td>);
      })}
      </tr>
    );
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    return data.map((item, k) => {

      if (this.props.status === STATUS_EDITING && item[ID_PROP] === this.props.selectedRowId) {
        return (
          <tr key={k}
              onClick={() => this.handleRowClick(item[ID_PROP])}>
            {Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              }

              return (
                <td key={j}><FormControl type='text'
                                         defaultValue={typeof item[prop] === 'object' && !item[prop] ? '' : item[prop]}
                                         ref={input => this.editingEntityInput[prop] = input}/>
                </td>
              );
            })}
          </tr>
        );
      }

      return (
        <tr key={k} className={item[ID_PROP] === this.props.selectedRowId ? 'selected' : null}
            onClick={() => this.handleRowClick(item[ID_PROP])}>
          {Object.getOwnPropertyNames(object).map((prop, j) => {
            if (prop === ID_PROP) {
              return null;
            } else {
              return <td key={j}>{item[prop]}</td>;
            }
          })}
        </tr>
      );
    });
  };

  renderTable = (data, object) => (
    <section className='panel panel-default'>
      <div style={{'maxHeight': '60vh', 'overflow': 'scroll'}}>
        <tb className='table-responsive'>
          <table className='table no-margin table-hover'>
            <thead>
            <tr>
              {this.renderTableHeadings(object)}
            </tr>
            </thead>
            <tbody>
            {this.props.status === STATUS_CREATING ? this.renderCreatingRow() : null}
            {this.renderTableData(data, object)}
            </tbody>
          </table>
        </tb>
      </div>
    </section>
  );

  renderButtons = () => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      this.renderEditingButtons() : this.renderDefButtons()
  );

  renderDefButtons = () => (
    <div className='pull-right'>
      <a className='btn btn-app' onClick={this.handleCreateBtnClick}><i className='fa fa-plus'/>Add
      </a>
      <a className='btn btn-app' onClick={this.handleEditBtnClick}><i className='fa fa-pencil-square-o'/>Edit
      </a>
      <a className='btn btn-app' onClick={this.handleDeleteBtnClick}><i className='fa fa-trash-o'/>Delete
      </a>
      <a className='btn btn-app' onClick={this.handleCSSDownloadBtnClick}><i className='fa fa-file-o'/>Download CSS
      </a>
      <a className='btn btn-app' onClick={() => {
        this.props.fetchData();
      }}>
        <i className='fa fa-refresh'/>Sync
      </a>
    </div>
  );

  renderEditingButtons = () => (
    <div className='pull-right'>
      <a className='btn btn-app' onClick={this.handleSaveBtnClick }><i className='fa fa-check'/>Save</a>
      <a className='btn btn-app' onClick={this.handleCancelBtnClick}><i className='fa fa-ban'/>Cancel</a>
    </div>
  );

  handleRowClick = id => {
    if (this.props.status !== STATUS_EDITING) {
      this.props.selectRow(id);
    }
  };

  handleCreateBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating();
    }
  };

  handleEditBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT
      && !(typeof this.props.selectedRowId === 'object' && !this.props.selectedRowId)) {
      this.props.enableEditing();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
       // const filePath = this.props.fetchOneData(this.props.selectedRowId);
       //console.log(filePath);
       // const leafname = filePath.split('url("//localhost:3000/files/woff/').pop().split('")');
        //console.log(filePath);
     //   console.log(leafname[0]);
      this.props.deleteEntity(this.props.selectedRowId);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(FontFile);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.editingEntityInput[prop]).value || undefined;
        }
      });
      this.props.editEntity(this.props.selectedRowId, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(FontFile);
      const entity = {};
      const inputFile = document.getElementById('woff').files;
      const file = inputFile[0];
      this.handleFileBtnClick(file);
      properties.forEach(prop => {
        if (prop !== ID_PROP && prop !== 'src') {
          entity[prop] = findDOMNode(this.newEntityInput[prop]).value || undefined;
        }
        if (prop === 'src') {
          entity[prop] = location + file.name + locationEnd;
        }

      });
      this.props.createEntity(entity);
    }
    this.props.enableDefaultStatus();
    setTimeout(this.props.fetchData, 1000);
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
    }
  };

  handleCSSDownloadBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      const fonts = this.props.data;
      const properties = Object.getOwnPropertyNames(FontFile);
      const data = [];
      fonts.forEach(prop => {
        data.push('@font-face \n');
        data.push(JSON.stringify(prop));
        data.push('\n');
      });

      //properties.forEach(prop => {
        //data.push(prop + JSON.stringify(fonts[prop]));
      //});

      const blob = new Blob(data, {type: "font/css"});
      saveAs(blob, "fonts.css");
    }
  };

  handleFileBtnClick = (file) => {
    if (this.props.status === STATUS_CREATING) {
      this.props.upload(file);
    }
  };

  render() {
    const {data, loading, error, title} = this.props;

    if (loading) {
      return (
        <main>
          <div className='loader'></div>
          <section className='content-header'>
            <h1>Loading...</h1>
          </section>
          <section className='content'>
          </section>
        </main>
      );
    }

    if (error) {
      return (<div className='alert alert-danger'>Error: {error}</div>);
    }

    return (
      <main>
        <section className='content-header'>
          <h1>Navigator</h1>
        </section>
        <section className='content'>
          <div className='row'>
            <div className='col-lg-12'>
              {this.renderTable(data, FontFile)}
              {this.renderButtons()}
              <p>{title + ': ' + data.length}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
