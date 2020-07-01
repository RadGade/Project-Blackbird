import db  from "./db";
import {uploadProfilePic} from './bio'
import { v4 as uuidv4 } from "uuid";
var AnimalAvatar = require("animal-avatars.js");
console.log(db)
function auth(alias, pass) {
  var user = new Promise((res, rej) => {
    db.user().auth(alias, pass, (ack) => {
      if (ack.err) {
        return rej(ack.err);
      } else {
        db.user().recall({ sessionStorage: true }, (user) => {
          console.log("recall", user.put.alias);
          window.sessionStorage.setItem("user", user.put.pub);
          window.sessionStorage.setItem("epub", user.sea.epub);
        });
        window.sessionStorage.setItem("isAuth", true);

        return res(ack);
      }
    });
  });

  return user;
}

function create(alias, pass) {
  let myAvatar = new AnimalAvatar();
  var user = new Promise((res, rej) => {
    db.user().create(alias, pass, (ack) => {
      if (ack.err) {
        return rej(ack.err);
      } else {
        uploadProfilePic(myAvatar.getAvatarUrl())
        window.sessionStorage.setItem("user", ack.pub);
        return res(ack);
      }
    });
  });

  return user;
}

export { auth, create };
