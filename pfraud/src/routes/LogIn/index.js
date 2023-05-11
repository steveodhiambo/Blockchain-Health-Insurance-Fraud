import React, {Component} from "react";
import {Button, Form, Input} from "antd";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {updateAuth} from "../../appRedux/actions";


const FormItem = Form.Item;

class LogIn extends Component {

  state = {
    cardId:'',
    role:''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values", values)
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveToLocalStorage = ()=>{
    const {history } = this.props;
    const user = this.state.cardId;
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/create-claim');
  }

  render() {
    return (
      <div className="gx-login-container">
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <h1 className="gx-login-title">Sign In</h1>
          </div>
          <Form className="gx-login-form gx-form-row0">

            <FormItem label="Card Id">
              <Input name="cardId" value={this.state.cardId} onChange={this.handleChange} />
            </FormItem>

            <FormItem className="gx-text-center">
              <Button type="primary" onClick={()=>{this.saveToLocalStorage()}}>Login</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>({
  updateAuth: () => dispatch(updateAuth()),
});

export default connect(null,mapDispatchToProps)(withRouter(LogIn));
