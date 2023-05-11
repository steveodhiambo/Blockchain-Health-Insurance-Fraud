const express= require('express');
const router = express.Router();

const network = require('../../network/network');

/**
 * All this are routes that are responsible for running transaction in the network
 */

 
// verifyClaim
router.post('/verifyclaim', (req, res, next)=>{
  const claimData = {
    cardId : req.body.cardId,
    claimId : req.body.claimId
  }
    
  network.verifyClaimTransaction (claimData)
  .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
      } else {
        //else return success
        res.json({
          success: response
        });
  }
  });

});

// RejectClaim
router.patch('/rejectclaim', (req, res, next)=>{
  const claimData = {
    cardId : req.body.cardId,
    claimId : req.body.claimId,
    issue : req.body.issue
  }
    
  network.rejectClaimTransaction (claimData)
  .then((response) => {
      //return error if error in response
      if (response.error != null) {
        res.json({
          error: response.error
        });
      } else {
        //else return success
        res.json({
          success: response
        });
  }
  });

});

module.exports = router;