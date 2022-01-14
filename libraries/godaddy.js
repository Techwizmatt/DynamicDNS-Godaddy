const path = require('path')
const axios = require('axios')

const http = axios.create({
    baseURL: process.env.GODADDY_API_ENDPOINT,
    timeout: 3000,
    headers: {
        'Authorization': `sso-key ${process.env.GODADDY_KEY}:${process.env.GODADDY_SECRET}`
    }
})

const godaddy = {
    doGetAllActiveDomains: function () {
        return new Promise((resolve, reject) => {
            http.get('/v1/domains?statuses=ACTIVE').then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @param {string} tld - Top Level Domain name (example.com)
     * @param {string} record - The record correlating to the DNS Settings (**_RECORD_**.example.com)
     */
    doGetAddressRecordIp: function (tld, record) {
        return new Promise((resolve, reject) => {
            http.get(`/v1/domains/${tld}/records/A/${record}`).then(data => {
                resolve(data.data[0].data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    /**
     * @param {string} tld - Top Level Domain name (example.com)
     * @param {string} record - The record correlating to the DNS Settings (**_RECORD_**.example.com)
     * @param {string} host - The host address to set the new address records FQDN
     * */
    doUpdateAddressRecord: function (tld, record, host) {
        return new Promise((resolve, reject) => {
            http.put(`/v1/domains/${tld}/records/A/${record}`, [
                {
                    data: host
                }
            ]).then(_ => {
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = godaddy
