const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();


// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
  res.send('Hello World');
});


app.get('/api/tipocambio', function (req, res) {
  res.send(`{
    "TipoCompraDolares" : "608",
    "TipoVentaDolares" : "621",
    "TipoCompraEuros" : "731.85",
    "TipoVentaEuros" : "761.9"
  }`);
});

app.use(express.static(path.join(__dirname, '../client')));


app.get('/tipocambio', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
