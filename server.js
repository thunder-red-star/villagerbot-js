const express = require('express'),
  server = express();
server.all('/', (req, res)=>{
    res.send('CommandStorm Discord Bot! ')
})

function keepAlive(){
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}
module.exports = keepAlive;
