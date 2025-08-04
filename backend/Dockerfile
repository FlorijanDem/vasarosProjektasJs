FROM node:20

# Using for wait-for-postgres.sh
RUN apt-get update && apt-get install -y netcat-openbsd


WORKDIR /
COPY . .
RUN npm install

EXPOSE 3000
CMD ["npm", "start.js"]