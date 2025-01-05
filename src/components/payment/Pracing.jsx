import React, { useEffect, useState } from "react";
import "./Pracing.scss";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { request } from "../../helpers/apiService"; 
import { getAuthUser } from "../../helpers/apiService";


function Pracing({ userId }) {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const authUser = getAuthUser();
      if (authUser) {
        console.log(user);
        try {
          const response = await request("GET", `/api/v1/users/${authUser.id}`);
          setUser(response.data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getUser();
  }, []);


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
      userId: user.id,  
      nbrPrediction: 0,
    };
  
    setSubscriptionData(newSubscription);
  
    const fetchSubscription = async () => {
      try {
        // Récupérer toutes les souscriptions
        const response = await request("GET", "/api/v1/users/allSubscriptions");
        const allSubscriptions = response.data;
  
        // Chercher la souscription de l'utilisateur
        const userSubscription = allSubscriptions.find(sub => sub.userId === user.id);
        if (userSubscription) {
          // Supprimer la dernière souscription de l'utilisateur
          await request('DELETE', `/api/v1/users/deleteSubscription/${user.id}`); 
          console.log("Ancienne souscription supprimée avec succès.");
        }
  
        // Enregistrer la nouvelle souscription
        const saveResponse = await request("POST", "/api/v1/users/createSubscription",newSubscription);
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
    //https://stripeproject.onrender.com
    fetch("https://stripeproject.onrender.com/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (pricePlan) {
      fetch(`https://stripeproject.onrender.com/create-payment-intent/${pricePlan * 100}`, {
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
