import {
  FACEBOOK,
  GOOGLE,
  VK,
  FOURSQUARE,
  INSTAGRAM,
  LINKEDIN,
  TWITCH,
  LIVE,
  YAHOO,
  BITBUCKET,
  SPOTIFY
} from './oauth2-providers';
import { extend } from '../../utils/extend';


let defaultConfig: Object = {};

defaultConfig['default'] = {
  redirectUri: window.location.origin + '/auth/oauth2/callback',
};

defaultConfig[FACEBOOK.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
  scope: ['email'],
  scopeDelimiter: ',',
  responseType: 'code',
  popupOptions: {width: 452, height: 633},
  queryParams: {
    display: 'popup'
  }
});

defaultConfig[GOOGLE.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  scope: ['email', 'profile'],
  responseType: 'code',
  popupOptions: {width: 452, height: 633}
});

defaultConfig[VK.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://oauth.vk.com/authorize',
  scope: ['email'],
  responseType: 'code',
  popupOptions: {width: 452, height: 633},
  queryParams: {
    display: 'popup'
  }
});

defaultConfig[FOURSQUARE.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
  responseType: 'code',
  popupOptions: {width: 452, height: 633}
});

defaultConfig[INSTAGRAM.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
  responseType: 'code',
  popupOptions: {width: 452, height: 633}
});

defaultConfig[LINKEDIN.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
  responseType: 'code',
  scope: ['r_basicprofile', 'r_emailaddress'],
  popupOptions: {width: 452, height: 633}
});

defaultConfig[TWITCH.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
  responseType: 'code',
  scope: ['user_read'],
  popupOptions: {width: 452, height: 633}
});

defaultConfig[LIVE.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
  responseType: 'code',
  scope: ['user_read'],
  popupOptions: {width: 452, height: 633}
});

defaultConfig[YAHOO.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
  responseType: 'code',
  scope: [],
  scopeDelimiter: ',',
  popupOptions: {width: 452, height: 633}
});

defaultConfig[BITBUCKET.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
  responseType: 'code',
  scope: ['email'],
  popupOptions: {width: 452, height: 633}
});

defaultConfig[SPOTIFY.toString()] = extend(defaultConfig['default'], {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  responseType: 'code',
  scope: ['email'],
  popupOptions: {width: 452, height: 633}
});

export default defaultConfig;
