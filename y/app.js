document.addEventListener("DOMContentLoaded", event => {

      const app = firebase.app();
      console.log(app);
      });

    var usrn = "";
    function googleLogin(){
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            //document.write('Hello and welcome! ${user.displayName}' + user.displayName)
            
            console.log(user)
            usrn = user.displayName
            Update()
        })
        .catch(console.log);

        
    }
var plyr_dd = {
    Alignment: "Evil",
    Armor: 0,
    Deaths: 0,
    Food: 1,
    Gold: 0,
    Health: 10,
    Kills: 0,
    Level: 1,
    Tag: "",
    Weapon: ""
};
function Update() {
  document.getElementById("test").innerHTML = "Welcome!!!!" + usrn;
  document.getElementById("sgn_in").style.display = "none";

  const db = firebase.firestore();
  const myacc = db.collection('User').doc(usrn);
  myacc.onSnapshot(doc => {
    const data = doc.data();
    plyr_dd.Alignment = data.Alignment;
  })
}