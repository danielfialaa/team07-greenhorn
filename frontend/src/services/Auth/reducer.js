import { AUTH_LOGIN } from './actions';

const initialState = {
  isAdmin: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN: {
      const { isAdmin, token } = action.payload;

      return {
        ...state,
        isAdmin,
        token,
      };
    }

    default:
      return state;
  }
};

// - selectors - //

export const getIsAdmin = ({ isAdmin }) => isAdmin;
export const getToken = ({ token }) => token;
