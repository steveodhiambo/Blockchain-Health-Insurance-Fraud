import React from "react";
import {Col, Row} from "antd";

import IconWithTextCard from "components/Metrics/IconWithTextCard";
import Auxiliary from "util/Auxiliary";
import {connect} from "react-redux";


const ClaimAnalysis = (props) => {
  const unverified =props.claims.unverifiedClaims;
  const rejected = props.claims.rejectedClaims;
  const verified = props.claims.verifiedClaims;

  const unverifiedNo = String(unverified.length);
  const rejectedNo = String(rejected.length);
  const verifiedNo = String(verified.length);
  const sum = unverified.length + rejected.length + verified.length
  const totalClaims = String(sum)
  return (
    <Auxiliary>
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="editor" iconColor="geekblue" title={totalClaims} subTitle="Total number of Claims Created"/>
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="close-circle" iconColor="geekblue" title={rejectedNo} subTitle="Total number of Rejected Claims"/>
        </Col>
        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="check-circle-o" iconColor="geekblue" title={verifiedNo} subTitle="Total number of Verified Claims"/>
        </Col>

        <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="spam" iconColor="geekblue" title={unverifiedNo} subTitle="Total number of Unverified Claims"/>
        </Col>

      </Row>

    </Auxiliary>
  );
};

const mapStateToProps = ({claims}) =>({
  claims
});


export default connect(mapStateToProps, null)(ClaimAnalysis);
