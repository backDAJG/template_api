const util = require('util')

const helloPluto = util.deprecate(() => {
    console.log('hello pluto')
}, 'Pluto is deprecated. Is not a planet anymore')

helloPluto()