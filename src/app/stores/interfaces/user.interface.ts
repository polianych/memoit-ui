export interface User {
  id:             number;
  email:          string;
  name:           string;
  nickname:       string;
  uid:            string;
  provider:       string;
  // image:          any;
}

export interface UserToken {
  token:  string;
  client: string;
}
