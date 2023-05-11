const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

//declare namespace
const namespace = 'org.insurancefraud';

//in-memory card store for testing so cards are not persisted to the file system
const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

//admin connection to the blockchain, used to deploy the business network
let adminConnection;

//this is the business network connection the tests will use.
let businessNetworkConnection;

let businessNetworkName = 'insurancefraud';
let factory;


/*
 * Import card for an identity
 * @param {String} cardName The card name to use for this identity
 * @param {Object} identity The identity details
 */
async function importCardForIdentity(cardName, identity) {

  //use admin connection
  adminConnection = new AdminConnection();
  businessNetworkName = 'insurancefraud';

  //declare metadata
  const metadata = {
      userName: identity.userID,
      version: 1,
      enrollmentSecret: identity.userSecret,
      businessNetwork: businessNetworkName
  };

  //get connectionProfile from json, create Idcard
  const connectionProfile = require('./local_connection.json');
  const card = new IdCard(metadata, connectionProfile);

  //import card
  await adminConnection.importCard(cardName, card);
}


/*
* Reconnect using a different identity
* @param {String} cardName The identity to use
*/
async function useIdentity(cardName) {

  //disconnect existing connection
  await businessNetworkConnection.disconnect();

  //connect to network using cardName
  businessNetworkConnection = new BusinessNetworkConnection();
  await businessNetworkConnection.connect(cardName);
}


//export module
module.exports = {

  /*
  * Create patient participant and import card for identity
  * @param {String} cardId Import card id for patient
  * @param {String} accountNumber patient account number as identifier on network
  * @param {String} firstName patient first name
  * @param {String} lastName patient last name
  * @param {String} phoneNumber patient phone number
  * @param {String} email patient email
  */
 registerpatient: async function (patientData) {
    try {

      //connect as admin
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@insurancefraud');

      //get the factory for the business network
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      //create Patient participant
      const patient = factory.newResource(namespace, 'Patient', patientData.verifierId);
      patient.verifierId = patientData.verifierId;
      patient.birthDate = patientData.birthDate;
      patient.firstname = patientData.firstname;
      patient.lastname = patientData.lastname;
      patient.phonenumber = patientData.phonenumber;
      patient.gender = patientData.gender;


      //add patient participant
      const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Patient');
      await participantRegistry.add(patient);

      //issue identity
      const identity = await businessNetworkConnection.issueIdentity(namespace + '.Patient#' + patientData.verifierId, patientData.cardId);

      //import card for identity
      await importCardForIdentity(patientData.cardId, identity);

      //disconnect
      await businessNetworkConnection.disconnect('admin@insurancefraud');

      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Create hospital participant and import card for identity
  * @param {String} cardId Import card id for patient
  * @param {String} hodpitalId as identifier on network
  * @param {String} name hospital name
  */
 registerhospital: async function (cardId, claimerId, name) {
    try {

      //connect as admin
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@insurancefraud');

      //get the factory for the business network
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      //create Hospital participant
      const hospital = factory.newResource(namespace, 'Hospital', claimerId);
      hospital.claimerId = claimerId;
      hospital.name = name;

      //add Hospital participant
      const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Hospital');
      await participantRegistry.add(hospital);

      //issue identity
      const identity = await businessNetworkConnection.issueIdentity(namespace + '.Hospital#' + claimerId, cardId);

      //import card for identity
      await importCardForIdentity(cardId, identity);

      //disconnect
      await businessNetworkConnection.disconnect('admin@insurancefraud');

      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Create insurer participant and import card for identity
  * @param {String} cardId Import card id for patient
  * @param {String} registrationNumber number as identifier on network
  * @param {String} name hospital name
  */
 registerinsurer: async function (cardId, registrationNumber, name) {
    try {

      //connect as admin
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect('admin@insurancefraud');

      //get the factory for the business network
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      //create Hospital participant
      const insurer = factory.newResource(namespace, 'Insurer', registrationNumber);
      insurer.registrationNumber = registrationNumber;
      insurer.name = name;

      //add Hospital participant
      const participantRegistry = await businessNetworkConnection.getParticipantRegistry(namespace + '.Insurer');
      await participantRegistry.add(insurer);

      //issue identity
      const identity = await businessNetworkConnection.issueIdentity(namespace + '.Insurer#' + registrationNumber, cardId);

      //import card for identity
      await importCardForIdentity(cardId, identity);

      //disconnect
      await businessNetworkConnection.disconnect('admin@insurancefraud');

      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

    /*
  * Perform CreateClaim transaction
  * @param {String} cardId Card id to connect to network
  * @param {String} claimerId number of hospital
  * @param {String} claimId Id of claim
  * @param {String} date
  * @param {String} totalamount
  * @param {String} description 
  * @param {String} date
  */
 createClaimTransaction: async function (claimData) {

    try {

      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(claimData.cardId);

      //get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();

      //create transaction
      const claim = factory.newTransaction(namespace, 'CreateClaim');
      claim.claimId = claimData.claimId;
      claim.date = claimData.date;
      claim.totalamount = claimData.totalamount;
      claim.description = claimData.description;
      claim.claimer = factory.newRelationship(namespace, 'Hospital', claimData.claimerId);
      claim.verifier = factory.newRelationship(namespace, 'Patient', claimData.verifierId);

      //submit transaction
      await businessNetworkConnection.submitTransaction(claim);

      //disconnect
      await businessNetworkConnection.disconnect(claimData.cardId);
 
      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Perform Verify Claim
  */
 verifyClaimTransaction: async function (claimData) {
    try {

      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(claimData.cardId);

      //get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();
      
      //create transaction
      const claim = factory.newTransaction(namespace, 'VerifyClaim');
      claim.claim = factory.newRelationship(namespace, 'Claim', claimData.claimId);
          
      //submit transaction
      await businessNetworkConnection.submitTransaction(claim);
      
      //disconnect
      await businessNetworkConnection.disconnect(claimData.cardId);

      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Perform Verify Claim
  */
 rejectClaimTransaction: async function (claimData) {
    try {

      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(claimData.cardId);

      //get the factory for the business network.
      factory = businessNetworkConnection.getBusinessNetwork().getFactory();
      
      //create transaction
      const claim = factory.newTransaction(namespace, 'RejectClaim');
      claim.claim = factory.newRelationship(namespace, 'Claim', claimData.claimId);
      claim.issue = claimData.issue;

      //submit transaction
      await businessNetworkConnection.submitTransaction(claim);
      
      //disconnect
      await businessNetworkConnection.disconnect(claimData.cardId);

      return true;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Get Claims
  */
 getClaims: async function (claimData) {
    try {

      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(claimData.cardId);

      //get member from the network
      const claimRegistry = await businessNetworkConnection.getAssetRegistry(namespace + '.Claim');
      const claims = await claimRegistry.getAll();

      //disconnect
      await businessNetworkConnection.disconnect(claimData.cardId);

      //return member object
      return claims;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error;
    }

  },

  /*
  * Get all verified claims
  * @param {String} cardId Card id to connect to network
  */
 verifiedClaims : async function (cardId) {
    try {
      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      //query all partners from the network
      const allverifiedClaims = await businessNetworkConnection.query('verifiedClaims');

      //disconnect
      await businessNetworkConnection.disconnect(cardId);

      //return allPartners object
      return allverifiedClaims;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }
  },

  /*
  * Get all unverified claims
  * @param {String} cardId Card id to connect to network
  */
  unverifiedClaims : async function (cardId) {
    try {
      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      //query all partners from the network
      const allverifiedClaims = await businessNetworkConnection.query('unverifiedClaims');

      //disconnect
      await businessNetworkConnection.disconnect(cardId);

      //return allPartners object
      return allverifiedClaims;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }
  },

  /*
  * Get all unverified claims with issues
  * @param {String} cardId Card id to connect to network
  */
 issueClaims : async function (cardId) {
    try {
      //connect to network with cardId
      businessNetworkConnection = new BusinessNetworkConnection();
      await businessNetworkConnection.connect(cardId);

      //query all partners from the network
      const allverifiedClaims = await businessNetworkConnection.query('unverifiedIssueClaims');

      //disconnect
      await businessNetworkConnection.disconnect(cardId);

      //return allPartners object
      return allverifiedClaims;
    }
    catch(err) {
      //print and return error
      console.log(err);
      var error = {};
      error.error = err.message;
      return error
    }
  }
}