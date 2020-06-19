import Gun from "gun";
import "gun/sea";
import "gun/lib/rindexed.js";
import "gun/nts";
import "gun/lib/webrtc";

var peerList = [
    "http://localhost:8765/gun",
    "https://gunjs.herokuapp.com/gun",
    "https://www.raygun.live/gun",
    "https://e2eec.herokuapp.com/gun",
    "http://gun-matrix.herokuapp.com/gun",
    "https://dletta.rig.airfaas.com/gun",
  ];
  const db = Gun({
    peers: peerList,
  });

export default db;