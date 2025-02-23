const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://test:test1234@mapsapiproject.n7yka.mongodb.net/MapsAPIProject")

const markerSchema = {
    name: String,
    lat: String,
    lng: String
}

const Mark = mongoose.model("Marker", markerSchema);

app.get("/api/markers", async (req, res) => {
  try {
      const markers = await Mark.find({});
      res.json(markers);
  } catch (err) {
      res.status(500).json({ error: "Erro ao buscar marcadores" });
  }
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
    let newMarker = new Mark({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng
    })
    newMarker.save();
    res.redirect("/");
})
app.listen(3000, function() {
  console.log("server running on 3000")
})