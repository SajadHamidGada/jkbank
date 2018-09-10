import React from "react";
import { accountDetailsJson, accountTypeDetailsJson } from "../utils/xmlToJson";
import { Form, Input, InputNumber, Icon, Select, Button } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class RegistrationForm extends React.Component {
  state = {
    result: "",
    branchOffices: [],
    accountTypes: [],
    copySuccess: ""
  };
  componentDidMount() {
    //initializing the static data to the states of the App
    this.setState({
      branchOffices: accountDetailsJson,
      accountTypes: accountTypeDetailsJson
    });
  }
  //this is to copy the result into your clipboA
  copyToClipboard = e => {
    const copyText = document.getElementById("copyText");
    copyText.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
    setTimeout(() => this.setState({ copySuccess: "" }), 2000);
  };
  /*to fill the remaining result with Zero's 
    after taking all input from UI, so that to get 16 Digit Number
  */
  getZeros = values => {
    const { branch, accountType, accountNumber } = values;
    const datum = (branch + accountType + accountNumber).length;
    if (datum < 16) {
      const count = datum === 0 || datum > 16 ? 0 : 16 - datum;
      // fill with 0 from position 2 until position 4
      // console.log(array1.fill(0, 2, 4));
      const zeros = Array.from(Array(count), () => 0).join("");
      const result = branch + accountType + zeros + accountNumber;
      return result;
    }
    return "please provide the correct information";
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const result = this.getZeros(values);
        this.setState({ result });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Select Branch">
          {getFieldDecorator("branch", {
            rules: [
              {
                required: true,
                message: "Please select your Branch"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Please Select your Branch"
              optionFilterProp="children"
              onChange={this.handleBranch}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.branchOffices.map((item, index) => (
                <Option key={index} value={item["Branch Details"].SolrId}>
                  {item["Branch Details"]["Branch Name"]}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Select Account Type">
          {getFieldDecorator("accountType", {
            rules: [
              {
                required: true,
                message: "Please select your Account Type"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select your Account Type"
              optionFilterProp="children"
              onChange={this.handleAccountType}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.accountTypes.map((item, index) => (
                <Option key={index} value={item["Account Code"]}>
                  {item["Account Name"]}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Enter your Account Number">
          {getFieldDecorator("accountNumber", {
            rules: [
              {
                required: true,
                message: "Please provide your Account Number"
              }
            ]
          })(
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              onChange={this.handleAccountNumber}
              formatter={value => `${value}`.replace(".", "")}
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
            />
          )}
        </FormItem>
        <FormItem>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              GET
            </Button>
          </div>
        </FormItem>
        {this.state.result.length === 0 ? (
          ""
        ) : (
          <div className="result">
            <h3 style={{ fontSize: 14 }}> Your 16 Digit Account Number is </h3>
            <TextArea
              className="resultDisplay"
              readOnly
              value={this.state.result}
              id={"copyText"}
              autosize={{ minRows: 2, maxRows: 6 }}
            />

            {/* Logical shortcut for only displaying the 
                   button if the copy command exists */
            document.queryCommandSupported("copy") && (
              <div className="clipboard">
                <Icon
                  style={{ cursor: "pointer" }}
                  type="copy"
                  onClick={this.copyToClipboard}
                />
                <a onClick={this.copyToClipboard}>
                  <h3>Copy Account Number</h3>
                </a>
              </div>
            )}
            <h3>{this.state.copySuccess}</h3>
          </div>
        )}
      </Form>
    );
  }
}
const DigitForm = Form.create()(RegistrationForm);
export default DigitForm;
