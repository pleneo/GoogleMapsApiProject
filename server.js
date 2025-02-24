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

app.get("/api/markers/search", async (req, res) => {
  try {
    let { name, lat, lng } = req.query;

    // Remove possíveis aspas dos valores (caso existam)
    lat = lat.replace(/"/g, '');
    lng = lng.replace(/"/g, '');

    const marker = await Mark.findOne({ 
      name: name,
      lat: lat, 
      lng: lng 
    });

    if (!marker) {
      return res.status(404).json({ 
        error: "Marcador não encontrado.",
        query: { name, lat, lng } // Para debug
      });
    }
    
app.get("/api/markers/:_id", async (req, res) => {
  try {
      const marker = await Mark.findById(req.params._id);
      if (!marker) {
          return res.status(404).json({ error: "Marcador não encontrado" });
      }
      res.json(marker);
  } catch (err) {
      res.status(400).json({ error: "ID inválido ou erro no servidor" });
  }
});


    res.json(marker);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor." });
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

app.delete("/", function(req,res){
    let markerToDelete = new Mark({
      name: null,
      lat: null,
      lng: null
    })
    markerToDelete.deleteOne({name:name, lat:lat, lng:lng })
    res.redirect("/");
})

app.listen(3000, function() {
  console.log("server running on 3000")
})