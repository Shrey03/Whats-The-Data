var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set("view engine", "ejs");


app.get("/", function(req, res) {
    res.render("search");
});


app.get("/results", function(req, res) {
    var query = req.query.city;
    var url = "https://api.weatherbit.io/v2.0/current?city=" + query + "&key=8d05c53189244c0e8bf497c3ff8d1494";
    // var url2 = "https://api.weatherbit.io/v2.0/alerts?city=" + query + "&key=8d05c53189244c0e8bf497c3ff8d1494";

    request(url, function(err, response, body) {


        if (!err && response.statusCode == 200) {
            var results = JSON.parse(body);
            console.log(results);
            res.render("result", data = results);

        }

    });

});

app.get("/movie", function(req, res) {
    var query = req.query.moviename;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"

    request(url, function(error, response, body) {

        if (!error && response.statusCode == 200) {
            var movie = JSON.parse(body)
            res.render("movie", data = movie);
            // res.send(results["Search"][0]["Title"]);


        }
    });
});







app.listen(3000, function() {
    console.log("Weather API started");
});