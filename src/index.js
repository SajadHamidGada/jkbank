import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "../imports/route";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less' Antd styling
import "./styles.css"; // custom styles
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
