import { secretsEnvironment } from "./environment.secrets";

export const environment = {
  mapbox: {
    accessToken: secretsEnvironment.mapbox.accessToken,
  }
}
