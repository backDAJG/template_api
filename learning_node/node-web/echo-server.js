const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/echo") {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        body = Buffer.concat(body).toString()
        res.end(body);
      });
    //res.statusCode = 200
    //res.setHeader('Content-Type', 'text/plain')
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8001);
console.log("servid1or en la URL http://localhost:8001");
