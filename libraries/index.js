const path = require('path')

const libraries = {
    godaddy: require(path.join(process.cwd(), '/libraries/godaddy')),
    hostname: require(path.join(process.cwd(), '/libraries/hostname')),
    network: require(path.join(process.cwd(), '/libraries/network'))
}

module.exports = libraries
