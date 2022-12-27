const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Brayan Henrique",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Brayan Henrique",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need help?",
    name: "Brayan Henrique",
    msg: "I cant help you now, back in a few minutes",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          latitude,
          longitude,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: `404`,
    name: "Brayan henrique",
    errorMessage: "Oops! A 404, back to homepage",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "OOPS! A 404 page",
    name: "Brayan Henrique",
    errorMessage: "Back to home page!",
  });
});

app.listen(3000, () => {
  console.log("Running on port http://localhost:3000.");
});
