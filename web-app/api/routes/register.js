const express= require('express');
const router = express.Router();

const network = require('../../network/network')

/**
 * All this are routes that are responsible for registering participants of the blockchain network
 */


// Register Patient participant route
router.post('/registerpatient', (req, res, next)=>{
    const patientData  = {
        cardId : req.body.cardId,
        verifierId: req.body.verifierId,
        birthDate: req.body.birthDate,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber : req.body.phonenumber,
        gender: req.body.gender
    };

    network.registerpatient(patientData)
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


// Register Hospital participant route
router.post('/registerhospital', (req, res, next)=>{
      let cardId = req.body.cardId
      let claimerId= req.body.claimerId
      let name= req.body.name

  network.registerhospital(cardId, claimerId, name)
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

// Register Insurer participant route
router.post('/registerinsurer', (req, res, next)=>{
      let cardId = req.body.cardId
      let registrationNumber= req.body.registrationNumber
      let name= req.body.name

  network.registerinsurer(cardId, registrationNumber, name)
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