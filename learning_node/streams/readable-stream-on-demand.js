const { Readable } = require('stream')
const readableStream = new Readable({
    read(size) {
        setTimeout(() => {
            if(this.currentChartCode > 90) {
                this.push(null)
                return 
            }
            this.push(String.fromCharCode(this.currentChartCode++))
        }, 100)
    }
})

readableStream.currentChartCode = 65
readableStream.pipe(process.stdout)