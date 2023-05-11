import React, { Component } from "react";
import {Col, Row} from "antd";
import CardsListItem from "./Component/CardsListItem";
import {connect} from "react-redux";
import { getVerifiedRequest } from '../../appRedux/actions/Claims';

class VerifiedClaims extends Component {

  componentDidMount() {
    this.props.getVerifiedRequest();
  }

  render() {
    const verified = this.props.claims.verifiedClaims;
    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <h2>Verified Claims</h2>
          </Col>
          <Col span={24}>
            {verified && verified.map((data, index) => (
              <CardsListItem key={index} data={data} styleName="gx-card-list"/>
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
  getVerifiedRequest: () => dispatch(getVerifiedRequest()),
});


export default connect(mapStateToProps, mapDispatchToProps)(VerifiedClaims);
