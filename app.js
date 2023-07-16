const path = require('path')
const cron = require('cron')

try {
    const env = process.argv.slice(2)[0].split('tld=')[1]

    require('dotenv').config({
        path: path.join(process.cwd(), `/${env}.env`)
    })
} catch (e) {
    console.error('Missing "tld=" flag within execution')
    process.exit(1)
}

const libraries = require(path.join(process.cwd(), '/libraries'))

const job = new cron.CronJob('0 0 * * * *', function () {
    libraries.network.doGetPublicAddress().then(host => {
        let record = (process.env.USE_HOSTNAME === 'false') ? '@' : libraries.hostname.doGetSubdomain()

        if (process.env.CUSTOM_SUBDOMAIN !== 'false') {
            record = process.env.CUSTOM_SUBDOMAIN
        }

        console.log(`Processing ${record}.${process.env.TLD}`)

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
