import {
  GET_REJECTEDCLAIM_REQUEST_SUCCESS,
  GET_UNVERIFIED_REQUEST_SUCCESS,
  GET_VERIFIED_REQUEST_SUCCESS
} from '../../constants/ActionTypes';

const initState = {
  auth:{
    cardId: JSON.parse(localStorage.getItem('user'))
  },
  verifiedClaims:[],
  unverifiedClaims: [],
  rejectedClaims:[]
}

//Claims reducer
export default (state = initState, action) =>{
  switch (action.type) {
    case GET_VERIFIED_REQUEST_SUCCESS: {
      return{
        ...state,
        verifiedClaims: [...action.vclaims ]
      }
    }
    case GET_UNVERIFIED_REQUEST_SUCCESS: {
      return{
        ...state,
        unverifiedClaims: [...action.uvclaims ]
      }
    }
    case GET_REJECTEDCLAIM_REQUEST_SUCCESS: {
      return{
        ...state,
        rejectedClaims: [...action.rclaims ]
      }
    }
    default: {
      return state
    }

  }
};
