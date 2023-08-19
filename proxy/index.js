import * as fs from 'fs';
import * as https from 'https';
import Server from 'http-proxy';

const proxy = Server.createProxyServer({
  target: {
    host: '0.0.0.0',
    port: 3000,
  },
});

const web = (req, res) => {
  proxy.web(req, res);
};

const ws = (req, socket, head) => {
  proxy.ws(req, socket, head);
};

const server = https.createServer(
  {
    key: fs.readFileSync('0.0.0.0-key.pem'),
    cert: fs.readFileSync('0.0.0.0.pem'),
  },
  web,
);

server.on('upgrade', ws);

server.listen(3001, '0.0.0.0', () => {
  console.log(
    `proxy server has started listening on https://localhost:3001, forwarding to http://0.0.0.0:3000`,
  );
});