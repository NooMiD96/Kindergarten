//#region Route
export const routesObject = {
  "/": 0,
  "/visitation": 1,
  "/medicament": 2,
  "/chat": 3,
};

export const routesArray = Object.keys(routesObject);
//#endregion

export const allowToAllUserLocation = {
  "/": true,
  "/post": true,
  "/edit": false,
  "/visitation": false,
  "/medicament": false,
  "/chat": true,
};

export enum UserTypeEnums {
  Guest,
  User,
  Employee,
  Admin,
}

//#region SVG Icons
export type TIcons =
  "loading"
  | "caret-dow"
  /* Main: Button */
  | "login"
  | "idcard"
  | "logout"
  /* END Main: Button */
  /* Main: Account: Input */
  | "user"
  | "lock"
  | "mail"
  /* END Main: Account: Input */
  /* Alert */
  | "close-circle"
  | "close"
  /* END Alert */
  /* Home */
  | "message"
  | "left"
  | "right"
  /* END Home */

  /* Home.Edit */
  | "tag"
  | "paper-clip"
  | "down"
  /* END Home.Edit */

  /* Home.View */
  | "message"
  /* END Home.View */

  /* Medicament */
  | "filter"
  /* END Medicament */
  ;

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import(/* webpackChunkName: "main-client.global.icons" */ "@antdSvgs/LoadingOutline")).default;
    case "caret-dow":
      return (await import(/* webpackChunkName: "main-client.global.icons" */ "@antdSvgs/CaretDownOutline")).default;

    /* Main: Button */
    case "login":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/LoginOutline")).default;
    case "idcard":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/IdcardOutline")).default;
    case "logout":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/LogoutOutline")).default;
    /* END Main: Button */

    /* Main: Account: Input */
    case "user":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/UserOutline")).default;
    case "lock":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/LockOutline")).default;
    case "mail":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/MailOutline")).default;
    /* END Main: Account: Input */

    /* Alert */
    case "close-circle":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseCircleOutline")).default;
    case "close":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseOutline")).default;
    /* END Alert */

    /* Home */
    case "message":
      return (await import(/* webpackChunkName: "Home.icons" */ "@antdSvgs/MessageOutline")).default;
    case "left":
      return (await import(/* webpackChunkName: "Home.icons" */ "@antdSvgs/LeftOutline")).default;
    case "right":
      return (await import(/* webpackChunkName: "Home.icons" */ "@antdSvgs/RightOutline")).default;
    /* END Home */

    /* Home.Edit */
    case "tag":
      return (await import(/* webpackChunkName: "Home.Edit.icons" */ "@antdSvgs/TagOutline")).default;
    case "paper-clip":
      return (await import(/* webpackChunkName: "Home.Edit.icons" */ "@antdSvgs/PaperClipOutline")).default;
    case "down":
      return (await import(/* webpackChunkName: "Home.Edit.icons" */ "@antdSvgs/DownOutline")).default;
    /* END Home.Edit */

    /* Home.View */
    case "message":
      return (await import(/* webpackChunkName: "Home.View.icons" */ "@antdSvgs/MessageOutline")).default;
    /* END Home.View */

    /* Medicament */
    case "filter":
      return (await import(/* webpackChunkName: "Medicament.icons" */ "@antdSvgs/FilterOutline")).default;
    /* END Medicament */

    default:
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
  }
};
//#endregion
