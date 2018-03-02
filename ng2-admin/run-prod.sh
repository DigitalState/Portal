#!/bin/sh
echo 'Running ng2admin in PROD mode'

DISCOVERY_HOST="${DISCOVERY_HOST:-''}"

# Inject DISCOVERY env variable contents into the index.html file of the distribution
sed -i -e "s/\(<script id=\"ds-env\">\).*\(<\/script>\)/<script id=\"ds-env\">window.dsDiscoveryHost = '$DISCOVERY_HOST';<\/script>/g" /var/www/dist/index.html

# Start nginx
nginx -g "daemon off;"

# tail -f /dev/null