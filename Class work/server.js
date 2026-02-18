const http = require("http");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    console.log(method, url);

    if (method === "GET" && url === "/") {
        res.end("Hello World");
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(4000, () => {
    console.log("Server listening on port 4000");
}); 

