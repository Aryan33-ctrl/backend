const http=require("http");

const myserver=http.createServer((req,res)=>{
    console.log("new request recieved");
    res.end("hello from server");
})

myserver.listen(8000,()=>{
    console.log("server started");
})