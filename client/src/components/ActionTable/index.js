import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../../definitions';

export default class Table extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    secondaryData: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchSecondaryData: PropTypes.func.isRequired,
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
    this.props.fetchSecondaryData();
    this.editingEntityInput = {};
    this.newEntityInput = {};
    this.props.fetchData();
  }

  renderTableHeadings = data => {
    if (!data.length) {
      return null;
    }
    return Object.getOwnPropertyNames(data[0]).map((prop, i) => {
      if (prop === ID_PROP) {
        return (
          null
        );
      }
      else return (<th key={i}>{prop}</th>)
    });
  };

  renderCreatingRow = data => {
    if (!data.length) {
      return null;
    }

    return (
      <tr>{Object.getOwnPropertyNames(data[0]).map((prop, i) => {
        if (prop === ID_PROP) {
          return null;
        }

        return (<td key={i}><FormControl type='text' ref={input => this.newEntityInput[prop] = input}/>
        </td>);
      })
      }</tr>
    );
  };

  renderTableData = (tableId, data) => {
    if (!data.length) {
      return null;
    }

    let handleClick = tableId === 0 ? this.handleRowClick : this.handleRowClickSecondTable;

    return data.map((item, k) => {
      if (this.props.status === STATUS_EDITING && item[ID_PROP] === this.props.selectedRowId) {
        return (
          <tr key={k}
              onClick={() => handleClick(item[ID_PROP])}>
            {Object.getOwnPropertyNames(data[0]).map((prop, j) => {
              if (prop === ID_PROP) {
                return (
                  null
                );
              }

              return (
                <td key={j}><FormControl type='text'
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
        <tr key={k} className={item[ID_PROP] === this.props.selectedRowId ? 'selected' : null}
            onClick={() => handleClick(item[ID_PROP])}>
          {Object.getOwnPropertyNames(data[0]).map((prop, j) => {
            if (prop === ID_PROP) {
              return (
                null
              );
            } else return (
              <td key={j}>{item[prop]}</td>
            )
          })}
        </tr>
      );
    });
  };

  renderTable = (data, headings) => (
    <section className='panel panel-default'>
      <div>
        <div className='table-responsive'>
          <table className='table no-margin'>
            <thead>
            <tr>
              {this.renderTableHeadings(data)}
            </tr>
            </thead>
            <tbody>
            {this.props.status === STATUS_CREATING ? this.renderCreatingRow(data) : null}
            {this.renderTableData(0, data)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  renderButtons = () => (
    this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
      this.renderEditingButtons() : this.renderDefButtons()
  );

  renderDefButtons = () => (
    <div>
      <a className='btn btn-app' onClick={this.handleCreateBtnClick}><i className='fa fa-plus'/>Add
      </a>
      <a className='btn btn-app' onClick={this.handleEditBtnClick}><i className='fa fa-pencil-square-o'/>Edit
      </a>
      <a className='btn btn-app' onClick={this.handleDeleteBtnClick}><i className='fa fa-trash-o'/>Delete
      </a>
      <a className='btn btn-app' onClick={() => {
        this.props.fetchData();
        this.props.fetchSecondaryData()
      }}>
        <i className='fa fa-refresh'/>Sync
      </a>
    </div>
  );

  renderEditingButtons = () => (
    <div>
      <a className='btn btn-app' onClick={this.handleSaveBtnClick}><i className='fa fa-check'/>Save</a>
      <a className='btn btn-app' onClick={this.handleCancelBtnClick}><i className='fa fa-ban'/>Cancel</a>
    </div>
  );

  renderSecondaryTable = data => (
    <section className='panel panel-default'>
      <div>
        <div className='table-responsive'>
          <table className='table no-margin'>
            <thead>
            <tr>
              {this.renderTableHeadings(data)}
            </tr>
            </thead>
            <tbody>
            {this.renderTableData(1, data)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  handleRowClick = id => {
    if (this.props.selectedRowId !== id) {
      this.props.selectRow(id);
    }
  };

  handleRowClickSecondTable = id => {
    // TODO
  };

  handleCreateBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableCreating();
    }
  };

  handleEditBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.enableEditing();
    }
  };

  handleDeleteBtnClick = () => {
    if (this.props.status === STATUS_DEFAULT) {
      this.props.deleteEntity(this.props.selectedRowId);
    }
  };

  handleSaveBtnClick = () => {
    if (this.props.status === STATUS_EDITING && this.props.data.length) {
      const properties = Object.getOwnPropertyNames(this.props.data[0]);
      const entity = {};
      properties.forEach(prop => {
        if (prop !== ID_PROP) {
          entity[prop] = findDOMNode(this.editingEntityInput[prop]).value || undefined;
        }
      });
      this.props.editEntity(this.props.selectedRowId, entity);
    } else if (this.props.status === STATUS_CREATING) {
      const properties = Object.getOwnPropertyNames(this.props.data[0]);
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
    const {title, secondaryData, headings, data} = this.props;
    return (
      <section>
        <div className='row'>
          <div className='col-lg-3'>
            {this.renderSecondaryTable(secondaryData)}
          </div>
          <div className='col-lg-7'>
            {this.renderTable(data, headings)}
          </div>
          <div className='col-lg-2'>
            {this.renderButtons()}
          </div>
        </div>
      </section>
    );
  }
}
