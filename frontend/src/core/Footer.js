import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out</h4>
        <button className="btn btn-warning">Contact Us</button>
      </div>
      <div className="container text-center">
        <span className="text-muted">
          An amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  );
}
