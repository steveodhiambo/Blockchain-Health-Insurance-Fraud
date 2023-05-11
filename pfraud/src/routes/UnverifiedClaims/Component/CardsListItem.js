import React from "react";
import {Button, Input, Modal} from "antd";

function CardsListItem({styleName, data,verifyAction,rejectAction,state,showModal,handleCancel,handleChange}) {
  const { claimId, date, totalamount, description, issue} = data;
  const verifier = String(data.verifier).split('#')[1];
  const claimer = String(data.claimer).split('#')[1];
  return (
    <div className={`gx-user-list ${styleName}`}>
      <i className="icon icon-copy gx-avatar-img gx-border-0 "/>
      <div className="gx-description">
        <p className="gx-flex-row">
          <span>Claim ID: {claimId}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span>Date: {date}</span>
        </p>
        <p>
          <span className="gx-mb-2">Description: {description}</span>
        </p>
        <p>
          <span className="gx-mr-3">Status: Unverified<span className="gx-text-grey"></span></span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Issue: {issue}<span className="gx-text-grey"></span></span>
        </p>
        <p>
          <span className="gx-mr-3">Amount: KSH{totalamount}<span className="gx-text-grey"></span></span>
        </p>
        <p>
          <span className="gx-mr-3">Patient ID: {verifier}<span className="gx-text-grey"></span></span>
          <span className="gx-mr-3">Hospital ID: {claimer}<span className="gx-text-grey"></span></span>
        </p>
      </div>
      <div className="gx-card-list-footer">
        <Button type="primary" onClick={()=>{verifyAction(claimId)}}>Verify</Button>
        <Button type="danger" onClick={()=>{showModal(claimId)}}>Reject</Button>
        <Modal
          title="Add Issue"
          visible={state.visible}
          onOk={rejectAction}
          onCancel={handleCancel}
        >
          <Input name="issue" value={state.issue} onChange={handleChange} placeholder="Write down your issue here"/>
        </Modal>
      </div>
    </div>
  );
}

export default CardsListItem;