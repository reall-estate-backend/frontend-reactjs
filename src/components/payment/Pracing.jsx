import React, { useEffect, useState } from "react";
import "./Pracing.scss";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import PaymentService from "../../services/PaymentService";

function Pracing({ userId }) {
  const user = "6749a2da6dc00c756ad0d6d1";
  const [showForm, setShowForm] = useState(true);
  const [pricePlan, setPricePlan] = useState(0);
  const [namePlan, setNamePlan] = useState("");
  const [subscriptionData, setSubscriptionData] = useState(null); 
  const [error, setError] = useState("");  
  
  const handleSubscribe = (price, name) => {
    setPricePlan(price);
    setNamePlan(name);
    setShowForm(false);
  
    const newSubscription = {
      namePlan: name,
      userId: user,  
      nbrPrediction: 0,
    };
  
    setSubscriptionData(newSubscription);
  
    const fetchSubscription = async () => {
      try {
        // Récupérer toutes les souscriptions
        const response = await PaymentService.getAllSubscriptions();
        const allSubscriptions = response.data;
  
        // Chercher la souscription de l'utilisateur
        const userSubscription = allSubscriptions.find(sub => sub.userId === user);
        if (userSubscription) {
          // Supprimer la dernière souscription de l'utilisateur
          await PaymentService.deleteSubscription(user);
          console.log("Ancienne souscription supprimée avec succès.");
        }
  
        // Enregistrer la nouvelle souscription
        const saveResponse = await PaymentService.saveSubscription(newSubscription);
        console.log("Nouvelle souscription enregistrée avec succès", saveResponse);
  
      } catch (err) {
        console.error("Erreur lors de la récupération ou de l'enregistrement de la souscription", err);
        setError("Une erreur est survenue lors de la gestion de la souscription.");
      }
    };
  
    fetchSubscription();
  };
  
  

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5252/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (pricePlan) {
      fetch(`http://localhost:5252/create-payment-intent/${pricePlan * 100}`, {
        method: "POST",
      }).then(async (result) => {
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      });
    }
  }, [pricePlan]);

  return (
    <>
      {showForm ? (
        <>
          <div className="pricing-header">
            <h1>Pricing Plan for Real Estate Price Prediction</h1>
            <p>
              Choose a plan to predict real estate prices and make informed
              investment decisions.
            </p>
          </div>

          <div className="columns">
            <ul className="price">
              <li className="header">Basic</li>
              <li className="grey">$ 9.99 / month</li>
              <li>5 predictions</li>
              <li className="grey">
                <a
                  href="#"
                  className="button"
                  onClick={() => handleSubscribe(9.99,"Basic")} 
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          <div className="columns">
            <ul className="price">
              <li className="header">Pro</li>
              <li className="grey">$ 24.99 / month</li>
              <li>10 predictions</li>
              <li className="grey">
                <a
                  href="#"
                  className="button"
                  onClick={() => handleSubscribe(24.99,"Pro")}
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          <div className="columns">
            <ul className="price">
              <li className="header">Premium</li>
              <li className="grey">$ 49.99 / month</li>
              <li>20 predictions</li>
              <li className="grey">
                <a
                  href="#"
                  className="button"
                  onClick={() => handleSubscribe(49.99,"Premium")}
                >
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <h1 className="titreh2">Pay for your subscription plan</h1>
          <div className="scrollable-container">
          <div>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
            </div>
         
          </div>
        </>
      )}
    </>
  );
}

export default Pracing;
