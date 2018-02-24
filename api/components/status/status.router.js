const express = require('express');

module.exports = function StatusRouter(statusController) {

    const router = express.Router();

    router.get('/', (req, res, next) => {
        statusController.getStatus()
            .then((status) => { res.status(200).send(status); })
            .catch(next);
    });

    return router;

};
