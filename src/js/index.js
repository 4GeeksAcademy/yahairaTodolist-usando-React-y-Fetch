//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import ListItems from "./component/todo.jsx"

const listItems=[
    {label: "Hacer esto", done : false},
    {label: "Y esto", done : false},
    {label: "Esto tambien", done : false},
    {label: "Esto talvez", done : false},
    {label: "Esto ya lo hice", done : true}];

//render your react application
ReactDOM.render(<ListItems  listItems={listItems} />, document.querySelector("#app"));
