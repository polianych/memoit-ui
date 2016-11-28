
export interface Oauth2ServiceOptions {
  clientId?: string;
  redirectUri?: string;
  authorizationEndpoint?: string;
  scope?: string[];
  responseType?: string;
  queryParams?: Object;
  scopeDelimiter?: string;
  popupOptions?: {
    width?: number,
    height?: number
  }
}
