import React, {Component} from 'react';
import {PTypes} from './PropTypes';
import {STATUS_EDITING} from '../../definitions';
import {Elements} from '../../configurableElements/config';
import AbstractPage from '../AbstractPage';

export default class extends Component {
  static propTypes = PTypes;

  constructor(props) {
    super(props);
    // admin model needs to be set manually
    this.state = {
      admin: {
        email: {},
        password: {
          showInTable: false
        }
      }
    };
  }

  componentWillMount() {
    this.props.restoreTableState(this.state.admin);
    this.props.fetchUsers(this.props.token);
    this.props.validateUserToken(this.props.token);
  }

  render() {
    return <AbstractPage {...this.props}
                         sortingSupport={true}
                         fetchData={() => this.props.fetchUsers(this.props.token)}
                         objectSample={{
                           email: {
                             required: true,
                             inputElement: this.props.status === STATUS_EDITING ? Elements.DISABLED_INPUT :
                               Elements.DEFAULT_INPUT
                           },
                           password: {
                             required: true,
                             showInTable: false,
                             inputElement: Elements.PASSWORD_INPUT,
                             showInput: this.props.status !== STATUS_EDITING
                           }
                         }}/>;
  }
}
