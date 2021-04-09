import axios from 'axios';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/user');
  dispatch({ type: 'FETCH_USER', payload: res.data });
};
