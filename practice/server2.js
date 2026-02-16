const user={
    name:"Aryan Dixit",
    Age:"17"
}
const http = require("http");
const fs=require("fs");

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = new URL(req.url,`http://${req.headers.host}`);

    if(method==="GET" && url.pathname==="/user"){
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify(user))
    
    }
    if(method=="POST" && url.pathname=="/user"){
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk;
        })
        req.on("end",()=>{
            fs.appendFile("./file.txt",body,()=>{
                res.writeHead(201,"DATA WRITTEN");
                res.end();
            })
        })
    }


});

server.listen(4000, () => {
    console.log("Server listening on port 5000");
}); 
