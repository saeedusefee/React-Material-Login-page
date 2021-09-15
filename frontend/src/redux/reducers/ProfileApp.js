import { GET_USER_DETAIL } from '../../@saeed/ActionTypes';

const INIT_STATE = {
  userDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_DETAIL: {
      return { ...state, userDetail: action.payload };
    }
    default:
      return state;
  }
};
