require('./config/config')
const exrpress = require('express');
const monggose = require('mongoose');

const app = exrpress();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.json('');
})

// User routes
app.use(require('./routes/user'))

monggose.connect('mongodb://localhost:27017/coffee',(err, res) => {
    
    if (err) throw err
    console.log('Mongodb is running');
})

app.listen(process.env.PORT, ()=>{
    console.log(`Listening port: ${process.env.PORT}`);
})