let express = require('express');
let app = express();
const request = require('request');
const GoogleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

if (GoogleMapsApiKey == null) {
    console.log('GOOGLE_MAPS_API_KEY environment variable was not found.')
    process.exit(1);
}

app.set('port', 8080);
app.get('/mapimage', function (req, res) {
    let location = req.query.location
    const params = '?center=' + location + '&zoom=12&size=400x400&key=' + GoogleMapsApiKey
    const path = "/maps/api/staticmap"

    var requestSettings = {
        url: 'https://maps.googleapis.com' + path + params,
        method: 'GET',
        encoding: null
    };

    request(requestSettings, function (error, response, body) {
        console.log('error is:' + error)
        console.log('status is:' + response.statusCode)

        res.status(200);
        res.setHeader('Content-Type', 'image/png')
        res.send(body);
    });
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});