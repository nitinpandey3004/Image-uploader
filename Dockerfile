FROM node:10 AS ui-build
WORKDIR /app
COPY . ./angular-app/
RUN cd angular-app && npm install @angular/cli && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /app/angular-app/dist ./angular-app/dist
COPY /server/package*.json ./
RUN npm install
COPY ./server .
RUN ls -l

EXPOSE 3000

CMD ["node", "index.js"]