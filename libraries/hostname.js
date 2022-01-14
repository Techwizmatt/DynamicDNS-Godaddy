const os = require('os')

const hostname = {
    doGetSubdomain: function () {
        return os.hostname().split('.')[0]
    }
}

module.exports = hostname
