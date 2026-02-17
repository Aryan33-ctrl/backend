const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.json");

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const method = req.method;

    if (method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("server responded");
    }

    else if (method === "GET" && pathname === "/notes") {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("cannot get data");
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });
    }

    else if (method === "POST" && pathname === "/notes") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            fs.readFile(filePath, "utf-8", (err, data) => {
                let notes = [];

                if (!err && data) {
                    notes = JSON.parse(data);
                }

                const parsedBody = JSON.parse(body);
                notes.push(parsedBody);

                fs.writeFile(filePath, JSON.stringify(notes), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("error saving note");
                    } else {
                        res.writeHead(201, { "Content-Type": "text/plain" });
                        res.end("done!");
                    }
                });
            });
        });
    }
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
