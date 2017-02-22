import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {saveAs} from 'file-saver';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';
import * as FontModel from '../../../../common/models/font.json';
const Font = FontModel.properties;

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
    deleteEntity: PropTypes.func.isRequired
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
      <tr>{Object.getOwnPropertyNames(Font).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
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
              if (prop === 'value') {
                return <td key={j}>
                  {item[prop]}
                  <div className='preview' style={{background: item[prop]}}></div>
                </td>;
              }
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
      <a className='btn btn-app' onClick={this.handleJSONDownloadBtnClick}><i className='fa fa-file-o'/>Download JSON
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
      <a className='btn btn-app' onClick={this.handleSaveBtnClick}><i className='fa fa-check'/>Save</a>
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
      this.props.deleteEntity(this.props.selectedRowId);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.status === STATUS_EDITING) {
      const properties = Object.getOwnPropertyNames(Font);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.editingEntityInput[prop]).value || undefined;
        }
      });
      this.props.editEntity(this.props.selectedRowId, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(Font);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.newEntityInput[prop]).value || undefined;
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

  handleJSONDownloadBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      const fonts = this.props.data;
      const data = [];
      data.push('"fonts": [\n');
      fonts.forEach(function(entry) {
        data.push(JSON.stringify(entry));
        data.push( '\n');
      });
      data.push( ']');
      const blob = new Blob(data, {type: "application/json"});
      saveAs(blob, "fonts.json");
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
              {this.renderTable(data, Font)}
              {this.renderButtons()}
              <p>{title + ': ' + data.length}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
