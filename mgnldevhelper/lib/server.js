const http = require('http');
const PORT = 1407;
server = http.createServer().listen(PORT);
const args = process.argv.splice(2, process.argv.length);

const proxy = args[0] === "--proxy" && args.length > 1 ? { host: args[1].split(":")[0], port: parseInt(args[1].split(":")[1]) || 80 } : null;
if (!proxy) {
    console.error(" Define backend server with --proxy <hostname>:<port>");
    process.exit(1);
}

const handleRequest = (request, response, url) => {
    const backend = http.request({
        host: proxy.host,
        path: url || request.url,
        method: request.method,
        header: request.header,
        port: proxy.port
    }, async (resp) => {
        if (resp.statusCode === 301 || resp.statusCode === 302) {
            return handleRequest(request, response, resp.headers.location)
        }
        //resp.headers['X-Forwarded-For']  = request.connection.remoteAddress;            
        response.writeHead(resp.statusCode, resp.headers);
        if (resp.headers["content-type"].indexOf("text/html") !== -1) {

            resp.on('data', (chunk) => {
                let data = chunk.toString()
                .replace(/<link(.[\w\s"=+]*)href="(.[\w\s\/.]*)"(.[\w\s\/.=>"]*)/gm, '<script src="http://localhost:1407$2"></script>')
                .replace(/"\/_nuxt/gm, "\"http://localhost:1407/_nuxt")
                .replace(/url\(\//gm, "url(http://localhost:1407/");
                //.replace(/<img(.[\w\s"=+]*)src="(.[\w\s\/.]*)"(.[\w\s\/.=>"]*)/gm, '<img src="http://localhost:1407$2"/>')
                //.replace(/src="\//gm, "src=\"http://localhost:1407/")
                response.write(data);
            })
            resp.on("end", () => {
                
                response.end();
            })
            resp.on("error", (chunk) => {
                response.write(chunk.toString());
                response.end();
            })
        } else {
            resp.pipe(response);
        }
    });
    request.pipe(backend);
};

server.on('request', handleRequest);

console.log(`Proxy starting on port ${PORT}`);
console.log(`  proxy to ${proxy.host} on port ${proxy.port} `)