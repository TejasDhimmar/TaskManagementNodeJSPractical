const response = (res, statusCode, dataObj = {}, resMessage = "") => {
    let msg = "";
    if (typeof resMessage == 'string') {
        msg = resMessage;
    } else {
        msg = resMessage.join(',');
    }

    let data = {}
    data.data = dataObj;
    data.message = msg;
    return res.status(statusCode).send(data);
}

module.exports = {
    response
}