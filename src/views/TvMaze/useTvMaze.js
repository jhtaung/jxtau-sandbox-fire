import { useTvMazeDispatch, useTvMazeState } from './context';
import axios from 'axios';

const askAPI = async param => {
  let cancel;
  let CancelToken = axios.CancelToken;

  // cancel any previous request
  if (cancel !== undefined) {
    cancel();
    cancel.log('cancelled');
  }

  // standard request
  const request = {
    async: true,
    cancelToken: new CancelToken(c => { cancel = c; }),
    crossDomain: true,
    method: 'GET',
    ...param
  };

  console.log('-- request --');
  console.log(request);
  console.log('----');

  let result = { success: false, response: {} };
  try {
    const response = await axios(request);
    result = { success: true, response: response };
  } catch (error) {
    console.error(error);
    result = { success: false, response: error.response };
  }

  // DEBUG
  console.log('-- result --');
  console.log(result);
  console.log('----');

  return result;
};

const useTvMaze = () => {
  const dispatch = useTvMazeDispatch();
  const state = useTvMazeState();

  const doQuery = async showName => {
    dispatch({ type: 'FETCH_INIT' });

    const API_URL = 'https://api.tvmaze.com';
    const url = API_URL + '/singlesearch/shows?q=' + showName + '&embed=episodes';
    const result = await askAPI({ url });
    if (!result.success) {
      dispatch({ type: 'FETCH_FAILURE' });
      return false;
    }

    dispatch({
      type: 'FETCH_SUCCESS',
      payload: result.response.data._embedded.episodes
    });
    return true;
  };

  const handleSearch = e => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('search: ' + state.search);

    doQuery(state.search);
  };

  return { dispatch, doQuery, handleSearch, handleSubmit };
};

export default useTvMaze;
