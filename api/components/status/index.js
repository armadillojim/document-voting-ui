module.exports = (db) => {

    const StatusService = require('./status.service.js');
    const StatusController = require('./status.controller.js');
    const StatusRouter = require('./status.router.js');

    const statusService = new StatusService(db);
    const statusController = new StatusController(statusService);
    const statusRouter = new StatusRouter(statusController);

    return statusRouter;

};
