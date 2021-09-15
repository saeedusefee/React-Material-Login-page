//for getting  mail detail
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { GET_USER_DETAIL } from '../../@saeed/ActionTypes';

export const getUserDetail = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/profile')
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_DETAIL, payload: data.data });
        } else {
          dispatch(fetchError('خطا رخ داده است'));
        }
      })
      .catch(error => {
        dispatch(fetchError('خطا رخ داده است'));
      });
  };
};
