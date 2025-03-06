export type GoogleSession = {
  state: string;
};

export type GoogleProfile = {
  readonly id: string;
  readonly email: string;
  readonly verified_email: boolean;
  readonly name: string;
  readonly given_name: string;
  readonly picture: string;
  readonly refresh_token: string;
};
