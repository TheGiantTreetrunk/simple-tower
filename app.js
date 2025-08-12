



// Array for invalid message
let textArray = [
  "Not a valid key!",
  "Sorry try again!",
  "Try W or A or S or D!",
  "Press a valid key!"
];

// Function to remove activeKey class to all keys
// Accepts 1 parameter
function removeActiveClass(e) {
  // Removes activeKey for everything
  e.target.classList.remove("activeKey");
}

// Function that selects a random from 0 to array.length
function randomNumber() {
  // Uses JS Math function
  number = Math.floor(Math.random() * textArray.length);
  // Returns number
  return number;
}

// Function that calls randomNumber to select a random text
function randomText() {
  // Assigns randomNumber to index
  index = randomNumber();
  // Returns random string for array
  return textArray[index];
}

// Function to change the text in message
function changeText(e) {
  if (e === 87) {
    document.getElementById("message").innerHTML = "The W key Moves Up";
  } else if (e === 65) {
    document.getElementById("message").innerHTML = "The A key Moves Left";
  } else if (e === 83) {
    document.getElementById("message").innerHTML = "The S key Moves Down";
  } else if (e === 68) {
    document.getElementById("message").innerHTML = "The D key Moves Right";
  }else if (e === 75) {
    document.getElementById("message").innerHTML = "The K key Smashes Objects!";
  }else if (e === 79) {
    document.getElementById("message").innerHTML = "The O key Opens Objects!";
  } else {
    // Calls random text
    document.getElementById("message").innerHTML = randomText();
  }
}

// Function when user presses on a key
function keyPressed(e) {
  // Assigns key "div" to key
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  // Calls changeText to change the text
  changeText(e.keyCode);
  // Only applies activeKey to the keys displayed in browser
  if (
    e.keyCode === 87 ||
    e.keyCode === 65 ||
    e.keyCode === 83 ||
    e.keyCode === 75 ||
    e.keyCode === 79 ||
    e.keyCode === 68
  ) {
    // Adds class activeKey
    key.classList.add("activeKey");
  }
}

// Creates a const array of all the keys on screen
const keys = Array.from(document.querySelectorAll(".key"));
// Listens to the browser and removes activeKey when needed
keys.forEach(key => key.addEventListener("transitionend", removeActiveClass));
// Listens to users and when key is pressed calls keyPressed
window.addEventListener("keydown", keyPressed);