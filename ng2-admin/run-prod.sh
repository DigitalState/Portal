#!/bin/sh
echo 'Running ng2admin in PROD mode'

DISCOVERY="${DISCOVERY:-''}"

# Inject DISCOVERY env variable contents into the index.html file of the distribution
sed -i -e "s/\(<script id=\"ds-discovery-env\">\).*\(<\/script>\)/<script id=\"ds-discovery-env\">window.dsDiscoveryEnv = $DISCOVERY<\/script>/g" /var/www/dist/index.html

# Start nginx
nginx -g "daemon off;"

# tail -f /dev/null