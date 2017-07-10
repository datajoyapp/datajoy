'use strict';

const express = require('express');
const path = require('path');
const child_proc = require('child_process');
// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname)); 
app.use('/india', express.static(path.join(__dirname, 'india')));
app.use('/momsanddads', express.static(path.join(__dirname, 'momsanddads')));
app.use('/creative', express.static(path.join(__dirname, 'creative')));
app.use('/try', express.static(path.join(__dirname, 'try')));

app.post('/setup', (req, res) => {
    var IP = getClientIP(req);
    var stmt = 'allow ' + IP + '\\;';
    var output_buffer = child_proc.execSync('echo ' + stmt + ' >>  ./allowed-ips.conf');
    var msg = 'Thanks for trying Datajoy on this network!';
    msg += '<br>Set your device DNS to 139.162.177.133 (Step 2 of 2)';
    msg += '<br>Your adblocking will start in about a minute.';
    res.send(msg);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getClientIP(req){
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};
