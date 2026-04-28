import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Smart Clinic CMS</h1>
          <p>
            Manage Patients, Doctors, Appointments & Billing in one place
          </p>

          <button className="home-btn">
            Get Started
          </button>
        </div>
      </section>


      {/* STATS */}
      <section className="home-stats">

        <div className="home-stat-card">
          <h2>1200+</h2>
          <p>Patients</p>
        </div>

        <div className="home-stat-card">
          <h2>50+</h2>
          <p>Doctors</p>
        </div>

        <div className="home-stat-card">
          <h2>300+</h2>
          <p>Appointments</p>
        </div>

        <div className="home-stat-card">
          <h2>₹5L+</h2>
          <p>Revenue</p>
        </div>

      </section>


      {/* CMS MODULES */}
      <section className="home-modules">

        <h2>CMS Modules</h2>

        <div className="home-module-grid">

          <div className="home-module-card">
            <h3>Patient Management</h3>
            <p>Add / Edit Patients</p>
          </div>

          <div className="home-module-card">
            <h3>Doctor Management</h3>
            <p>Manage Doctors</p>
          </div>

          <div className="home-module-card">
            <h3>Appointments</h3>
            <p>Book Appointment</p>
          </div>

          <div className="home-module-card">
            <h3>Billing</h3>
            <p>Generate Bills</p>
          </div>

        </div>

      </section>



      {/* ARTICLES */}
      <section className="home-articles">

        <h2>Latest Articles</h2>

        <div className="home-article-grid">

          <div className="home-article-card">
            <img src="https://images.unsplash.com/photo-1584515933487-779824d29309"/>
            <h3>Modern Clinic Management</h3>
            <p>Improve healthcare system using CMS</p>
            <button>Explore</button>
          </div>

          <div className="home-article-card">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118"/>
            <h3>Patient Care Technology</h3>
            <p>Digital patient management system</p>
            <button>Explore</button>
          </div>

          <div className="home-article-card">
            <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54"/>
            <h3>Smart Doctor Dashboard</h3>
            <p>Track appointments easily</p>
            <button>Explore</button>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="home-footer">
        <p>© 2026 Surabhi Clinic CMS</p>
      </footer>

    </div>
  );
}

export default Home;