const fs = require("fs");

const http = require("http");
const server = http.createServer();

server.o("request", (req, res) => {
  fs.readFile("./big", (err, data) => {
    if (err) {
      console.log("Error: ", err);
    }
    res.end(data);
  });
});

server.listen(3000)