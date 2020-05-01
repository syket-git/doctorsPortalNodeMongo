const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_PATH;


app.use(cors());
app.use(bodyParser.json());

app.post("/appointments", (req, res) => {
    const appointment = req.body;
    console.log(appointment)
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    client.connect(err => {
    const collection = client.db("Appointments").collection("appointments");
    collection.insertOne(appointment, (err, documents) => {
        if(err){
            res.status(500).send({message:err})
        }else{
            console.log("successfully inserted", documents);
            res.send(documents.ops[0]);
        }
    })
    
    console.log("database connected..")
    //client.close();
});
})

app.post('/appointment-list', (req, res) => {
    const finalDate = (req.body);
    console.log(finalDate);
    
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
    client.connect(err => {
    const collection = client.db("Appointments").collection("appointments");
    collection.find(finalDate).toArray((err, documents) => {
        if(err){
            res.status(500).send({message:err})
        }else{
            console.log(documents);
            res.send(documents);
        }
    })
})
})







app.get('/', (req, res) => {
    res.send("Yes I did this")
})

app.get("/user/:id", (req, res) => {
    const id = (req.params.id);
    res.send(id);
})


const port = process.env.PORT || 4800;
app.listen(port, () => console.log("4800 port is listening..."));