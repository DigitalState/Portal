FROM mhart/alpine-node:6.10.3

#RUN apk add --no-cache make gcc g++ python

RUN apk add --update bash \
                     git

ADD ./ng2-admin /var/www

#RUN cd /var/www

WORKDIR /var/www

ADD ./ng2-admin/run-dev.sh /var/www
RUN chmod 755 /var/www/run-prod.sh

#EXPOSE 8000
#ENTRYPOINT ["npm", "run", "server:prod"]
#ENTRYPOINT ["npm", "run", "server:dev"]
