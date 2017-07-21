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

app.post('/setup', (req, res) => {
    var IP = getClientIP(req);
    var stmt = 'allow ' + IP + '\\;';
    var b1 = child_proc.spawnSync('grep', [IP, './allowed-ips.conf']);
    var msg = 'Thanks for trying Datajoy on this network!';
    if(b1.status == 1){
      var output_buffer = child_proc.execSync('echo ' + stmt + ' >>  ./allowed-ips.conf');
    } else {
      msg += 'Your IP has already been registered before!';
    }
    msg += '<br>Set your device DNS to 139.162.177.133 (Step 2 of 2)';
    msg += '<br>Your adblocking will start in about a minute.';
    res.send(msg);
});

app.post('/setup2', (req, res) => {
    var IP = getClientIP(req);
    var stmt = 'allow ' + IP + '\\;';
    var b1 = child_proc.spawnSync('grep', [IP, './allowed-ips.conf']);
    var msg = "EXISTS";
    if(b1.status == 1){
      var output_buffer = child_proc.execSync('echo ' + stmt + ' >>  ./allowed-ips.conf');
      msg = "ADDED";
    }
    res.send({"result" : msg});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function getClientIP(req){
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};
