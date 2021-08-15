const express = require ("express");
const application = express ();
const path = require ("path");

//Redirecting static file reqs to public file path
application.use(express.static("public"));



application.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

application.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

application.listen(3000, () => {
    console.log("server listening on port 3000");
});