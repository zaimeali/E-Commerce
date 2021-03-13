import React from "react";

// API
import { API } from "../backend";

// Styles
import "./../styles.css";

// Components
import Base from "./Base";

export default function Home() {
  // console.log("API is: ", API);
  return (
    <Base title="Home Page">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
      </div>
    </Base>
  );
}
