const http = require('http');
const server = http.createServer((req, res) => {
    const url = 'http://google.com';
    // const body = 'Hello World';
    const body = `<p>重定向<a href="${url}">${url}</a></p>`;
    req.setEncoding('utf8');
    // res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    // res.statusCode = 302;
    res.write(body, 'utf8');
    console.log(req.headers['user-agent']);
    res.end();
});
server.listen(3000);
