import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';
import * as GraphicsCategoryModel from '../../../common/models/graphics-category.json';
import {RadioGroup, Radio} from 'react-radio-group';
const GraphicsCategory = GraphicsCategoryModel.properties;
const location = '/files/thumb/';

const DELETE_CATEGORY = 'DELETE_CATEGORY';
const MOVE_GRAPHICS_TO_OTHER_CATEGORY = 'MOVE_GRAPHICS_TO_OTHER_CATEGORY';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    objectHolder: PropTypes.object,
    status: PropTypes.string.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired,
    setEditingObjectProperty: PropTypes.func.isRequired,
    restoreTableState: PropTypes.func.isRequired,
    uploadThumbnail: PropTypes.func.isRequired,
    deleteThumbnail: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };

  componentWillMount() {
    this.props.restoreTableState(GraphicsCategory);
    this.props.fetchData();
  }

  constructor() {
    super();
    this.state = {deleting: false, selectedValue: DELETE_CATEGORY, newGraphicsCategory: ''};
  }

  renderTableHeadings = object => (
    Object.getOwnPropertyNames(object).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      }
      if (prop === 'graphicsCategoryId') {
        return null;
      }
      return <th key={i}>{prop}</th>;

    })
  );

  handleSelectedObjectChange = (propertyName, event) => {
    this.props.setEditingObjectProperty(propertyName, event.target.value);
  };

  renderTableSortRow = object => (
    <tr key='sortRow'>
      {Object.getOwnPropertyNames(object).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        }
        if (prop === 'thumb') {
          return <th key={i}/>;
        }
        if (prop === 'graphicsCategoryId') {
          return null;
        }
        return <td key={i}>
          <FormControl type='text'
                       value={this.props.objectHolder[prop]}
                       onChange={e => this.handleSelectedObjectChange(prop, e)}
          />
        </td>;


      })}
    </tr>
  );

  sortRows = (data, object) => {
    const rows = [];
    for (let i = 0; i < data.length; ++i) {
      let add = true;
      Object.getOwnPropertyNames(object).map(prop => {
        if (typeof (this.props.data[i])[prop] === 'undefined') {
          add = this.props.objectHolder[prop] === '';
        } else if (typeof (data[i])[prop] === 'boolean') {
          add = true;
        } else if (!(data[i])[prop].includes(this.props.objectHolder[prop])) {
          add = false;
        }
      });

      if (add) {
        rows.push(data[i]);
      }
    }
    return rows;
  };

  renderTableData = (data, object) => {
    if (!data.length) {
      return null;
    }

    const rows = this.sortRows(data, object);

    return rows.map((item, k) => {

      return (
        <tr key={k}
            className={this.props.objectHolder && item[ID_PROP] === this.props.objectHolder.id ? 'selected' : null}
            onClick={() => this.handleEdit(item)}>
          {
            Object.getOwnPropertyNames(object).map((prop, j) => {
              if (prop === ID_PROP) {
                return null;
              }
              if (prop === 'thumb') {
                return <td key={j}><img src={location + item[prop]}/></td>;
              }
              if (prop === 'graphicsCategoryId') {
                return null;
              }
              return <td key={j}>{item[prop]}</td>;
            })
          }
        </tr>
      );
    });
  };


  renderTable = (data, object) => (
    <div className='panel panel-default'>
      <tb className='table-responsive'>
        <table className='table no-margin table-hover table-bordered'>
          <thead>
          <tr>
            {this.renderTableHeadings(object)}
          </tr>
          </thead>
          <tbody>
          {this.renderTableSortRow(object)}
          {this.props.status === STATUS_CREATING ? this.renderCreatingRow() : null}
          {this.renderTableData(data, object)}
          </tbody>
        </table>
      </tb>
    </div>
  );

  renderButtons = () => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      this.renderEditingButtons() : this.renderDefButtons()
  );

  renderDefButtons = () => (
    <div className='pull-right' style={{marginBottom: '3px'}}>
      <button type='button' className='btn btn-default'
              onClick={this.handleAddNew}>Add new category
      </button>
    </div>
  );

  renderEditingButtons = () => {
    if (this.state.deleting) {
      return (
        <div>
          <div className='pull-right'>
            <button type='button' className='btn btn-danger'
                    onClick={() => this.handleDeleteBtnClick(true)}>Delete
            </button>
            <button type='button' className='btn btn-default'
                    onClick={() => {
                      this.setState({...this.state, deleting: false});
                    }}>Cancel
            </button>
          </div>
        </div>
      );
    }
    return (<div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(true)}>Save
        </button>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(false)}>Save and
          continue edit
        </button>
        <button type='button' className='btn btn-danger'
                onClick={this.handleDeleteBtnClick}>Delete
        </button>
      </div>
    </div>)
  };

  renderCreatingButtons = () => (
    <div>
      <div className='pull-left'>
        <button type='button' className='btn btn-default'
                onClick={this.handleCancelBtnClick}>Cancel
        </button>
      </div>
      <div className='pull-right'>
        <button type='button' className='btn btn-primary'
                onClick={() => this.handleSaveBtnClick(true)}>Save
        </button>
      </div>
    </div>
  );

  handleEdit = object => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing(GraphicsCategory);
      this.props.selectRow(object);
    }
  };

  handleAddNew = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating(GraphicsCategory);
    }
  };

  handleDeleteBtnClick = (confirmed) => {
    if (this.props.status === STATUS_EDITING) {
      this.props.fetchData();
      if (this.state.deleting && confirmed) {
        if (this.state.selectedValue === DELETE_CATEGORY) {
          this.props.data.map(c => {
            if (c.graphicsCategoryId === this.props.objectHolder.id) {
              this.props.deleteEntity(c.id, this.props.token);
              this.props.deleteThumbnail(c.thumb);
            }
          });
        } else if (this.state.selectedValue === MOVE_GRAPHICS_TO_OTHER_CATEGORY) {
          this.props.data.map(c => {
            if (c.graphicsCategoryId === this.props.objectHolder.id) {
              this.props.editEntity(c.id, {...c, graphicsCategoryId: this.state.newGraphicsCategory}, this.props.token);
            }
          });
        }
        this.props.deleteEntity(this.props.objectHolder.id, this.props.token);
        this.props.deleteThumbnail(this.props.objectHolder.thumb);
        this.props.enableDefaultStatus();
        this.props.restoreTableState(GraphicsCategory);
        this.setState({...this.state, deleting: false});
      } else {
        this.setState({...this.state, deleting: true});
      }
    }
  };

  handleSaveBtnClick = redirect => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(GraphicsCategory);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
        if (prop === 'thumb') {
          if (this.props.objectHolder[prop] !== undefined) {
            this.handleFileUpload();
            entity[prop] = this.props.objectHolder[prop].name;
            this.props.data.map(c => {
              if (c.id === this.props.objectHolder[ID_PROP]) {
                console.log(c.thumb);
                this.props.deleteThumbnail(c.thumb);
              }
            });
          }
        }
      });
      this.props.editEntity(this.props.objectHolder.id, entity, this.props.token);
      if (redirect) {
        this.props.enableDefaultStatus();
        this.props.restoreTableState(GraphicsCategory);
      }
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(GraphicsCategory);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = this.props.objectHolder[prop] || undefined;
        }
        if (prop === 'thumb') {
          if (this.props.objectHolder[prop] !== undefined) {
            this.handleFileUpload();
            entity[prop] = this.props.objectHolder[prop].name;
          }
        }
      });
      this.props.createEntity(entity, this.props.token);
      this.props.enableDefaultStatus();
      this.props.restoreTableState(GraphicsCategory);
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
      this.props.restoreTableState(GraphicsCategory);
    }
  };

  handleCategoryActionOption = option => {
    if (this.state.deleting) {
      this.setState({...this.state, selectedValue: option});
    }
  };
  handleMoveToCategory = e => {
    if (this.state.deleting) {
      this.setState({...this.state, newGraphicsCategory: e.target.value});
    }
  };

  renderDelete = () => {
    if (this.state.deleting) {
      return (
        <div className='form-group'>
          <div className='col-md-3'>
          </div>
          <div className='col-md-6'>
            <h1>Choose an action</h1>
            <div className='form-group'>
              <RadioGroup name='fruit' selectedValue={this.state.selectedValue}
                          onChange={this.handleCategoryActionOption}>
                <div className='form-group'>
                  <Radio value={DELETE_CATEGORY}/>&nbsp; Delete all the category linked to this category
                </div>
                <div className='form-group'>
                  <Radio value={MOVE_GRAPHICS_TO_OTHER_CATEGORY}/>&nbsp; Move category to other category &nbsp;
                  <select
                    value={this.state.newGraphicsCategory}
                    onChange={this.handleMoveToCategory}>
                    <option key='rootCategory' value={' '}>Root category</option>
                    {this.props.data.map((cg, key) => (
                      this.props.objectHolder[ID_PROP] !== cg.id ?
                        this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                          <option key={key} value={cg.id}>{cg.name}</option> :
                          <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
                    ))}
                  </select>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className='col-md-3'>
          </div>
        </div>
      );
    }
  };

  renderInputs = () => (
    Object.getOwnPropertyNames(GraphicsCategory).map((prop, key) => {
      if (prop === ID_PROP) {
        return null;
      }
      if (prop === 'graphicsCategoryId') {
        return <div key={key} className='form-group'>
          <div className='col-md-2'>
            Parent Category
          </div>
          <div className='col-md-10'>
            <select onChange={e => this.handleSelectedObjectChange(prop, e)}
                    value={this.props.objectHolder[prop]}>
              <option key='rootCategory' value={' '}>Root category</option>
              {this.props.data.map((cg, key) => (
                this.props.objectHolder[ID_PROP] !== cg.id ?
                  this.props.objectHolder[ID_PROP] !== cg.graphicsCategoryId ?
                    <option key={key} value={cg.id}>{cg.name}</option> :
                    <option disabled='disabled' key={key} value={cg.id}>{cg.name} </option> : null
              ))}
            </select>
          </div>
        </div>;
      }
      if (prop === 'thumb') {
        return ( <div key={key} className='form-group'>
          <div className='col-md-2'>
            {prop}
          </div>
          <div className='col-md-10'>
            <input type='file' className='form-control' accept='image/*'
                   onChange={e => this.handleFileChoose(prop, e)}/>
          </div>
          <div className='col-md-2'>
          </div>
          <div className='col-md-10'>
            {!this.props.objectHolder[prop].name && this.props.status === STATUS_EDITING ?
              <div style={{float: 'left'}} className='box-body'><img src={location + this.props.objectHolder[prop]}/>
              </div>
              : null}
            <div style={{float: 'left'}} className='box-body'>
              <canvas ref='canvas' width='100' height='100'/>
            </div>
          </div>
        </div>);
      }
      return (
        <div key={key} className='form-group'>
          <div className='col-md-2'>
            {prop}
          </div>
          <div className='col-md-10'>
            <input type='text' className='form-control'
                   value={this.props.objectHolder[prop]}
                   onChange={e => this.handleSelectedObjectChange(prop, e)}/>
          </div>
        </div>
      );

    })
  );
  handleFileUpload = () => {
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const c = this.refs.canvas;
      const image = this.props.objectHolder['thumb'];
      const uploadThumbnail = (file) => {
        this.props.uploadThumbnail(file);
      };
      c.toBlob(function (blob) {
        blob.name = image.name;
        uploadThumbnail(blob);
      }, 'image/*', 0.95);
    }
  };
  handleFileChoose = (prop, e) => {
    this.props.setEditingObjectProperty(prop, e.target.files[0]);
    if (this.props.status === STATUS_CREATING || this.props.status === STATUS_EDITING) {
      const prop = 'thumb';
      const image = this.props.objectHolder[prop];
      const img = new Image();
      let imageOut = new Image();
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(image);
      const c = this.refs.canvas;
      const ctx = c.getContext("2d");
      img.onload = function () {
        imageOut = ctx.drawImage(img, 0, 0, 100, 100);
      };
    }
  };

  renderPage = () => {
    if (this.props.status === STATUS_DEFAULT) {
      return this.renderDefault();
    } else if (this.props.status === STATUS_CREATING) {
      return this.renderCreating();
    } else if (this.props.status === STATUS_EDITING) {
      return this.renderEditing();
    }
  };

  renderDefault = () => (
    <section className='content'>
      <div className='row'>
        <div className='col-md-6'>
          <p>{this.props.title + ': ' + this.props.data.length}</p>
        </div>
        <div className='col-md-6'>
          {this.renderDefButtons()}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          {this.renderTable(this.props.data, GraphicsCategory)}
        </div>
      </div>
    </section>
  );

  renderCreating = () => (
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Graphics Category information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {this.renderInputs()}
                </div>
                <div className='box-footer'>
                  {this.renderCreatingButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

    </section>
  );

  renderEditing = () => (
    <section>
      <div className='row'>
        <div className='col-md-12'>
          <section className='content'>
            <div className='box box-info'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Graphics Category information</h3>
              </div>
              <form className='form-horizontal'>
                <div className='box-body'>
                  {!this.state.deleting ? this.renderInputs() : this.renderDelete()}
                </div>
                <div className='box-footer'>
                  {this.renderEditingButtons()}
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </section>
  );

  render() {
    const {loading, errors} = this.props;

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

    return (
      <main>
        <div className='content-header'>
          <h1>Navigator</h1>
        </div>
        {
          errors.length === 0 ? null : errors.map((err, k) => <div key={k} className='alert alert-danger'>Error:
              {err}</div>)
        }
        {this.renderPage()}
      </main>
    );
  }
}
