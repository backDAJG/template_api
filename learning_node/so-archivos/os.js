const os = require('os')

console.log("CPU info", os.cpus())
console.log("IP Adress", os.networkInterfaces())
console.log("Free Memory", os.freemem())
console.log("Type", os.type())
console.log("SO version", os.release())
console.log("User info", os.userInfo())
