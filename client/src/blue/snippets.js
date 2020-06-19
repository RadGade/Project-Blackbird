import db  from "./db";
import { v4 as uuidv4 } from "uuid";
var net = db.get("devnet")
function deploy(dis, uuid, alias) {
  let id = uuidv4();
  net.get("likes").get(id).put(0);
  var post = {
    uuid: uuid,
    alias: alias,
    postID: id,
    iso: Date(),
    like: id,
    dis: dis,
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

export { deploy, like, unlike, unbookmark, bookmark };
