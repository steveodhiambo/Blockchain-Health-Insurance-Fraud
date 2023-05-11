import React, {Component} from "react";
import { Button, Card, Form, Input} from "antd";
import {connect} from "react-redux";
import {addClaim} from "../../appRedux/api/api";



const FormItem = Form.Item;


class CreateClaimForm extends Component {
  state = {
    claimId : '',
    date : '',
    totalamount : '',
    description : '',
    claimerId : '',
    verifierId : ''
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  createClaim = async () => {
    const newClaim = this.props.claims.auth;
    newClaim["claimId"] = this.state.claimId;
    newClaim["date"] = this.state.date;
    newClaim["totalamount"] = this.state.totalamount;
    newClaim["description"] = this.state.description;
    newClaim["claimerId"] = this.state.claimerId;
    newClaim["verifierId"] = this.state.verifierId;
    const response = await addClaim(newClaim);
    console.log(response.data);
    this.setState({
      claimId : '',
      date : '',
      totalamount : '',
      description : '',
      claimerId : '',
      verifierId : ''
    })
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Card className="gx-card" title="Registration Form" >
        <Form >

          <FormItem {...formItemLayout} label="Claim Id">
            <Input name="claimId" value={this.state.claimId} onChange={this.handleChange} style={{width: '50%'}}/>
          </FormItem>

          <FormItem {...formItemLayout} label="date">
            <Input name="date" value={this.state.date} onChange={this.handleChange} style={{width: '50%'}}/>
          </FormItem>

          <FormItem {...formItemLayout} label="Total Amount">
            <Input name="totalamount" value={this.state.totalamount} onChange={this.handleChange} style={{width: '50%'}}/>
          </FormItem>

          <FormItem {...formItemLayout} label="Patient ID">
            <Input name="verifierId" value={this.state.verifierId} onChange={this.handleChange} style={{width: '50%'}}/>
          </FormItem>

          <FormItem {...formItemLayout} label="Hospital ID">
            <Input name="claimerId" value={this.state.claimerId} onChange={this.handleChange} style={{width: '50%'}}/>
          </FormItem>

          <FormItem {...formItemLayout} label="Description">
            <Input name="description" value={this.state.description} onChange={this.handleChange} style={{width: '80%'}} />
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={()=>{this.createClaim()}}>Create Claim</Button>
          </FormItem>

        </Form>
      </Card>
    );
  }

}

const CreateClaim = Form.create()(CreateClaimForm);

const mapStateToProps = ({claims}) =>({
  claims
});


export default connect(mapStateToProps, null)(CreateClaim);
