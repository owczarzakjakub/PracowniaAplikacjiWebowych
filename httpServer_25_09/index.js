let http = require('http');
const { readFile } = require('fs/promises');
http.createServer( async (req, res) => {
    switch(req.url){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
            res.write('Strona głównax');
            res.end();
            break;

            case "/jsonFile":
                res.writeHead(200, {'Content-Type': 'application/json'});
                const jsonText = "okejokej";
                res.write(JSON.stringify(jsonText));
                res.end();
                break;
        case "/nodeHtmlFile":
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            res.write('<h1>Html file</h1>');
            res.end();
            break;

        case "/htmlFile":
            // sposob 1
            // fs = require('fs');
            // fs.readFile('index.html', (err, html) => {
            //     if (err) {
            //         throw err;
            //     }
            //     res.writeHead(200, {'Content-Type' : 'text/html'});
            //     res.write(html);
            //     res.end();
            // });

            //sposob 2 (lepszy);
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            const file = await readFile('index.html', 'utf8');
            res.end(file.toString());
            break;
        default:
            res.status = 404;
            res.end("Error: Not Found");
    }
}).listen(8080);