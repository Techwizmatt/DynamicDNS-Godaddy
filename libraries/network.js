const axios = require("axios")

const network = {
    doGetPublicAddress: function () {
        return new Promise((resolve, reject) => {
            axios.get('https://api.ipify.org/?format=json').then(data => {
                resolve(data.data.ip)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = network
