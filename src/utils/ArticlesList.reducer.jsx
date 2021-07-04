import actions from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LIST_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };

    case actions.LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articlesList: [...action.payload],
      };
    case actions.LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload.message,
      };
    case actions.CLOSE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: '',
      };

    default:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'Something went wrong',
      };
  }
};

export default reducer;
