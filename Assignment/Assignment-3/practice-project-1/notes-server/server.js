const http=require("http");

const server=http.createServer((req,res)=>{
    res.writeHead(200,{"content-type":"text/plain"});
    res.end("server is listening");

    server.listen(3000,()=>{console.log("server running on http daily host 3000")});


})