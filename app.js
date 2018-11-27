const express = require('express')
const app     = express()
const hbs     = require('hbs') 
const path    = require("path")


var user = {name: ''}
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



//______________ GET METHODS _______________________________________________________

// je passe dans le fichier index un user
app.get('/', function (req, res) {
  res.render("index", {user: {name: 'Rita'}})
})

/* pour avoir la page de profil associée à une personne en particulier.
:name => paramètre name. */
app.get('/profile/:name', function (req, res) {
    console.log(req.params.name) 
    res.render("index") 
}) // => dans la console je vois "Rita" et dans localhost:3000/profile/Rita j'ai le contenu de mon index.hbs

// Pareil que le app.get précédent
app.get('/profile/:prenom/:age/user', function (req, res) {
    console.log(req.params.prenom) 
    console.log(req.params.age) 
    res.render("index") 
}) // => dans la console je vois "Rita" "27" et dans localhost:3000/profile/Rita/27 j'ai le contenu de mon index.hbs


/* pour récuperer les paramètre d'une URL => 
Je tape l'URL dans mon navigateur.
exemple : http://localhost:3000/search?city=Barcelona */
app.get('/city', function (req, res) {
    console.log(req.query.city) 
    res.render("index") 
}) // => donne "Barcelona" dans la console.


/* on a créer un form dans index.hbs qui a comme action "/search". 
Lorsqu'on rempli le formulaire et qu'on clique sur le bouton "search" : */ 
app.get('/search', function (req, res) {
    console.log("search", req.query) 
    user.name= req.query.name
    res.render("index", {user}) 
}) // => affiche le contenu du formulaire dans la console.


//______________ POST METHODS  _______________________________________________________
app.post('/search', function (req, res,next) {
    req.body.name = req.body.name.toUpperCase()
    if (req.body.name) {
        next() 
    } else {
        res.render("index", {user: {name: "user par défaut"}})
    }
},

function (req, res) {
    console.log("search", req.body)
    user.name= req.body.name
    res.render("index", {user}) 
});


//_______________________________________________________________________________

app.listen(3000, () => console.log('Example app listening on port 3000!'))