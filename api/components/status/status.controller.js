module.exports = function(statusService) {

    const getStatus = async () => await statusService.getStatus();

    return {
        getStatus: getStatus
    };

};
