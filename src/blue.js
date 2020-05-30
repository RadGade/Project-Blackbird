import Gun from "gun";
import "gun/sea";
import "gun/lib/rindexed.js";
import "gun/lib/webrtc";
import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

var peers = ["https://e2eec.herokuapp.com/gun"];
var db = Gun({ peers: peers, localStorage: false, radisk: false });
var guser = db.user().is;
var net = db.get("devnet");
SEA.work("data", "pair").then(console.log);
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
  var user = new Promise((res, rej) => {
    db.user().create(alias, pass, (ack) => {
      if (ack.err) {
        return rej(ack.err);
      } else {
        window.sessionStorage.setItem("user", ack.pub);
        return res(ack);
      }
    });
  });

  return user;
}

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

function deploy(dis, uuid, alias) {
  let id = uuidv4();
  net.get("likes").get(id).put(0);
  var post = {
    uuid: uuid,
    alias: alias,
    postID: id,
    dis: dis,
    iso: Date(),
    like: id,
  };

  console.log(post);
  var snippet = new Promise((res, rej) => {
    net
      .get("snippets")
      .get(id)
      .put(post, (ack) => {
        if (ack.err) {
          return rej(ack);
        } else {
          console.log(ack);
          db.user()
            .get("snippets")
            .get(id)
            .put({ postID: id }, (u) => console.log(u));
          return res(ack);
        }
      });
  });

  return snippet;
}

function like(postId) {
  var likes = net.get("likes");
  var like = new Promise((res, rej) => {
    var count;
    likes.get(postId).on((u) => (count = u));
    console.log(count++);
    likes.get(postId).put(count++, (u) => {
      if (u.err) {
        return rej(u);
      } else {
        var userPost = {
          postID: postId,
        };
        db.user().get("likes").get(postId).put(userPost, console.log);
        return res(u);
      }
    });
  });

  return like;
}
function unlike(postId) {
  var likes = net.get("likes");
  var like = new Promise((res, rej) => {
    var count;
    likes.get(postId).on((u) => (count = u));
    console.log(count--);
    likes.get(postId).put(count--, (u) => {
      if (u.err) {
        return rej(u);
      } else {
        db.user().get("likes").get(postId).put("unliked");
        return res(u);
      }
    });
  });

  return like;
}
//thanks past rishi
function bookmark(postId) {
  var bookmark = new Promise((res, rej) => {
    var userPost = {
      postID: postId,
    };
    db.user()
      .get("bookmarks")
      .get(postId)
      .put(userPost, (u) => {
        if (u.err) {
          return rej(u);
        } else {
          return res(u);
        }
      });
  });

  return bookmark;
}
function unbookmark(postId) {
  var bookmark = new Promise((res, rej) => {
    db.user()
      .get("bookmarks")
      .get(postId)
      .put("removed", (u) => {
        if (u.err) {
          return rej(u);
        } else {
          return res(u);
        }
      });
  });

  return bookmark;
}
function is() {
  console.log(db.user().is);
}

export {
  auth,
  create,
  like,
  SubscribeToUser,
  deploy,
  unlike,
  listfollow,
  bookmark,
  unbookmark,
  addUserInfo,
  db,
};

//

//t-HRd8iOetli5tlYJP-INF3TlNgUqLRMU22mIZCZfL0.91voxwn9jpyTrSx-D6EleVDmh2qbLq8PJG2mM2OIx7k
