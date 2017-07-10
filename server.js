'use strict';

const express = require('express');
const path = require('path');
const child_proc = require('child_process');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/', express.static(__dirname)); //  "public" off of current is root
app.use('/india', express.static(path.join(__dirname, 'india')));
app.use('/momsanddads', express.static(path.join(__dirname, 'momsanddads')));
app.use('/creative', express.static(path.join(__dirname, 'creative')));
app.use('/try', express.static(path.join(__dirname, 'try')));

app.post('/setup', (req, res) => {
    var IP = getClientIP(req);
    var stmt = 'allow ' + IP + '\\;';
    child_proc.execSync('echo ' + stmt + ' >>  ./allowed-ips.conf');
    var output_buffer = child_proc.execSync('/usr/bin/sudo systemctl reload nginx');
    var msg = 'Thanks for trying Datajoy on this network!';
    msg += '<br>Set your device DNS to 139.162.177.133 (Step 2 of 2)';
    msg += '<br> And you are done';
    msg += '<br> Output = ' + Buffer.from(output_buffer).toString();
    res.send(msg);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getClientIP(req){
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};
