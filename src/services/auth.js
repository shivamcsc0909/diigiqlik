import { api } from "./api";

export async function googleLogin(idToken) {
  return api.googleLogin({ idToken });
}

export async function adminLogin(username, password) {
  return api.adminLogin({ username, password });
}