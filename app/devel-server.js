const fs = require('fs');
const http = require('http');
const url = require('url');

const mimeTypes = {
    '.html': 'text/html',
    '.jgp': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
};

const getContentType = pathName => {
    // Set the default content type
    let contentType = 'application/octet-stream';
    // Set the contentType based on mime type
    for (var key in mimeTypes) {
        if (mimeTypes.hasOwnProperty(key)) {
            if (pathName.indexOf(key) > -1) {
                contentType = mimeTypes[key];
            }
        }
    }
    return contentType;
};

// Create a server and listen for incoming requests
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log("DEBUG :: POST request received.");
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });
        req.on('end', () => {
            // Handle the POST request data
            var writeStream = fs.createWriteStream("db.json");
            writeStream.write(data);
            writeStream.end();
            res.end('Data received successfully!');
        });
    }

    else if(req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        let pathName = parsedUrl.pathname;
        console.log("DEBUG :: GET request received: " + pathName);

        const baseDir = __dirname;
        const resContentType = getContentType(pathName);
        res.setHeader('Content-Type', resContentType);

        fs.readFile(`${baseDir}${pathName}`, (error, data) => {
            if (!error) {
                res.writeHead(200);
                res.end(data);
            } else {
                res.writeHead(302, {
                  'Location': '/index.html'
                });
                res.end();
            }
        });
    }
});
server.listen(3000)
