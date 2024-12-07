const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const cors = require('cors');


// Autoriser CORS pour toutes les origines
app.use(cors());
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent/:price", async (req, res) => {
  try {
    const { price } = req.params; // Récupère le prix depuis l'URL

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: parseInt(price), // Utilise le prix envoyé dans l'URL (en centimes)
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});



app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
