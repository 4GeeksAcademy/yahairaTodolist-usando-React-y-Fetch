//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import ListItems from "./component/home.jsx"

const listItems=[
    {label: "Por hacer ", done : false},
    {label: "Por hacer", done : false},
    {label: "Por hacer", done : false},
    {label: "Por hacer", done : false},
    {label: "Esto ya lo hice", done : true}];

//render your react application
ReactDOM.render(<ListItems  listItems={listItems} />, document.querySelector("#app"));
