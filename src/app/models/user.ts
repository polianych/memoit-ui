export class User {
  id:             number;
  email:          string;
  name:           string;
  nickname:       string;
  uid:            string;
  provider:       string;
  // image:          any;
}

export class UserToken {
  token:  string;
  client: string;
}
