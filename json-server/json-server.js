// intercepts get requests to contact_list endpoints and add
// some middleware to enable filtering
module.exports = (req, res, next) => {
  if (req.method === 'GET' && req.path === '/contact_list') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const statusFilter = url.searchParams.get('status');

    if (statusFilter) {
      const statusArray = statusFilter.split('|');
      req.query.status = statusArray;
    }
  }
  next();
};

// run with
// json-server --watch db.json --port 3000 --middlewares ./json-server.js
