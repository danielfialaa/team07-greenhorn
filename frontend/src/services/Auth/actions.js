export const AUTH_LOGIN = 'AUTH.LOGIN';

export const authLogin = ({ isAdmin, token }) => ({
  type: AUTH_LOGIN,
  payload: {
    isAdmin,
    token,
  },
});

// export const loginUser ...
// export const loginUserSuccess ...
// export const loginUserFailure ...

export const startLogin = ({ username, password }) => (
  dispatch,
  getState,
  { api },
) => {
  dispatch(loginUser());

  api
    .post('login', { data: { username, password } })
    .then(({ data }) => {
      const { isAdmin, token } = data;
      dispatch(loginUserSuccess({ isAdmin, token }));
    })
    .catch(() => {
      dispatch(loginUserFailure('Invalid password or username.'));
    });
};
