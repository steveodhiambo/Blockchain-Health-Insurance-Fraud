import React, {Component} from 'react';
import {Card, Col, Row} from "antd";
import RejectedClaimsLineChart from "./Components/RejectClaimLineChart";
import {connect} from "react-redux";

class ClaimAnalysis1 extends Component {

  // componentWillMount() {
  //   const rejectedClaims = this.props.claims.rejectedClaims;
  //   const data = rejectedClaims.map((data,index)=>{
  //     if(data.date == "JAN" ){
  //       const count = 0;
  //       count
  //     }
  //   })
  // }



  render() {
    return (
      <div className="gx-main-content">
        <h2 className="title gx-mb-4">Claim Analysis</h2>
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Card className="gx-card" title="Rejected Claims">
              <RejectedClaimsLineChart/>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({claims}) =>({
  claims
});

export default connect(mapStateToProps, null)(ClaimAnalysis1);



