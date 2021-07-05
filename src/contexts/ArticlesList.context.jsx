import React, {createContext, useState, useEffect, useReducer} from 'react';
import actions from '../utils/actions';
import qs from 'query-string';
import {useLocation, useHistory} from 'react-router-dom';
import reducer from '../utils/ArticlesList.reducer';
import validateInputValue from '../utils/validateInputValue';
export const ArticlesListContext = createContext();

export const ArticlesListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {articlesList: null, isLoading: false, isError: false, message: ''});
  const [notificationText, setNotificationText] = useState('');
  const [totalArticles, setTotalArticles] = useState(null);

  const {search} = useLocation();
  const page = +new URLSearchParams(search).get('page') || 1;
  const query = new URLSearchParams(search).get('query');
  const history = useHistory();

  useEffect(() => {
    // if no query return url for trending/top articles, if query than search url returned
    const getFetchUrl = () => {
      if (query) {
        return `${process.env.REACT_APP_SEARCH_API_URL}?token=${process.env.REACT_APP_API_TOKEN}&max=9&lang=en&page=${page}&q=${query}`;
      } else {
        return `${process.env.REACT_APP_TOP_HEADLINES_API_URL}?token=${process.env.REACT_APP_API_TOKEN}&max=9&lang=en&page=${page}`;
      }
    };

    const fetchData = async () => {
      dispatch({type: actions.LIST_INIT});
      try {
        const response = await fetch(getFetchUrl());
        const result = await response.json();
        console.log({result});
        if (result && !result.errors) {
          setTotalArticles(result.totalArticles || 1);
          dispatch({type: actions.LIST_SUCCESS, payload: result.articles});
        }
        if (result && result.errors) {
          dispatch({
            type: actions.LIST_ERROR,
            payload: {message: result.errors[0]},
          });
        }
      } catch (error) {
        dispatch({
          type: actions.LIST_ERROR,
          payload: {error, message: 'Error in getting data. Please try again later'},
        });
      }
    };
    fetchData();
  }, [query, page]);

  const logUserActions = async ({payload}) => {
    if (payload && payload.action) {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        };

        const res = await fetch(`${process.env.REACT_APP_LOG_USER_ACTIONS_API_URL}/create`, options);

        if (res.ok) {
          console.log({msg: res.ok});
        }
        if (!res.ok) {
          console.log({res});
        }
      } catch (err) {
        console.log({err});
      }
    }
  };

  const closeError = () => {
    dispatch({type: actions.CLOSE_ERROR});
  };

  // sets variables as page and query to url
  const setUrl = ({query, page}) => {
    //validate search query. return {error:true, message: '..'} if wrong
    const validated = validateInputValue({value: query});

    if (validated.error === false) {
      const urlPath = {};
      if (query) {
        urlPath.query = query;
      }
      if (page) {
        urlPath.page = page;
      }
      const searchString = qs.stringify(urlPath);

      history.push({
        search: searchString,
      });
    }
    if (validated.error === true) {
      dispatch({
        type: actions.LIST_ERROR,
        payload: {message: validated.message},
      });
    }
  };

  const contextValues = {
    notificationText,
    setNotificationText,
    closeError,
    page,
    query,
    setUrl,
    totalArticles,
    logUserActions,
    ...state,
  };

  return <ArticlesListContext.Provider value={contextValues}>{children}</ArticlesListContext.Provider>;
};

export default ArticlesListProvider;
