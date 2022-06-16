class messageHandler {
    constructor(code, message) {
        this.code = code,
        this.message = message
    }
    //=====================>200
    static ok(msg){
        return new messageHandler(200, msg ? msg:"Ok")
    }
    static created(msg){
        return new messageHandler(201, msg ? msg:"Created")
    }
    static accepted(msg){
        return new messageHandler(202, msg ? msg:"Accepted")
    }
    //=====================>400
    static badRequest(msg){
        return new messageHandler(400, msg ? msg:"Bad Request")
    }
    static unauthorized(msg){
        return new messageHandler(401, msg ? msg:"Unauthorized")
    }
    static paymentRequired(msg){
        return new messageHandler(402, msg ? msg:"Payment Required")
    }
    static forbidden(msg){
        return new messageHandler(403, msg ? msg:"Forbidden")
    }
    static notFound(msg){
        return new messageHandler(404, msg ? msg:"Not Found")
    }
    static conflict(msg){
        return new messageHandler(409, msg ? msg:"Conflict")
    }
    //=====================>500
    static internal(msg){
        return new messageHandler(500, msg ? msg:"Internal Server Error")
    }
}

module.exports = messageHandler