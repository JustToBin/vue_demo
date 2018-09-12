import { $locals } from "@/utils";
import { authApi } from "@/apis";

export default {
  isLogin() {
    const token = $locals.get("AUTH_TOKEN");
    return !!token;
  },
  getToken() {
    const token = $locals.get("AUTH_TOKEN");
    return token;
  },
  getAuthToken() {
    const token = this.getToken();
    return token ? "Bearer " + token : null;
  },
  clearAuthCache() {
    $locals.clearLocalStorage();
  },
  logout() {
    authApi.logout();
    $locals.clearLocalStorage();
    window.location.reload();
  }
};
