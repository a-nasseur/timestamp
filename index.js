const { json } = require('express');
const express = require('express');
const app = express();

// servig static files middleware
app.use('/public', express.static(__dirname + '/public'));

// validating date input URL
const validateTime = (req, res, next) => {
  const time = new Date(req.params.date)
  const timeInt = new Date(parseInt(req.params.date))

  if(!req.params.date){
      return res.json({
      "unix": new Date().getTime(),
      "utc": new Date()
    })  
  }

  else if(time != "Invalid Date"){
    console.log(time)
    next();
  }
  else if(timeInt != "Invalid Date"){
    console.log(timeInt)
    next();
  }
  else {
    return res.json({
      error: "Invalid Date"
    })
  }
}

const regex = /[-, ]/g



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


// @access Public
// METHOD GET
// Returns dates in different time formats

app.get('/api/:date?', validateTime ,(req, res) => {

    // wrapping the content with a try an catch block
  try{

    // regex machting special characters to check date time format 
    const result = req.params.date.match(regex)

    // if result contains special caracters
    if(result){
        const datetime = new Date(req.params.date)
        res.json({
            "unix": datetime.getTime(),
            "utc": datetime.toUTCString()
        })
    }

    // else it means date in milliseconds format and needs int parsing
    else if(!result) {
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