import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/add_track", (req, res) => {
    res.render("add_track.ejs");
});

// TODO Yael- I stopeed here
app.post("/save_track", (req, res) => {
    console.log(req.body);
    res.render("index.ejs", {
        tripName: req.body["trip_name"],
        tripStory: req.body["trip_story"]
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });