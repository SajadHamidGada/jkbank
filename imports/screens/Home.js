import React, { Component } from "react";
import { Radio } from "antd";
import DigitForm from "../components/DigitForm";
import IfscForm from "../components/IfscForm";
const RadioGroup = Radio.Group;
export default class Home extends Component {
  state = {
    checked: 1
  };
  onCheck = e => {
    this.setState({
      checked: e.target.value
    });
  };
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
          <p>
            Know Jammu & Kashmir Bank Branch Details or Convert your short
            account number into 16 Digit Account number
          </p>
          <hr />
        </header>
        <main>
          <RadioGroup onChange={this.onCheck} value={this.state.checked}>
            <Radio value={1}>Get 16 Digit Account Number</Radio>
            <Radio value={2}>Get IFSC Code</Radio>
          </RadioGroup>
          {this.state.checked === 1 ? (
            <section>
              <DigitForm />
            </section>
          ) : (
            <section>
              <IfscForm />
            </section>
          )}
        </main>
      </div>
    );
  }
}
