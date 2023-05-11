const express= require('express');
const router = express.Router();

const network = require('../../network/network')

/**
 * All this are responsible for handling Claims
 */
// Add a claim
router.post('/claim', (req, res, next)=>{
  const claimData = {
    cardId : req.body.cardId,
    claimId : req.body.claimId,
    date : req.body.date,
    totalamount : req.body.totalamount,
    description : req.body.description,
    claimerId : req.body.claimerId,
    verifierId : req.body.verifierId
  }

  network.createClaimTransaction (claimData)
  .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
      } else {
        //else return success
        res.json({
          message: "Claim was created"
        });
  }
  });

});


// Get All  verified claims associated to a user
router.post('/verifiedclaims', (req, res, next)=>{
        
    const cardId = req.body.cardId;

    network.verifiedClaims(cardId)
    .then((response) => {
        //return error if error in response
        if (response.error != null) {
          res.json({
            error: response.error
          });
        } else {
          //else return success
          res.json({
            verifiedclaims: response
          });
    }
    });

});

// Get All  unverified claims associated to a user
router.post('/unverifiedclaims', (req, res, next)=>{
  
  let cardId = req.body.cardId;

  network.unverifiedClaims(cardId)
  .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
      } else {
        //else return success
        res.json({
          unverifiedclaims: response
        });
  }
  });

});

// Get All  unverified claims with issues associated to a user
router.post('/issueclaims', (req, res, next)=>{
  let cardId = req.body.cardId
  
  network.issueClaims(cardId)
  .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
      } else {
        //else return success
        res.json({
          rejectedclaims: response
        });
  }
  });

});


module.exports = router;
