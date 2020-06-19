import db  from "./db";
import { v4 as uuidv4 } from "uuid";
function addUserInfo(bio, pub) {
  var info = {
    bio: bio,
  };
  console.log(info);
  var BioAck = new Promise((res, rej) => {
    db.user()
      .get("Bio")
      .put(info, (ack) => {
        if (ack.err) {
          console.log(ack);
          return rej(ack);
        } else {
          console.log(ack);
          return res(ack);
        }
      });
  });

  return BioAck;
}

function uploadProfilePic(dataURI) {
  var pp = new Promise((res, rej) => {
    db.user()
      .get("Bio")
      .get("ProfilePic")
      .put(dataURI, (ack) => {
        if (ack.err) {
          console.log(ack);
          return rej(ack);
        } else {
          console.log(ack);
          return res(ack);
        }
      });
  });

  return pp;
}

function uploadBackgroundPic(dataURI) {
  var bp = new Promise((res, rej) => {
    db.user()
      .get("Bio")
      .get("BackgroundPic")
      .put(dataURI, (ack) => {
        if (ack.err) {
          console.log(ack);
          return rej(ack);
        } else {
          console.log(ack);
          return res(ack);
        }
      });
  });

  return bp;
}

export { addUserInfo, uploadProfilePic, uploadBackgroundPic };
