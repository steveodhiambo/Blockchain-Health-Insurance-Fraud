/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * A person creates a claim
 * @param {org.insurancefraud.CreateClaim} claimRequest
 * @transaction
 */
async function createClaim(claimRequest) {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const namespace = 'org.insurancefraud';

    const claim = factory.newResource(namespace, 'Claim', claimRequest.claimId);
    claim.date = claimRequest.date;
    claim.totalamount = claimRequest.totalamount;
    claim.issue = 'N/A';
    claim.description = claimRequest.description;
    claim.verifier = claimRequest.verifier;
    claim.claimer = claimRequest.claimer;
    claim.verified = false;


    // save the claim
    const assetRegistry = await getAssetRegistry(claim.getFullyQualifiedType());
    await assetRegistry.add(claim);
}


/**
 * A verifier verifies a claim
 * @param {org.insurancefraud.VerifyClaim} verifyRequest
 * @transaction
 */
async function verifyClaim(verifyRequest) {

    const namespace = 'org.insurancefraud';
    // get the claim
    const claim = verifyRequest.claim;
   
    if(claim.issue.includes('N/A')){
      
        claim.verified = true;
    }else{
      claim.issue = 'N/A';
      claim.verified = true;
    }
 
    //make sure that it is infact the assigned verifier doing this.
    // if( claim.verifier.verifierId != getCurrentParticipant().getIdentifier())
    //  return;
     
   // update the claim 
    const claimsRegistry = await getAssetRegistry(namespace +".Claim");
    await claimsRegistry.update(claim);
 
}


/**
 * A verifier verifies a claim
 * @param {org.insurancefraud.RejectClaim} rejectClaim
 * @transaction
 */
async function rejectClaim(rejectClaim) {

    const namespace = 'org.insurancefraud';
    // get the claim
    const claim = rejectClaim.claim;
 
    //make sure that it is infact the assigned verifier doing this.
    // if( claim.verifier.verifierId != getCurrentParticipant().getIdentifier())
    //  return;
 
     // update the claim
    claim.issue = rejectClaim.issue;
    claim.verified = false;
 
    const claimsRegistry = await getAssetRegistry(namespace +".Claim");
    await claimsRegistry.update(claim);
}