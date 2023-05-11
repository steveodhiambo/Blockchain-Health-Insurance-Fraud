import React, {Component} from "react";
import {Col, Row} from "antd";
import CardsListItem from "./Component/CardsListItem";
import {connect} from "react-redux";
import {getRejectedClaimRequest} from "../../appRedux/actions";


class RejectedClaims extends Component {

  componentDidMount() {
    this.props.getRejectedClaimRequest();
  }

  render() {
    const rejected = this.props.claims.rejectedClaims;
    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <h2>Rejected Claims</h2>
          </Col>
          <Col span={24}>
            {rejected && rejected.map((data, index) => (
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
  getRejectedClaimRequest : () => dispatch(getRejectedClaimRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RejectedClaims);
