const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

const port = 3001;


const fs = require('fs');
const dataPath = '/var/lib/oaat/data.json'
var data = fs.readFileSync(dataPath);

app.all('/data', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.get('/data', (req, res) => {
  res.send(data)
})

app.post('/data', (req, res) => {
  data = req.body;
  console.log(data);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.send('ok');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
