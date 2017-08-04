const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/:time', (req, res)=>{
    var time = req.params.time;

    var dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    if (isNaN(time)){
        if (new Date(time) == "Invalid Date"){ // checek if the valid date was passed. 
            var unixTime = null;
            var naturalTime = null;
        } else {
            var naturalTime = new Date(time);
            naturalTime = naturalTime.toLocaleDateString('en-us', dateFormat);
            var unixTime = (new Date(time)).getTime() /1000;
        }   
    } 
    else {
        var unixTime = time;
        var naturalTime = new Date(time*1000);
        naturalTime = naturalTime.toLocaleDateString('en-us', dateFormat);
    }

    res.send({unix: unixTime, natural: naturalTime});

})

app.listen(3000, function(){
    console.log('connected to server');
});
