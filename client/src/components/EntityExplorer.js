import React, {Component, PropTypes} from 'react';
import {Panel, Table, FormControl} from 'react-bootstrap';
import {ID_PROP} from '../definitions';

export default class EntityExplorer extends Component {
  static propTypes = {
    selectedRowId: PropTypes.number.isRequired,
    editing: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    entitiesList: PropTypes.array.isRequired,
    error: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchEntities();
  }

  renderEntitiesTableHeading = entities => {
    if (!entities.length) {
      return null;
    }
    return Object.getOwnPropertyNames(entities[0]).map((prop, i) => (<th key={i}>{prop}</th>));
  };

  renderEntitiesTableContents = entities => {
    if (!entities.length) {
      return null;
    }

    return entities.map(item => {
      if (this.props.editing && item[ID_PROP] === this.props.selectedRowId) {
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
                                         defaultValue={typeof item[prop] === 'object' && !item[prop] ? '' : item[prop]}/>
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
      <tr>
        {this.renderEntitiesTableHeading(entities)}
      </tr>
      </thead>
      <tbody>
      {this.renderEntitiesTableContents(entities)}
      </tbody>
    </Table>
  );

  renderButtons = () => (this.props.editing ? this.renderEditingButtons() : this.renderDefButtons());

  renderDefButtons = () => (
    <div className="well well-sm">
      <a className="btn btn-success" href="#" aria-label="Add">
        <i className="fa fa-plus" aria-hidden="true"/>
      </a>
      <div className="pull-right">
        <a className="btn btn-primary" href="#" aria-label="Edit" onClick={this.handleEditBtnClick}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"/>
        </a>
        <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
        <a className="btn btn-danger" href="#" aria-label="Delete" onClick={this.handleDeleteBtnClick}>
          <i className="fa fa-trash-o" aria-hidden="true"/>
        </a>
      </div>
    </div>
  );

  renderEditingButtons = () => (
    <div className="well well-sm">
      <a className="btn btn-success" href="#" aria-label="Save" onClick={this.handleSaveBtnClick}>
        <i className="fa fa-check" aria-hidden="true"/>
      </a>
      <div className="pull-right">
        <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
        <a className="btn btn-danger" href="#" aria-label="Cancel" onClick={this.handleCancelBtnClick}>
          <i className="fa fa-ban" aria-hidden="true"/>
        </a>
      </div>
    </div>
  );

  handleRowClick = id => {
    this.props.selectRow(id);
  };

  handleEditBtnClick = () => {
    if (this.props.selectedRowId > -1) {
      this.props.enableEditing();
    }
  };

  handleDeleteBtnClick = () => {
    if (!this.props.editing && this.props.selectedRowId > -1) {
      this.props.deleteEntity(this.props.selectedRowId);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.selectedRowId > -1) {
      //this.props.enableEditing();
    }
  };

  handleCancelBtnClick = () => {
    if (this.props.editing) {
      this.props.disableEditing();
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
      return (<div className="alert alert-danger">Error: {error.message}</div>);
    }

    return (
      <main>
        <section className="content-header">
          <h1>Navigator</h1>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              {this.renderButtons()}
              <Panel collapsible defaultExpanded style={{'maxHeight': '80vh', 'overflowY': 'scroll'}}
                     header="Available">
                {this.renderEntitiesTable(entitiesList)}
              </Panel>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
