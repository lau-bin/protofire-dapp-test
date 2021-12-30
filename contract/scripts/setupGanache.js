const Ganache = require("ganache-core");

module.exports = {
  getInstance: function(options){
    const server = Ganache.server(options);
    server.on("listening", ()=>{
      console.log("Ganache server started")
    })
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        server.close();
      }
    });
    return server;
  },
  start: function(server){server.listen(7545)}
}



