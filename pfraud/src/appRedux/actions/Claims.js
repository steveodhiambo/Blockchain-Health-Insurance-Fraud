import {
  GET_REJECTEDCLAIM_REQUEST,
  GET_REJECTEDCLAIM_REQUEST_SUCCESS,
  GET_UNVERIFIED_REQUEST,
  GET_UNVERIFIED_REQUEST_SUCCESS,
  GET_VERIFIED_REQUEST,
  GET_VERIFIED_REQUEST_SUCCESS, UPDATE_AUTH,
} from '../../constants/ActionTypes';

//Initiated by the user
export const getVerifiedRequest = () => ({
  type: GET_VERIFIED_REQUEST
});


export const getUnverifiedRequest = ()=>({
  type: GET_UNVERIFIED_REQUEST
});

export const getRejectedClaimRequest = ()=>({
  type: GET_REJECTEDCLAIM_REQUEST
});

export const updateAuth = auth1 =>({
  type: UPDATE_AUTH,
  auth1
})



//sent by Redux saga
export const getverifiedSuccess = vclaims => ({
  type: GET_VERIFIED_REQUEST_SUCCESS,
  vclaims,
});

export const getunverifiedSuccess = uvclaims => ({
  type: GET_UNVERIFIED_REQUEST_SUCCESS,
  uvclaims,
});

export const getrejectedClaimSuccess = rclaims => ({
  type: GET_REJECTEDCLAIM_REQUEST_SUCCESS,
  rclaims,
});
