import { DataUserModel } from "../../model/auth.models";

export class UtilsServices {
  handleTimeStamp(): void {
    const getAuthName = localStorage.getItem("auth");
    const getUserData: any = localStorage.getItem("user_data");

    let changeData: DataUserModel = JSON.parse(getUserData);

    const findUser: any = changeData.find((x) => {
      return x.username === getAuthName;
    });

    if (!findUser) {
      this.onLogout();
      return;
    }

    let date = new Date();
    let oldDate = new Date(findUser.date);

    if (date > oldDate) {
      // ! EXPIRED

      this.onLogout();
    } else {
      // ! NO EXPIRED

      date.setMinutes(date.getMinutes() + 10);

      let AddTimeStamp = {
        ...findUser,
        date,
      };

      const finalchangeData = changeData.map((x: any) => {
        if (x.username === AddTimeStamp.username) {
          x = AddTimeStamp;
        }
        return x;
      });

      localStorage.setItem("user_data", JSON.stringify(finalchangeData));
    }
  }

  onLogout(): void {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  }
}
