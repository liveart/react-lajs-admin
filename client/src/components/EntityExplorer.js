import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Table, FormControl} from 'react-bootstrap';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

export default class EntityExplorer extends Component {
  static propTypes = {
    selectedRowId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    entitiesList: PropTypes.array.isRequired,
    error: PropTypes.string,
    fetchEntities: PropTypes.func.isRequired,
    selectRow: PropTypes.func.isRequired,
    enableEditing: PropTypes.func.isRequired,
    enableCreating: PropTypes.func.isRequired,
    enableUploading: PropTypes.func.isRequired,
    enableDefaultStatus: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    editEntity: PropTypes.func.isRequired,
    deleteEntity: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.editingEntityInput = {};
    this.newEntityInput = {};
    this.props.fetchEntities();
  }

  renderEntitiesTableHeading = entities => {
    if (!entities.length) {
      return null;
    }
    return Object.getOwnPropertyNames(entities[0]).map((prop, i) => (<th key={i}>{prop}</th>));
  };

  renderCreatingRow = entities => {
    if (!entities.length) {
      return null;
    }

    return (<tr>{Object.getOwnPropertyNames(entities[0]).map((prop, i) => {
      if (prop === ID_PROP) {
        return null;
      }

      return (<td key={i}><FormControl type="text" ref={input => this.newEntityInput[prop] = input}/>
      </td>);
    })
    }</tr>);
  };

  renderEntitiesTableContents = entities => {
    if (!entities.length) {
      return null;
    }

    return entities.map(item => {
      if (this.props.status === STATUS_EDITING && item[ID_PROP] === this.props.selectedRowId) {
        return (
          <tr key={item[ID_PROP]}
              onClick={() => this.handleRowClick(item[ID_PROP])}>
            {Object.getOwnPropertyNames(entities[0]).map((prop, j) => {
              if (prop === ID_PROP) {
                return (
                  <td key={j}>{item[prop]}</td>
                );
              }

              return (
                <td key={j}><FormControl type="text"
                                         defaultValue={typeof item[prop] === 'object' && !item[prop] ? '' :
                                           item[prop]}
                                         ref={input => this.editingEntityInput[prop] = input}/>
                </td>
              );
            })}
          </tr>
        );
      }

      return (
        <tr key={item[ID_PROP]} className={item[ID_PROP] === this.props.selectedRowId ? 'selected' : null}
            onClick={() => this.handleRowClick(item[ID_PROP])}>
          {Object.getOwnPropertyNames(entities[0]).map((prop, j) => (<td key={j}>{item[prop]}</td>))}
        </tr>
      );
    });
  };

  renderEntitiesTable = entities => (
    <Table responsive hover fill>
      <thead>
      <tr>{this.renderEntitiesTableHeading(entities)}</tr>
      </thead>
      <tbody>
      {this.props.status === STATUS_CREATING ? this.renderCreatingRow(entities) : null}
      {this.renderEntitiesTableContents(entities)}
      </tbody>
    </Table>
  );

  renderButtons = () => (this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
    this.renderEditingButtons() : this.renderDefButtons());

  renderDefButtons = () => (
    <div className="box-tools">
      <button className="btn" title="Add" onClick={this.handleCreateBtnClick}><i className="fa fa-plus"/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn" title="AddWOFF" onClick={this.handleFileBtnClick}><i className="fa fa-file"/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn" title="Edit" onClick={this.handleEditBtnClick}>
        <i className="fa fa-pencil-square-o"/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn btn-danger" title="Delete" onClick={this.handleDeleteBtnClick}>
        <i className="fa fa-trash-o"/></button>
    </div>
  );

  renderEditingButtons = () => (
    <div className="box-tools">
      <button className="btn btn-success" title="Save" onClick={this.handleSaveBtnClick}>
        <i className="fa fa-check"/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn btn-danger" title="Cancel" onClick={this.handleCancelBtnClick}>
        <i className="fa fa-ban"/></button>
    </div>
  );

  handleRowClick = id => {
    if (this.props.selectedRowId !== id) {
      this.props.selectRow(id);
    }
  };

  handleCreateBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating();
    }
  };


  handleEditBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT && this.props.selectedRowId > -1) {
      this.props.enableEditing();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT && this.props.selectedRowId > -1) {
      this.props.deleteEntity(this.props.selectedRowId);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.status === STATUS_EDITING && this.props.selectedRowId > -1 && this.props.entitiesList.length) {
      const properties = Object.getOwnPropertyNames(this.props.entitiesList[0]);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.editingEntityInput[prop]).value || undefined;
        }
      });
      this.props.editEntity(this.props.selectedRowId, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(this.props.entitiesList[0]);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.newEntityInput[prop]).value || undefined;
        }
      });
      this.props.createEntity(entity);
    }
    this.props.enableDefaultStatus();
  };

  handleCancelBtnClick = () => {
    if (this.props.status !== STATUS_DEFAULT) {
      this.props.enableDefaultStatus();
    }
  };

  render() {
    const {entitiesList, loading, error} = this.props;
    if (loading) {
      return (
        <main>
          <div className="loader"></div>
          <section className="content-header">
            <h1>Loading...</h1>
          </section>
          <section className="content">
          </section>
        </main>
      );
    }

    if (error) {
      return (<div className="alert alert-danger">Error: {error}</div>);
    }

    return (
      <main>
        <section className="content-header">
          <h1>Navigator</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="box box-default">
                <div className="box-header with-border">
                  <h3 className="box-title">Fonts</h3>
                  {this.renderButtons()}
                </div>
                <div className="box-body" style={{'maxHeight': '80vh', 'overflowY': 'scroll'}}>
                  {this.renderEntitiesTable(entitiesList)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
