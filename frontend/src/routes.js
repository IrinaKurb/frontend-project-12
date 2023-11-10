const api = '/api/v1/';

export default {
    loginApiPath: () => [api, 'login'].join('/'),
    signupApiPath: () => [api, 'signup'].join('/'),

    loginPagePath: () => '/login',
    chatPagePath: () => '/',
  };
  