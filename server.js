const express = require ("express");
const application = express ();
const path = require ("path");
const fs = require ('fs');

//Redirecting static file reqs to public file path
application.use(express.static("public"));

application.get("/api/notes",(req,res) => {

});

application.post("/api/notes",(req,res) => {

});

application.delete("/api/notes/:id",(req,res) => {

});



application.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

application.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

application.listen(3000, () => {
    console.log("server listening on port 3000");
});

function getData () {
    const text = fs.readFileSync("./data/notes.json");
    const json = JSON.parse(text);
    return json;
}

function saveData (json) {
    const text = JSON.stringify(json);
    fs.writeFileSync("./data/notes.json",text);
}