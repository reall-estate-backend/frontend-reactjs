import React, { useState,useEffect } from "react";
import "./home.scss";


function Home() {
  return (
    <div>
      <section id="billboard">
        <div class="main-banner pattern-overlay">
          <div class="banner-content" data-aos="fade-up">
            <h2 class="section-subtitle ">Advanced Real Estate Valuationy</h2>
            <h3 class="banner-title">
              Find Real Estate & Get Your Dream Place
            </h3>
            <p>
              {" "}
              Explore the latest market trends and get accurate property price
              estimates. We use advanced algorithms to provide you with
              real-time price analysis and reliable insights.
            </p>
            <div class="btn-wrap">
              <a href="#" class="btn-accent">
                {" "}
                Get Started
              </a>
            </div>
          </div>
          <figure>
            <img
              src="back1.png"
              alt="banner"
              class="banner-image"
            />
          </figure>
        </div> 
      </section>

      <section id="about">
          <div class="row">
            <div class="inner-content">
              <div class="company-detail">
                <div class="grid">
                  <figure>
                    <img src="bg.png" alt="book" class="single-image" />
                  </figure>
                  <div class="detail-entry" data-aos="fade-up">
                    <div class="section-header">
                      <h2 class="section-subtitle liner">About Us</h2>
                      <h3 class="section-title">
                        Providing Insightful Real Estate Analysis for Better
                        Investments
                      </h3>
                    </div>

                    <div class="detail-wrap">
                      <p>
                        We specialize in providing accurate property price
                        predictions and insights into the real estate market.
                        Our team uses cutting-edge algorithms to analyze trends
                        and offer reliable, real-time data to help you make
                        informed investment decisions. From residential to
                        commercial properties, we cover all aspects of the real
                        estate market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section id="services">
          <div class="row">
            <div class="inner-content">
              <div class="service-content">
                <div class="grid">
                  <div class="detail-entry">
                    <div class="section-header">
                      <h2 class="section-subtitle liner">Services</h2>
                      <h3 class="section-title">
                        Tailored Real Estate Solution
                      </h3>
                    </div>

                    <div class="detail-wrap">
                      <p>
                        Our platform provides essential tools and services for
                        buying, selling, and predicting property prices. Whether
                        you're looking for market insights or direct contact
                        with sellers, we offer everything you need to make
                        informed decisions in the real estate market.
                      </p>
                      <div class="btn-wrap">
                        <a href="/" class="btn-accent">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="service-grid grid" data-aos="fade-up">
                    <div class="column odd-column">
                      <div class="icon-box">
                        <img src="images/creative.png" alt="branding" />
                        <div class="title">Price Prediction</div>
                      </div>
                      <div class="icon-box">
                        <img src="images/animation.png" alt="animation" />
                        <div class="title">Property Sales</div>
                      </div>
                    </div>

                    <div class="column">
                      <div class="icon-box">
                        <img src="images/branding.png" alt="branding" />
                        <div class="title">Property Buying</div>
                      </div>
                      <div class="icon-box">
                        <img src="images/data-research.png" alt="animation" />
                        <div class="title">Direct Contact</div>
                      </div>
                      <div class="icon-box">
                        <img src="images/seo.png" alt="animation" />
                        <div class="title">Market Trends Analysis</div>
                      </div>
                    </div>

                    <div class="column odd-column">
                      <div class="icon-box">
                        <img src="images/code.png" alt="branding" />
                        <div class="title">Investment Advice</div>
                      </div>
                      <div class="icon-box">
                        <img src="images/creative.png" alt="animation" />
                        <div class="title">Property Management</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section id="latest-blog">
          <div class="row">
          
              <div class="section-header align-center">
               <h3 class="section-title ">Top Offers</h3>
                <h2 class="section-subtitle ">Explorer tout les offres</h2>


              <div class="grid" data-aos="fade-up">
                <article class="column">
                  <figure>
                    <a href="#" class="image-hvr-effect">
                      <img
                        src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="post"
                        class="post-image"
                      />
                    </a>
                  </figure>

                  <div class="post-item">
                    <div class="meta-tag">
                      <div class="meta-date">$350,000</div>
                      <a href="#" class="categories">
                        123 Main St, Cityville
                      </a>
                    </div>

                    <h3 class="post-title">
                      <a href="#">
                        Beautiful Modern House 3 bedroom | 2 bathroom
                      </a>
                    </h3>
                  </div>
                </article>

                <article class="column">
                  <figure>
                    <a href="#" class="image-hvr-effect">
                      <img
                        src="https://img.freepik.com/free-photo/house-isolated-field_1303-23773.jpg"
                        alt="post"
                        class="post-image"
                      />
                    </a>
                  </figure>

                  <div class="post-item">
                    <div class="meta-tag">
                      <div class="meta-date">$250,000</div>
                      <a href="#" class="categories">
                        456 Elm St, Townsville
                      </a>
                    </div>

                    <h3 class="post-title">
                      <a href="/">Spacious Apartment 3 bedroom | 2 bathroom</a>
                    </h3>
                  </div>
                </article>

                <article class="column">
                  <figure>
                    <a href="/" class="image-hvr-effect">
                      <img
                        src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwcmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="post"
                        class="post-image"
                      />
                    </a>
                  </figure>

                  <div class="post-item">
                    <div class="meta-tag">
                      <div class="meta-date">$150,000</div>
                      <a href="/" class="categories">
                        789 Oak St, Suburbia
                      </a>
                    </div>

                    <h3 class="post-title">
                      <a href="/">Cozy Cottage 4 bedroom | 1 bathroom</a>
                    </h3>
                  </div>
                </article>
              </div>
            </div>
          </div>
      
      </section>

      <section id="price-table">
      
          <div class="row">
            <div class="inner-content">
              <div class="section-header align-center">
              <h3 class="section-title">Pricing Plan</h3>
                <h2 class="section-subtitle">Our affordable pricing</h2>
              </div>

              <div class="grid">
                <div class="column align-center">
                  <div class="category-title">Basic</div>
                  <div class="price">
                    <sup>$</sup>
                    <strong>9.99</strong>
                    <small>/mo</small>
                  </div>
                  <ul>
                    <li>
                      <b>5 predictions</b>{" "}
                    </li>
                    <li>Phone & email support </li>
                  </ul>
                  <div class="btn-wrap">
                    <a href="#" class="btn-outline-accent">
                      Choose Plan
                    </a>
                  </div>
                </div>

                <div class="column align-center">
                  <div class="category-title">Pro</div>
                  <div class="price">
                    <sup>$</sup>
                    <strong>24.99</strong>
                    <small>/mo</small>
                  </div>
                  <ul>
                    <li>
                      <b>10 predictions</b>
                    </li>
                    <li>Phone & email support </li>
                  </ul>
                  <div class="btn-wrap">
                    <a href="#" class="btn-outline-accent">
                      Choose Plan
                    </a>
                  </div>
                </div>

                <div class="column align-center">
                  <div class="category-title">Premium</div>
                  <div class="price">
                    <sup>$</sup>
                    <strong>49.99</strong>
                    <small>/mo</small>
                  </div>
                  <ul>
                    <li>
                      <b>20 predictions</b>{" "}
                    </li>
                    <li>Phone & email support </li>
                  </ul>
                  <div class="btn-wrap">
                    <a href="#" class="btn-outline-accent">
                      Choose Plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
      </section>

      <div id="footer-bottom">
        <div class="container ">
          <div class="copyright ">
            <p>
              © 2024 <a href="https://templatesjungle.com/">LamaEstate.</a> All
              rights reserved. | Support : support@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
