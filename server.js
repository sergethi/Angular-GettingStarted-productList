const express = require('express')

let app = express()

app.use(express.static(__dirname+'/dist/apm'));

app.use('/*', (req,res) => {
    res.sendFile(__dirname+'/dist/amp/index.html');
})

app.listen(process.env.PORT || 8080);


// for package .json => start angular ==>  "start": "ng serve -o",