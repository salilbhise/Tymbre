const admin = require('firebase-admin');


var serviceAccount = require('../../tymbredb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);
db.collection("test").doc("xyztest").set({
    name: "sal"
});