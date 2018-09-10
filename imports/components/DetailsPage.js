import React, { Component } from "react";
import { Button } from "antd";

export default class DetailsPage extends Component {
  state = {
    storage: undefined
  };
  componentWillMount() {
    // Get saved data from localStorage
    if (localStorage.bankDetails !== undefined) {
      console.log("datataaa", localStorage.bankDetails);
      var storage = JSON.parse(localStorage.bankDetails);
      this.setState({ storage });
    }
  }
  render() {
    return (
      <div className="wrapper">
        <header>
          <img
            src="https://uc.whimsical.co/5iYmzWSsMD4psv2bNE5BS8/8E7sHAhxPzEgi3.png"
            alt="J&K Bank's Logo"
            width="144px"
            height="50px"
            className="logo"
          />
        </header>
        <main>
          <h3 style={{ fontWeight: "900" }}> IFSC Code & Branch Details </h3>
          <div className="bankDetails">
            {this.state.storage === undefined ? (
              <div>
                <h1> No Data has been provided</h1>
              </div>
            ) : (
              <div>
                <div>
                  <h3> Branch Name </h3>
                  <h2>{this.state.storage["Branch Details"]["Branch Name"]}</h2>
                </div>
                <div>
                  <h3> State & District </h3>
                  <h2>
                    {this.state.storage.State} - {this.state.storage.District}
                  </h2>
                </div>
                <div>
                  <h3> IFSC Code</h3>
                  <h2>{this.state.storage["Branch Details"]["IFSC Code"]}</h2>
                </div>
                <div>
                  <h3> MICR Code</h3>
                  <h2>{this.state.storage["Branch Details"]["MICR"]}</h2>
                </div>
                <div>
                  <h3> BSR Code</h3>
                  <h2>{this.state.storage["Branch Details"]["BSR Code"]}</h2>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" onClick={() => this.props.history.push("/")}>
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }
}
