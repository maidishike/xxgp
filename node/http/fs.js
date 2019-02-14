const http = require('http');
const qs = require('querystring');
const formidable = require('formidable');
let items = []

let server = http.createServer((req, res) => {
    if('/' == req.url) {
        switch(req.method){
            case 'GET':
                show(res);
                break;
            case 'POST':
                // add(req, res);
                upload(req, res);
                break;
            default:
                badRequest(res);
        }
    }else {
        notFound(res);
    }
});

server.listen(3000, () => {
    console.log('app start on port 3000');
});

function getItems(_items) {
    console.log(_items);
    _items.map((item) => {
        return `<li>${item}</li>`;
    });
}
function show(res) {
    let html = `<html>
                    <head>
                        <title>Todo List</title>
                    </head>
                    <body>
                        <h1>Todo List</h1>
                        <ul>`+
                        items.map((item) => {
                            return `<li>${item}</li>`
                        })
                        +`</ul>
                        <form method="post" enctype="multipart/form-data" action="/">
                        <p><input type="text" name='item' /></p>
                        <p><input type="file" name='file' /></p>
                        <p><input type="submit" value="Add Item" /></p>
                        </form>
                    </body>
                </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-length', Buffer.byteLength(html));
    res.end(html);
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}

function add (req, res) {
    console.log('add');
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        let obj = qs.parse(body);
        items.push(obj.item);
        show(res)
    })
}


function upload (req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
    }

    let form = new formidable.IncomingForm();

    form.on('field', (field, value) => {
        console.log(field);
        console.log(value);
    });

    form.on('file', (name, file) => {
        console.log(name);
        console.log(file);
    })

    form.on('end', () => {
        res.end('upload complete');
    });

    form.on('progress', (bytesReceived, bytesExpected) => {
        let percent = Math.floor(bytesReceived / bytesExpected *100) + '%';
        console.log(percent);
    });
    form.parse(req);

}

function isFormData (req) {
    let type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}
