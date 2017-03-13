const apiRoot = '/api/';

export function* create(endpoint, obj, token) {
  const req = yield fetch(apiRoot + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(obj)
  });
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json());
}

export function* retrieve(endpoint) {
  const req = yield fetch(apiRoot + endpoint);
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json());
}

export function* retrieveAuth(endpoint, token) {
  const req = yield fetch(apiRoot + endpoint, {
    headers: {
      'Authorization': token
    }
  });
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json());
}

export function* retrieveOneById(endpoint, id) {
  const req = yield fetch(apiRoot + endpoint + '/' + id);
  if (req.status < 200 || req.status >= 300) {
    throw req.statusText;
  }
  return yield req.json();
}

export function* retrieveNumber(endpoint) {
  const req = yield fetch(apiRoot + endpoint + '/count');
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json()).count;
}

export function* update(endpoint, obj, id, token) {
  const req = yield fetch(apiRoot + endpoint + '/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(obj)
  });
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json());
}

export function* remove(endpoint, id, token) {
  const req = yield fetch(apiRoot + endpoint + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  });
  if (req.status < 200 || req.status >= 300) {
    throw new Error(req.statusText);
  }
  return (yield req.json());
}

export function* upload(endpoint, obj) {
  const req = yield fetch(apiRoot + endpoint + '/upload', {
    method: 'POST',
    body: obj
  });
  return (yield req.json());
}

export function* deleteFile(endpoint) {
  const req = yield fetch(apiRoot + endpoint, {
    method: 'DELETE'
  });
  return (yield req.json());
}
