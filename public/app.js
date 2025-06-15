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


    function googleSignUp(){
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            console.log(user)
            usrn = user.displayName
            writeUserData()
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
  document.getElementById("test").innerHTML = "Welcome " + usrn +"!";
  document.getElementById("acc_popup").style.display = "none";
  document.getElementById("login_popup").style.display = "block";

  const db = firebase.firestore();
  const myacc = db.collection('User').doc(usrn);
  myacc.onSnapshot(doc => {
    const data = doc.data();
    plyr_dd.Alignment = data.Alignment;
    plyr_dd.Armor = data.Armor;
    plyr_dd.Deaths = data.Deaths;
    plyr_dd.Food = data.Food;
    plyr_dd.Gold = data.Gold;
    plyr_dd.Health = data.Health;
    plyr_dd.Kills = data.Kills;
    plyr_dd.Level = data.Level;
    plyr_dd.Tag = data.Tag;
    plyr_dd.Weapon = data.Weapon;
  })
}

function writeUserData() {
  const db = firebase.firestore();
  db.collection('User').doc(usrn).set({
    Alignment: "Good",
    Armor: 0,
    Deaths: 0,
    Food: 1,
    Gold: 0,
    Health: 10,
    Kills: 0,
    Level: 1,
    Tag: "",
    Weapon: ""
  })
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});


  document.getElementById("test").innerHTML = "Welcome!!!!" + usrn;
  document.getElementById("acc_popup").style.display = "none";
  document.getElementById("login_popup").style.display = "block";
}
