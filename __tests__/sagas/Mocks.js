import * as api from '../../client/src/sagas/api';

api.create = jest.fn(function*() {
  yield {};
});

api.retrieve = jest.fn(function*() {
  yield {};
});

api.retrieveOneById = jest.fn(function*() {
  yield {};
});

api.retrieveNumber = jest.fn(function*() {
  yield {count: 0};
});

api.update = jest.fn(function*() {
  yield {};
});

api.remove = jest.fn(function*() {
  yield {};
});

api.upload = jest.fn().mockImplementation(() => ({}));


describe('mock api', () => {
  test('intentionally left blank', () => {
    //
  });
});
