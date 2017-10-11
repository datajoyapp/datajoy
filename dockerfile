FROM node:boron

# Create app directory
RUN mkdir -p /var/www/datajoy
WORKDIR /var/www/datajoy

# Install app dependencies
COPY package.json /var/www/datajoy/
RUN npm install

# Bundle app source
COPY . /var/www/datajoy

EXPOSE 5000
CMD [ "http-server", ".", "-p", "5000" ]
