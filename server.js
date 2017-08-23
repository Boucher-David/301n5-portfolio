var express = require('express');
var app = express();

app.use(express.static('./public'));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/handlebars', express.static(__dirname + '/node_modules/handlebars/dist/'));


app.listen(3000, function() {
  console.log('server up!');
});
