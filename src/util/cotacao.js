const request = require('request')

const api_token = 'b7f0c71aa89d30f2c37811471af9b955'

const cotacao = (symbol, callback) => {    
    
    const url = `http://api.marketstack.com/v1/eod/latest?access_key=${api_token}&symbols=${symbol}`
    
    request({url: url, json: true}, (err, response) =>{
        if(err){
            callback({
                mensage : `Something went wrong: ${err}`,
                code : 500
            }, undefined)
        }        
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                mensage : `No data found`,
                code : 404
            }, undefined)
        }        
        
        const parsedJSON = response.body.data[0]
        const {symbol, open, high, low, date} = parsedJSON

        callback(undefined, {symbol, open, high, low, date})
    })
}

module.exports = cotacao