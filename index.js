const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('#####');
  console.log(req.url);
  console.log('#####');

  if (req.url === '/foo') {
    const authorization = req.header('authorization');
    console.log(authorization);

    if (authorization === undefined) {
      res.writeHead(401, {
        'www-authenticate': 'Basic realm="foo".'
      });
      return res.end();
    }

    const matches = authorization.match(/[^\s]+$/);
    const secret = matches[0];
    console.log(Buffer.from(secret, 'base64').toString());

    if (secret !== Buffer.from('user:pass').toString('base64')) {
      res.writeHead(401, {
        'www-authenticate': 'Basic realm="foo".'
      });
      return res.end();
    }
  }

  if (req.url === '/bar') {
    const authorization = req.header('authorization');
    console.log(authorization);

    if (authorization === undefined) {
      res.writeHead(401, {
        'www-authenticate': 'Basic realm="bar".'
      });
      return res.end();
    }

    const matches = authorization.match(/[^\s]+$/);
    const secret = matches[0];
    console.log(Buffer.from(secret, 'base64').toString());

    if (secret !== Buffer.from('user:pass').toString('base64')) {
      res.writeHead(401, {
        'www-authenticate': 'Basic realm="bar".'
      });
      return res.end();
    }
  }


  next();
});

app.get('/', (_, res) => {
  res.send('top')
});

app.get('/foo', (_, res) => {
  res.send('foo')
});

app.get('/bar', (_, res) => {
  res.send('bar')
});

app.listen(9997)