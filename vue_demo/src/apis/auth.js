import { $req, $locals } from "../utils";

export default {
  getAuthInfo() {
    return new Promise((resolve, reject) => {
      $req.get("/security/getLoginedData?t=" + new Date().getTime(), {
      }).then((res1) => {
        resolve(res1.data);
      }).catch((e) => {
        reject(e);
      });
    });
  },
  cacheToken(data) {
    $locals.set("AUTH_TOKEN", data.data);
  },
  logout() {
    return new Promise((resolve, reject) => {
      $req.get("/security/logout?t=" + new Date().getTime(), {
      }).then((res) => {
        resolve(res.data);
      }).catch((e) => {
        reject(e);
      });
    });
  },
  login(username, password, captcha) {
    return new Promise((resolve, reject) => {
      $req.post("/security/login?t=" + new Date().getTime(), {
        username: username,
        password: password,
        captcha: captcha
      }).then((res) => {
        if (res.data.ok) {
          this.cacheToken(res.data);
          this.getAuthInfo().then((data) => {
            resolve(data);
          }).catch((e) => {
            reject(e);
          });
        } else {
          reject(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  },
  changePwd(oldPwd, newPwd) {
    return new Promise((resolve, reject) => {
      $req.post("/sm/user/updatePassword", {
        password: newPwd,
        oldPassword: oldPwd
      }).then((res) => {
        resolve(res.data);
      }).catch((e) => {
        reject(e);
      });
    });
  }
};
