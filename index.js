const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

const regex = /[-, ]/g



app.get('/', (req, res) => {
    console.log(req.query)
    res.sendFile(__dirname + '/views/index.html');
});


// @access Public
// METHOD GET
// Returns dates in different time formats

app.get('/api/:date?', (req, res) => {

    // wrapping the content with a try an catch block
  try{

    // handling errors
    if(!req.params.date){
        return res.json({
        "unix": new Date().getTime(),
        "utc": new Date()
      })
    }
    
    // regex machting special characters to check date time format 
    const result = req.params.date.match(regex)

    // if result contains special caracters
    console.log(result)
    if(result){
        const datetime = new Date(req.params.date)
        res.json({
            "unix": datetime.getTime(),
            "utc": datetime.toUTCString()
        })
    }

    // else it means date in milliseconds format and needs int parsing
    else {
        const date = new Date(parseInt(req.params.date))
        res.json({
            "unix": date.getTime(),   
            "utc": date.toUTCString() 
        });
    }
  } catch(err) {
    res.json({error: "Invalid Date"})
  }

})




app.listen(3000, () => {
    console.log('server running on port 3000');
});