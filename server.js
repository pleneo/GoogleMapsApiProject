const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

//mongodb key for connect to your DB. change this to your mongodb atlas connection string.
mongoose.connect("mongodb+srv://test:test1234@mapsapiproject.n7yka.mongodb.net/MapsAPIProject")

const markerSchema = {
    name: String,
    lat: String,
    lng: String
}

const Mark = mongoose.model("Marker", markerSchema);

//GET Method to retrieve all data
app.get("/api/markers", async (req, res) => {
  try {
      const markers = await Mark.find({});
      res.json(markers);
  } catch (err) {
      res.status(500).json({ error: "Erro ao buscar marcadores" });
  }
});

//GET Method to a specific object. find by name, lat and lng.
app.get("/api/markers/search", async (req, res) => {
    let { name, lat, lng } = req.query;

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
  })
    
//GET Method to find by id.
app.get("/api/markers/:_id", async (req, res) => {
  try {
      const marker = await Mark.findById(req.params._id);
      if (!marker) {
          return res.status(404).json({ error: "Marcador não encontrado" });
      }
      res.json(marker);
  } catch (err) {
      res.status(400).json({ error: "ID inválido" });
  }


    res.json(marker);
  }) 

//Show HTML File in localhost:3000
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

//POST Method
app.post("/", function(req, res){
    let newMarker = new Mark({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng
    })
    newMarker.save();
    res.redirect("/");
})


//DELETE Method
app.delete("/api/markers", async (req, res) => {

    const { name, lat, lng } = req.query;

    if (!name || !lat || !lng) {
      return res.status(400).json({ error: "É necessário a inserção dos parametros name, lat e lng" });
    }

    const result = await Mark.deleteOne({ 
      name: name,
      lat: lat,
      lng: lng 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Marcador não encontrado" });
    }

    res.json({ message: "Marcador excluído com sucesso" });

});

//Define port 3000 as localhost server port.
app.listen(3000, function() {
  console.log("server running on 3000")
})