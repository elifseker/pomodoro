let express = require('express');
let app = express();
const request = require('request');

app.set('port', 8081);
app.get('/weather', function (req, res) {
    let location = req.query.location
    const params = '?zip=' + location
    const path = "/zip"

    var requestSettings = {
        url: 'https://weather-api-361.herokuapp.com' + path + params,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        console.log('error is:' + error)
        console.log('status is:' + response.statusCode)
        res.header('Content-Type', 'application/json')
        res.status(200);
        res.send(body);
    });
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,    PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});