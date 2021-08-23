const express = require ("express");
const application = express ();
const path = require ("path");
const fs = require ('fs');

const PORT = process.env.PORT || 3000;

//Redirecting static file reqs to public file path
application.use(express.static("public"));
//Allows server to accept data sent from FrontEnd
application.use(express.json());

application.get("/api/notes",(req,res) => {
    const notes = getData();
    res.json(notes);
});

application.post("/api/notes",(req,res) => {
    const note = req.body;
    note.id = Date.now();
    console.log(note);
    const notes = getData();
    notes.push(note);
    saveData(notes);
    res.end();
});

application.delete("/api/notes/:id",(req,res) => {
    const id = Number(req.params.id);
    console.log("deleting",id);
    const notes = getData();
    const index = notes.findIndex((note) => note.id === id );
    if (index >= 0) notes.splice(index,1);
    saveData(notes);
    res.end();
});

application.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

application.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

application.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
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