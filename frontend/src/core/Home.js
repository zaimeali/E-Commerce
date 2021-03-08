import React from "react";

// API
import { API } from "../backend";

// Styles
// import "./../styles.css";

export default function Home() {
  console.log("API is: ", API);
  return <div>Home {API}</div>;
}
