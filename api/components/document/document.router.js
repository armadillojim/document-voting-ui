const express = require('express');

module.exports = function DocumentRouter(documentController) {

    const router = express.Router();

    router.get('/', (req, res, next) => {
        documentController.getDocument()
            .then((document) => { res.status(200).send(document); })
            .catch(next);
    });
    router.put('/:id', (req, res, next) => {
        documentController.voteDocument(req.params.id, req.body)
            .then(() => { res.status(200).send('"OK"'); })
            .catch(next);
    });

    return router;

};
