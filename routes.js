const routes = require('next-routes')() // calls function

// this breaks the existing route 'campaign/new' (thinks new is an address!)
// routes.add('/campaigns/:address', '/campaigns/show')

routes
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')

module.exports = routes
