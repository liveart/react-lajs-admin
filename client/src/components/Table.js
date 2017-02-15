import React, {Component, PropTypes} from 'react';
import {FormControl} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {ID_PROP, STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

export default class Table extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    explorerData: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchExplorerData: PropTypes.func.isRequired,
    selectedRowId: PropTypes.number.isRequired,
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
    this.props.fetchExplorerData();
    this.editingEntityInput = {};
    this.newEntityInput = {};
    this.props.fetchData();
  }

  renderTableHeadings = data => {
    if (!data.length) {
      return null;
    }
    return Object.getOwnPropertyNames(data[0]).map((prop, i) => (<th key={i}>{prop}</th>));
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

        return (<td key={i}><FormControl type="text" ref={input => this.newEntityInput[prop] = input}/>
        </td>);
      })
      }</tr>
    );
  };

  renderTableData = data => {
    if (!data.length) {
      return null;
    }

    return data.map(item => {
      if (this.props.status === STATUS_EDITING && item[ID_PROP] === this.props.selectedRowId) {
        return (
          <tr key={item[ID_PROP]}
              onClick={() => this.handleRowClick(item[ID_PROP])}>
            {Object.getOwnPropertyNames(data[0]).map((prop, j) => {
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
          {Object.getOwnPropertyNames(data[0]).map((prop, j) => (<td key={j}>{item[prop]}</td>))}
        </tr>
      );
    });
  };

  renderTable = (data, headings) => (
    <section>
      <div className='box box-info'>
        <div className='box-header with-border'>
          <h3 className='box-title'>Title</h3> //TODO
          <div className='box-tools pull-right'>
            <button type='button' className='btn btn-box-tool'/>
            <button type='button' className='btn btn-box-tool'/>
          </div>
        </div>
        <div className='box-body'>
          <div className='table-responsive'>
            <table className='table no-margin'>
              <thead>
              <tr>
                {this.renderTableHeadings(data)}
              </tr>
              </thead>
              <tbody>
              {this.props.status === STATUS_CREATING ? this.renderCreatingRow(data) : null}
              {this.renderTableData(data)}
              </tbody>
            </table>
          </div>
        </div>
        <div className='box-footer clearfix'>
          <a>View All</a>
        </div>
      </div>
    </section>
  );

  renderButtons = () => (this.props.status === STATUS_EDITING || this.props.status === STATUS_CREATING ?
    this.renderEditingButtons() : this.renderDefButtons());

  renderDefButtons = () => (
    <div className='box-tools'>
      <button className='btn' title='Add' onClick={this.handleCreateBtnClick}><i className='fa fa-plus'/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn" title="Edit" onClick={this.handleEditBtnClick}>
        <i className="fa fa-pencil-square-o"/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className="btn btn-danger" title="Delete" onClick={this.handleDeleteBtnClick}>
        <i className="fa fa-trash-o"/></button>
    </div>
  );

  renderEditingButtons = () => (
    <div className='box-tools'>
      <button className='btn btn-success' title='Save' onClick={this.handleSaveBtnClick}>
        <i className='fa fa-check'/></button>
      <div style={{'width': '5px', 'height': 'auto', 'display': 'inline-block'}}></div>
      <button className='btn btn-danger' title='Cancel' onClick={this.handleCancelBtnClick}>
        <i className='fa fa-ban'/></button>
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
    if (this.props.status === STATUS_EDITING && this.props.selectedRowId > -1 && this.props.data.length) {
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
    const {title, explorerData, headings, data} = this.props;
    return (
      <section>
        {this.renderButtons()}
        {this.renderTable(data, headings)}
      </section>
    );
  }
}
