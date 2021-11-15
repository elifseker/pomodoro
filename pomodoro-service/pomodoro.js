let express = require('express');
let app = express();
const request = require('request');
let cors = require('cors')


app.set('port', 8081);

app.options('*', cors()) // include before other routes 
app.use(cors())

app.get('/weather', function (req, res) {
    let location = req.query.location
    const params = '?zip=' + location
    const path = "/zip"

    let requestSettings = {
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

//

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});