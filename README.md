This application will take the current Hostnames (subdomain) in the machine and the configuration file for the tld and make sure the subdomain matches to the IP provided

Run this application as a system service, It will automatically run the update every hour on the dot.

Example: 

If machine name is awesome.machine.local
Top Level Domain is example.com
Public IP address is 123.456.789.123

This will update the TLD Address record to a FQDN to the machines public IP address
Output would be awesome.example.com ==> 123.456.789.123
