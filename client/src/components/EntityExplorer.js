import React, {Component} from 'react';
import {Panel, Table} from 'react-bootstrap';
import {ID_PROP} from '../definitions';

export default class EntityExplorer extends Component {
  componentWillMount() {
    this.props.fetchEntities();
  }

  renderEntitiesTableHeading(entities) {
    if (!entities.length) {
      return null;
    }

    return Object.getOwnPropertyNames(entities[0]).map((prop, i) => (<th key={i}>{prop}</th>));
  }

  renderEntitiesTableContents(entities) {
    if (!entities.length) {
      return null;
    }

    return entities.map(item => (
        <tr key={item[ID_PROP]} className={item[ID_PROP] === this.props.selectedRowId ? 'selected' : 'asd'}
            onClick={() => this.handleRowClick(item[ID_PROP])}>
          {Object.getOwnPropertyNames(entities[0]).map((prop, j) => (<td key={j}>{item[prop]}</td>))}
        </tr>
      )
    );
  }

  renderEntitiesTable(entities) {
    return (
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
  }

  handleRowClick(id) {
    this.props.selectRow(id);
  }

  render() {
    const {entitiesList, loading, error} = this.props;

    if (loading) {
      return (
        <main>
          <section className="content-header">
            <h1>Loading</h1>
          </section>
          <section className="content">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
            <span className="sr-only">Loading...</span>
          </section>
        </main>
      );
    } else if (error) {
      return (<div className="alert alert-danger">Error: {error.message}</div>);
    }

    return (
      <main>
        <section className="content-header">
          <h1>Navigator</h1>
        </section>
        <section className="content" style={{'minHeight': '100vh'}}>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="well well-sm">
                <a className="btn btn-success" href="#" aria-label="Add">
                  <i className="fa fa-plus" aria-hidden="true"/>
                </a>
                <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
                <a className="btn btn-primary" href="#" aria-label="Edit">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"/>
                </a>
                <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
                <a className="btn btn-danger" href="#" aria-label="Delete">
                  <i className="fa fa-trash-o" aria-hidden="true"/>
                </a>
              </div>
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
