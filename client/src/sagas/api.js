const apiRoot = '/api/';

export function* create(endpoint, obj) {
  const req = yield fetch(apiRoot + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return (yield req.json());
}

export function* retrieve(endpoint) {
  const req = yield fetch(apiRoot + endpoint);
  if (!(req.status >= 200 && req.status < 300)) {
    throw req.statusText;
  }
  return (yield req.json());
}

export function* retrieveNumber(endpoint) {
  const req = yield fetch(apiRoot + endpoint + '/count');
  return (yield req.json()).count;
}

export function* update(endpoint, obj, id) {
  const req = yield fetch(apiRoot + endpoint + '/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return (yield req.json());
}

export function* remove(endpoint, id) {
  const req = yield fetch(apiRoot + endpoint + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return (yield req.json());
}

export function* upload(endpoint, obj) {
  const req = yield fetch(apiRoot + endpoint + '/upload', {
    method: 'POST',
    body: obj
  });
  return (yield req.json());
}
