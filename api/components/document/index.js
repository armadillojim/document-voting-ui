module.exports = (db) => {

    const DocumentService = require('./document.service.js');
    const DocumentController = require('./document.controller.js');
    const DocumentRouter = require('./document.router.js');

    const documentService = new DocumentService(db);
    const documentController = new DocumentController(documentService);
    const documentRouter = new DocumentRouter(documentController);

    return documentRouter;

};
