import 'babel-polyfill';
import * as api from '../../client/src/sagas/api';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

api.create = jest.fn().mockImplementation(() => ({}));

api.retrieve = jest.fn().mockImplementation(() => ({}));

api.retrieveNumber = jest.fn().mockImplementation(() => ({}));

api.update = jest.fn().mockImplementation(() => ({}));

api.remove = jest.fn().mockImplementation(() => ({}));

api.upload = jest.fn().mockImplementation(() => ({}));


describe('mock api', () => {
  test('intentionally left blank', () => {
    //
  });
});
