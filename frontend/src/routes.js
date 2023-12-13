const api = '/api/v1';

export default {
  loginApiPath: () => [api, 'login'].join('/'),
  signupApiPath: () => [api, 'signup'].join('/'),
  dataApiPath: () => [api, 'data'].join('/'),

  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  chatPagePath: () => '/',
};
