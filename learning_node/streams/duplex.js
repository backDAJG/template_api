const { read } = require("fs");
const { Duplex } = require("stream");

const duplexStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
  read(size) {
    if (this.currentChartCode > 90) {
      this.push(null);
      return;
    }
    this.push(String.fromCharCode(this.currentChartCode++));
  },
});

duplexStream.currentChartCode = 65;
process.stdin.pipe(duplexStream).pipe(process.stdout)
