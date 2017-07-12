FROM mhart/alpine-node:6.10.3

RUN apk add --no-cache make gcc g++ python

RUN apk add --update bash \
                     git

ADD ./ng2-admin /var/www

RUN cd /var/www \
#    && mkdir -p /root \
#    && npm install --global rimraf \
#    && npm run clean \
    && npm install --global webpack webpack-dev-server typescript@2.1.5 \
    && npm install

RUN echo "App installation completed!"

WORKDIR /var/www

ADD ./ng2-admin/run-dev.sh /var/www
RUN chmod 755 /var/www/run-dev.sh

#EXPOSE 3000
#ENTRYPOINT ["npm", "run", "server:prod"]
#ENTRYPOINT ["npm", "run", "server:dev"]
