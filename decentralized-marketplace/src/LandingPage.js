// src/LandingPage.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Ensure to customize styles here

function LandingPage({ navigateToMarketplace }) {
  return (
    <div className="LandingPage">
      {/* Header */}
      <header className="bg-dark text-white p-3">
        <div className="container d-flex justify-content-between">
          <h1 className="h3">Swap Squad</h1>
          /*
          <nav>
            <a href="#features" className="text-white me-3">Features</a>
            <a href="#about" className="text-white">About</a>
          </nav>
          */
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/JayaIskandar/beanxpert-stock-img/main/block-wallpaper.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', minHeight: '400px' }}>
        <div className="container">
          <h2 className="display-4 font-weight-bold">Welcome to Swap Squad</h2>
          <p className="lead font-weight-bold">Buy, sell, and swap items securely in your local community.</p>
          <button className="btn btn-light btn-lg font-weight-bold" onClick={navigateToMarketplace}>Explore Marketplace</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center shadow-sm mb-4">
                <div className="card-body">
                  <h3>Local Listings</h3>
                  <p>Connect with buyers and sellers in your area.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm mb-4">
                <div className="card-body">
                  <h3>Secure Transactions</h3>
                  <p>Your transactions are safeguarded with blockchain technology.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm mb-4">
                <div className="card-body">
                  <h3>Easy Navigation</h3>
                  <p>Find what you need quickly with our user-friendly interface.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">About Swap Squad</h2>
          <p className="text-center">
            Swap Squad is a decentralized marketplace where users can buy, sell, and swap items locally. Empowering communities through secure and transparent transactions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-3">
        <div className="container text-center">
          <p>© 2024 Swap Squad. All Rights Reserved.</p>
          /*
          <p>
            <a href="#" className="text-white me-2">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </p>
          */
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
