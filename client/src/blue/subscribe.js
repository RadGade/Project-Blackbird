import db  from "./db";
import { v4 as uuidv4 } from "uuid";
console.log(db)
function SubscribeToUser(userAlias, userPubKey) {
  let attached = {};
  let myfollowFn = function (data) {
    console.log("here");
    if (data) console.log(data);
    db.user()
      .get("follow_feed")
      .put(data, (ack) => console.log(ack));
  };
  db.user()
    .get("subs")
    .on((pk, alias, g, events) => {
      if (!attached[alias]) {
        console.log("subsbribing to ", alias);
        attached[alias] = db
          .get("~" + pk)
          .get("snippets", (ack) => console.log(ack))
          .on((data) => console.log(data));
      }
    });
  db.user()
    .get("subs")
    .put({ [userAlias]: userPubKey });
  //now when pk puts something in 'pubs' you should have the notification
}

function listfollow() {
  //get all the data and run a recomendation algo to sort the posts
  var followers = new Promise((res, rej) => {
    db.user().get("subs", (ack) => {
      if (ack.err) {
        return rej(ack);
      } else {
        return res(ack);
      }
    });
  });
  return followers;
}

export { SubscribeToUser, listfollow };
