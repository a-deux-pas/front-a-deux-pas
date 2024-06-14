import { secretsEnvironment } from "./environment.secrets";

export const environment = {
  mapbox: {
    accessToken: secretsEnvironment.mapbox.accessToken,
  },
  userCredentials: {
    email: secretsEnvironment.userCredentials.email,
    password: secretsEnvironment.userCredentials.password,
  }
}
