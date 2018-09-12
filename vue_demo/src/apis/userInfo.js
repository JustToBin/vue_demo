import { $req } from "../utils";

export default {
  getUserInfo() {
    return new Promise((resolve, reject) => {
      $req.post("/info/user", {}).then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  },
  getCompanyList() {
    return new Promise((resolve, reject) => {
      $req.post("/personnel/financial/company/list", {}).then((res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }
};
