const path = require('path')
const cron = require('cron')

try {
    const env = process.argv.slice(2)[0].split('tld=')[1]

    require('dotenv').config({
        path: path.join(process.cwd(), `/${env}.env`)
    })
} catch (e) {
    console.error('Missing "env=" flag within execution')
    process.exit(1)
}

const libraries = require(path.join(process.cwd(), '/libraries'))

const job = new cron.CronJob('0 0 * * * *', function () {
    libraries.network.doGetPublicAddress().then(host => {
        const record = (process.env.USE_HOSTNAME === 'false') ? '@' : libraries.hostname.doGetSubdomain()

        libraries.godaddy.doUpdateAddressRecord(process.env.TLD, record, host).then(_ => {
            console.log(`Successfully updated FQDN ${record}.${process.env.TLD} to point to ${host}`)
        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {
        console.log(error)
    })
}, null, null, null, null, true)

job.start()
