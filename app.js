const express = require("express");
// const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const connexion = require("./data/mysql");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Bienvenues sur notre site")
})
//---------------------------------------  1)
app.get("/api/movies", (req, res) => {

    connexion.query("SELECT * FROM movie", (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
});

//---------------------------------------  2)

app.get("/api/movies/names", (req, res) => {

    connexion.query("SELECT (name) FROM movie", (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
})

//---------------------------------------  3)

app.get("/api/movies/search3", (req, res) => {

    connexion.query("SELECT * FROM movie WHERE name LIKE '%erm%' ", (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
})
//---------------------------------------  4)

app.get("/api/movies/search1", (req, res) => {

    connexion.query("SELECT * FROM movie WHERE release_date > '2000-01-01' ", (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
})

//---------------------------------------  5)

app.get("/api/movies/search2", (req, res) => {

    connexion.query("SELECT * FROM movie WHERE name LIKE 'M%' ", (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
})


//---------------------------------------  6)

app.get("/api/movies/:order", (req, res) => {
  const orderBy = req.params.order;
    connexion.query(`SELECT * FROM movie ORDER BY release_date ${orderBy}`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération de la liste des films')
        } else {
            res.json(results);
        }
    })
})

//---------------------------------------  7)

app.post("/api/movies", (req, res) => {

    const dataForm = req.body;

    connexion.query("INSERT INTO movie SET ?", dataForm, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'un film");
        } else {
            res.sendStatus(200);
        }
    })
})

//---------------------------------------  8)
app.put("/api/movies/:id", (req, res)=> {
    const idMovie = parseInt(req.params.id);
    const dataForms = req.body; 

    connexion.query("UPDATE movie SET ? WHERE id = ?", [dataForms, idMovie], (err, results) => {
        if(err){
            res.status(500).send("Erreur lors de la modification des données")
        } else {
            res.sendStatus(200)
        }
    })
})

//---------------------------------------  9)
app.put("/api/movies", (req, res)=> {

    connexion.query("UPDATE movie SET for_adult = NOT for_adult", (err, results) => {
        if(err){
            res.status(500).send("Erreur lors de la modification des données")
        } else {
            res.sendStatus(200)
        }
    })
})

//---------------------------------------  10)
app.delete("/api/movies/:id", (req, res) => {

    const dataForm = req.params.id;

    connexion.query("DELETE FROM movie WHERE id = ?", dataForm, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la supression d'un film");
        } else {
            res.sendStatus(200);
        }
    })
})

//---------------------------------------  11)

app.delete("/api/movies", (req, res) => {


    connexion.query("DELETE FROM movie WHERE for_adult = 0", (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la supression d'un film");
        } else {
            res.sendStatus(200);
        }
    })
})



app.listen(port, (err) => {
    if (err) {
        throw new Error("Something bad happened...");
    }
    console.log(`Server is listening on ${port}`)
})


