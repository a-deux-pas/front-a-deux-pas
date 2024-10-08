import { environment } from "../../../../environments/environment.dev";

export const API_URL: string =  environment.apiUrl;
export const AUTH_BASE_URL: string = `${API_URL}/auth`;
export const USER_BASE_URL: string = `${API_URL}/users`;
export const ACCOUNT_BASE_URL: string = `${API_URL}/account`;
export const AD_BASE_URL = `${API_URL}/ads`;
export const MEETING_BASE_URL = `${API_URL}/meetings`;
export const PAYMENT_BASE_URL = `${API_URL}/payment`;
