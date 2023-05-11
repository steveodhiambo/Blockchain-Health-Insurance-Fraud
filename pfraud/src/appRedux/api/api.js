import Request from 'axios/index';
const baseURL = 'http://localhost:5000';
const makeRequest = (type, api, data) => {
  return Request[type](baseURL+api, data);
};

export const getUnverifiedClaims = (data) => {
  return makeRequest('post', '/unverifiedclaims',data);
};

export const getVerifiedClaims = (data) => {
  return makeRequest('post', '/verifiedclaims',data);
};

export const getRejectedClaims = (data) => {
  return makeRequest('post', '/issueclaims',data);
};

export const verifyClaim = (data) =>{
  return makeRequest('post', '/verifyclaim',data);
};

export const rejectClaim = (data) =>{
  return makeRequest('patch', '/rejectclaim',data);
};

export const addClaim = (data) =>{
  return makeRequest('post', '/claim',data);
};

export const updateClaim = (data) =>{
  return makeRequest('patch', '/',data);
};
