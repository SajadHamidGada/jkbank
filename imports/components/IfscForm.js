import React from "react";
import { Form, Select, Button } from "antd";
import { withRouter } from "react-router";
import { accountDetailsJson } from "../utils/xmlToJson";
const FormItem = Form.Item;
const Option = Select.Option;
class RegistrationForm extends React.Component {
  state = {
    result: "",
    states: [],
    districts: [],
    branches: []
  };
  componentDidMount() {
    const state = accountDetailsJson.map(i => i.State); //filtering the State out
    const states = [...new Set(state)]; //removing the redundant entries
    this.setState({ states });
  }
  handleState = value => {
    const district = accountDetailsJson
      .map(i => (i.State === value ? i.District : false))
      .filter(i => i !== false); //filtering the State out
    const districts = [...new Set(district)]; //removing the redundant entries
    this.setState({
      districts
    });
  };
  handleDistrict = value => {
    const branches = accountDetailsJson
      .map(i => (i.District === value ? i["Branch Details"] : false))
      .filter(i => i !== false); //filtering the District out
    this.setState({
      branches
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const branch = accountDetailsJson.filter(
          item => item["Branch Details"].SolrId === values.branch
        );

        const details = Object.assign({}, branch[0]);
        localStorage.setItem("bankDetails", JSON.stringify(details));
        this.props.history.push("/detailspage");
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Select State">
          {getFieldDecorator("state", {
            rules: [
              {
                required: true,
                message: "Please select your State"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Please Select your State"
              optionFilterProp="children"
              onChange={this.handleState}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.states.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem label="Select District">
          {getFieldDecorator("district", {
            rules: [
              {
                required: true,
                message: "Please select your District"
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Please Select your District"
              optionFilterProp="children"
              onChange={this.handleDistrict}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.districts.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
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
              {this.state.branches.map((item, index) => (
                <Option key={index} value={item.SolrId}>
                  {item["Branch Name"]}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <div style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit">
              GET
            </Button>
          </div>
        </FormItem>
      </Form>
    );
  }
}

const IfscForm = Form.create()(RegistrationForm);
export default withRouter(IfscForm);
