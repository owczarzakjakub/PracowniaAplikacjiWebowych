const http = require('http');
const { readFile } = require('fs/promises');
const { writeFile } = require('fs/promises');
const fsp = require('fs/promises');
const url = require('url');
const mime = require('mime-types');

http.createServer( async (req, res) => {
    switch(url.parse(req.url).pathname) {
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
        case "/get_params":
            res.writeHead(200, {'Content-Type': 'application/JSON; charset=UTF-8'});
            let adr = url.parse(req.url, true);
            let queryData = adr.query;
            let queryTimeStamp = Date.now();
            await fsp.writeFile(`params_${queryTimeStamp}.json`, JSON.stringify(queryData, null, 2));
            const JSONData = await fsp.readFile(`params_${queryTimeStamp}.json`, 'utf8');
            const queryFromJSON = JSON.parse(JSONData);
            res.write(JSONData);
            res.end();
            break;
        default:
            let undefinedUrl = url.parse(req.url, true);
            let undefinedPathname = undefinedUrl.pathname;
            let mimeType = mime.lookup(`assets${undefinedPathname}`);
            try{
                await fsp.access(`assets${undefinedPathname}`);
                res.writeHead(200, {'Content-Type': `${mimeType}; charset=UTF-8`});
                let undefinedFile = await fsp.readFile(`assets${undefinedPathname}`);
                res.write(undefinedFile);
                res.end();
            }
            catch(err){
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: 'Not found'}));
            }

    }
}).listen(3000);