# Dynamic DNS | GoDaddy

### What is this application?

This application will take the current Hostnames (subdomain) in the machine and the configuration file for the tld and make sure the subdomain matches to the IP provided

Run this application as a system service, It will automatically run the update every hour on the dot.

Example: 

If machine name is awesome.machine.local
Top Level Domain is example.com
Public IP address is 123.456.789.123

This will update the TLD Address record to a FQDN to the machines public IP address
Output would be awesome.example.com ==> 123.456.789.123

## Setup

Make a copy of the `example.com.env` file and rename it to your TLD but keep the `.env` at the end!

Edit the config file to your liking, Check below for what each setting does

Make sure you have node/npm installed on your system, Don't forget to run `npm i`

### Config keys/settings and their meanings

`TLD` is your top level domain, I recommend settings this to the file name of your config '.env' file.

`USE_HOSTNAME` is a boolean string. Do you want the program to use the first subdomain of your machines hostname? or just set the direct @ address for the A record on GoDaddys DNS settings.

`GODADDY_API_ENDPOINT` is the endpoint of GoDaddys API, Keep this the same unless GoDaddy changes this.

`GODADDY_KEY` The key from your GoDaddy API

`GODADDY_SECRET` The Secret from your GoDaddy API

### How do I get a GoDaddy API key?

Create a `production`*** api key here: https://developer.godaddy.com/keys

### How do I execute this script?

`node app.js tld=example.com`

Note*** the `tld` flag in the execution string! This the name of the config file you made earlier!

### How do I run this automatic script as a System Service?

I'm using systemd on my Linux system, You can do what ever you want though. Just make sure you run the execution script with your tld settings!

How to setup systemd: https://stackoverflow.com/questions/4681067/how-do-i-run-a-node-js-application-as-its-own-process/28542093#28542093
