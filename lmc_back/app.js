const express = require('express');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../lmc_front/public/index.html'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});