import React,{Component} from "react";
import {Col, Row, Modal, Button, Input} from "antd";
import CardsListItem from "./Component/CardsListItem";
import {connect} from "react-redux";
import {getUnverifiedRequest} from "../../appRedux/actions";
import {rejectClaim, verifyClaim} from "../../appRedux/api/api";


class UnverifiedClaims extends Component {

  componentDidMount() {
    this.props.getUnverifiedRequest();
    console.log(this.props.claims.auth)
  }

  state = {
    claimId:'',
    issue: '',
    visible: false
  };

  showModal = (claimId) => {
    this.setState({
      claimId: claimId,
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  verifyClaimAction = async (claimId) => {
    const data = this.props.claims.auth;
    data["claimId"] = claimId;
    const response = await verifyClaim(data);
    console.log(response);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  // To be worked on
  rejectClaimAction = async () => {
    const data = this.props.claims.auth;
    data["claimId"] = this.state.claimId;
    data["issue"] = this.state.issue;
    const response = await rejectClaim(data);
    console.log(response);
    this.setState({
      visible : false,
      issue : '',
      claimId:''
    })
    console.log(data)
  };

  render() {
    const unverified = this.props.claims.unverifiedClaims;
    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <h2>Unverified Claims</h2>
            <Button type="primary" onClick={this.showModal}>Open</Button>
            <Modal
              title="Add Issue"
              visible={this.state.visible}
              onOk={this.rejectClaimAction}
              onCancel={this.handleCancel}
            >
              <Input name="issue" value={this.state.issue} onChange={this.handleChange} placeholder="Write down your issue here"/>
            </Modal>
          </Col>
          <Col span={24}>
            {unverified && unverified.map((data, index) => (
              <CardsListItem key={index} data={data}
                             verifyAction={this.verifyClaimAction}
                             rejectAction={this.rejectClaimAction}
                             state={this.state}
                             showModal={this.showModal}
                             handleCancel={this.handleCancel}
                             handleChange={this.handleChange}
                             styleName="gx-card-list" />
            ))}
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = ({claims}) =>({
  claims
});

const mapDispatchToProps = dispatch =>({
  getUnverifiedRequest: () => dispatch(getUnverifiedRequest()),
});


export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedClaims);
