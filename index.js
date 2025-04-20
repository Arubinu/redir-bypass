const fs = require('fs');
const https = require('https');
const { parse } = require('url');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const server = https.createServer(options, (req, res) => {
  const parsedUrl = parse(req.url, true);

  const host = req.headers.host;
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (host === 'dealabs.digidip.net') {
    console.log('Requête reçue :', host, pathname);
    if (pathname === '/visit' && typeof query.url === 'string') {
      res.writeHead(302, { Location: query.url });
      res.end();
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Bad request: missing or invalid parameter for redirect');
    }
  } else {
    res.writeHead(302, { Location: 'http://' });
    res.end();
  }
});

server.listen(443, () => {
  console.log('Serveur en écoute sur le port 443');
});
