import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const API_WEATHER_URL = "https://api.met.no/weatherapi/locationforecast/2.0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.get("/add_track", (req, res) => {
    res.render("blog_add_track.ejs");
});

app.get("/enter_blog", (req, res) => {
    res.render("blog.ejs");
});

app.get("/find_location", (req, res) => {
    res.render("find_location.ejs");
});

app.get("/before_the_travel", (req, res) => {
    res.render("before_the_travel.ejs");
});

app.get("/weather_choose_location", (req, res) => {
    res.render("weather_choose_location.ejs");
});

app.get("/sport", (req, res) => {
    res.render("sport.ejs");
});

app.get("/atraction", (req, res) => {
    res.render("atraction.ejs");
});

app.get("/parks", (req, res) => {
    res.render("parks.ejs");
});

app.post("/save_track", (req, res) => {
    res.render("blog.ejs", {
        tripName: req.body["trip_name"],
        tripStory: req.body["trip_story"]
    });
});

// TODO yael- just wrote it, didn't test it yet
app.post("/weather", async (req, res) => {
    try {
        var tmp = Number((req.body["lat"]).toFixed(2));
        console.log(tmp);
        var lat = getDoubleNumber(req.body["lat"]);
        var lon = getDoubleNumber(req.body["lon"]);
        var url = API_WEATHER_URL + "/compact?lat=" + lat + "&lon=" + lon;
        console.log("the weather url is: " + url);
        const result = await axios.get(url);
        console.log(result.data);
        res.render("weather.ejs", {
            air_temperature: result.properties.timeseries[0].data.air_temperature,
            cloud_area_fraction: result.properties.username.timeseries[0].data.cloud_area_fraction,
            relative_humidity: result.properties.username.timeseries[0].data.relative_humidity,
            wind_speed: result.properties.username.timeseries[0].data.wind_speed,
         });
    } catch (error) {
        res.status(404).send(error.message);
    }
  });
  
function getDoubleNumber(num){
    if(num === parseInt(num, 10)){
        num = Number(num.toFixed(2));
    }
    return num;
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
