import "./OtherPage.scss";
import React from 'react';

function OtherPage() {
  return (
   <div style={{ paddingTop: "30px" }} >
    <div class="faq-header">Frequently Asked Questions</div>
      <div class="faq-content">
        <div class="faq-question">
          <input id="q1" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q1" class="panel-title">What is LamaEstate ?</label>
          <div class="panel-content">
          LamaEstate is a platform dedicated to real estate valuation. We use advanced algorithms to provide real-time property price estimates and offer reliable insights into the real estate market, covering both residential and commercial properties.
          </div>
        </div>
        
        <div class="faq-question">
          <input id="q2" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q2" class="panel-title">ow does property price estimation work ?</label>
          <div class="panel-content">We analyze current market trends and real-time sales data to predict property values. Our advanced algorithms consider various factors to deliver accurate price forecasts.</div>
        </div>
        
        <div class="faq-question">
          <input id="q3" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q3" class="panel-title">What types of properties are covered by LamaEstate ?</label>
          <div class="panel-content">We cover a wide range of properties, including residential homes, apartments, and commercial properties. Our services include buying, selling, and predicting prices for these different property types.</div>
        </div>

        <div class="faq-question">
          <input id="q4" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q4" class="panel-title">How can I access property price predictions ?</label>
          <div class="panel-content">You can access price predictions by subscribing to one of our plans (Basic, Pro, Premium), each of which provides a specific number of predictions per month. We also offer phone and email support.</div>
        </div>

        <div class="faq-question">
          <input id="q5" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q5" class="panel-title">Does LamaEstate offer property management services ?</label>
          <div class="panel-content">Yes, we offer property management services, including tools to help manage real estate, optimize sale prices, and provide investment advice.</div>
        </div>

        <div class="faq-question">
          <input id="q6" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q6" class="panel-title">What information is required to get a price estimate ?</label>
          <div class="panel-content">To provide an accurate estimate, we need details about the property, such as its location, size, number of bedrooms and bathrooms, as well as information about local market trends.</div>
        </div>

        <div class="faq-question">
          <input id="q7" type="checkbox" class="panel"/>
          <div class="plus">+</div>
          <label for="q7" class="panel-title">What are the benefits of choosing LamaEstate for my real estate investments ?</label>
          <div class="panel-content">LamaEstate offers precise market analysis and reliable price forecasts. With our advanced algorithms and expert team, you can make informed investment decisions and maximize your success in the real estate market.</div>
        </div>
      </div>
   </div>
  );
}

export default OtherPage;
