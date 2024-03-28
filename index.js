const http = require('http');
const path = require('path');
const fs = require('fs');

//Create a Server
const server = http.createServer((req, res) => {
    // console.log(req.url);
    /*if(req.url === '/') {
        //Serve the homepage here
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if(err) throw err;
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(data);
        });
    }

    if(req.url === '/about') {
        //Serve the about page here
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
            if(err) throw err;
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(data);
        });
    }

    if(req.url === '/api/users') {
        
        const users = [
            {
                name : 'ABC',
                age : 27
            },
            {
                name : 'XYZ',
                age : 25
            }
        ];
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(users));
    }*/

    //Build a dynamic path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    //Extension of the file
    let extName = path.extname(filePath);

    //Init content type
    let contentType = 'text/html';

    switch(extName) {
        case '.js' : 
            contentType = 'text/javascript';
            break;
        case '.css' :
            contentType = 'text/css';
            break;
        case '.json' : 
            contentType = 'application/json';
            break;
        case '.jpg' : 
            contentType = 'image/jpg';
            break;
        case '.png' :
            contentType = 'image/png';
            break;
    }

    //Readfile
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type' : 'text/html' });
                    res.end(content);
                });
            } else {
                //Some Server error
                res.writeHead(500);
                res.end('Server Error: ',err.code);
            }
        } else {
            //Success
            res.writeHead(200, { 'Content-Type' : contentType });
            res.end(content);
        }
    })

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('Server up and running on port ',PORT);
});
