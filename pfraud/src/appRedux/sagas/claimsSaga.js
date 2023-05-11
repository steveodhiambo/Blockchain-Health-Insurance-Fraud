import {
  GET_REJECTEDCLAIM_REQUEST,
  GET_UNVERIFIED_REQUEST,
  GET_VERIFIED_REQUEST
} from '../../constants/ActionTypes';
import {all, fork, takeEvery,select, call, put} from "redux-saga/effects";
import {getRejectedClaims, getUnverifiedClaims, getVerifiedClaims} from "../api/api";
import {getrejectedClaimSuccess, getunverifiedSuccess, getverifiedSuccess} from "../actions";

const getAuth = state => state.claims.auth;



//START HANDLING VERIFIED CLAIMS
const fetchVClaims= async auth => {
  const response = await getVerifiedClaims(auth);
  const vClaims = response.data.verifiedclaims;
  return vClaims;
}

function* callVerifiedClaimsEp(){
  try {
    const auth = yield select(getAuth);
    const vclaims = yield call(fetchVClaims, auth);
    yield console.log(vclaims);
    yield put(getverifiedSuccess(vclaims));
  } catch (e) {
    console.log("Error")
  }
}

function* watchVerifiedRequest() {
  yield takeEvery(GET_VERIFIED_REQUEST, callVerifiedClaimsEp)
}
//END VERIFIED CLAIMS HANDLING






//START HANDLING UNVERIFED CLAIMS
const fetchUClaims= async auth => {
  const response = await getUnverifiedClaims(auth);
  const uvClaims = response.data.unverifiedclaims;
  return uvClaims;
}

function* callUnverifiedClaimsEp(){
  try {
    const auth = yield select(getAuth);
    const uvclaims = yield call(fetchUClaims, auth);
    yield console.log(uvclaims);
    yield put(getunverifiedSuccess(uvclaims));
  } catch (e) {
    console.log("Error")
  }
}


function* watchUnverifiedRequest() {
  yield takeEvery(GET_UNVERIFIED_REQUEST, callUnverifiedClaimsEp)
}
//END UNVERIFIED CLAIM HANDLING


// START HANDLING REJECTED CLAIMS
const fetchRClaims= async auth => {
  const response = await getRejectedClaims(auth);
  const rClaims = response.data.rejectedclaims;
  return rClaims;
}

function* callRejectedClaimsEp(){
  try {
    const auth = yield select(getAuth);
    const rclaims = yield call(fetchRClaims, auth);
    yield console.log(rclaims);
    yield put(getrejectedClaimSuccess(rclaims));
  } catch (e) {
    console.log("Error")
  }
}

function* watchRejectedRequest() {
  yield takeEvery(GET_REJECTEDCLAIM_REQUEST, callRejectedClaimsEp)
}
// END REJECTED CLAIMS HANDLING

//HANDLE VERIFY ACTION
//END VERFIFY ACTION HANDLING


export default function* rootSaga() {
  yield all([
    fork(watchUnverifiedRequest),
    fork(watchVerifiedRequest),
    fork(watchRejectedRequest),
  ])
}
