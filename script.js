const clue1Answer = "what";
const clue2Answer = "holes";
const clue3Answer = "blue";
const startButton = document.querySelector("#start-button")
const easterEgg = document.querySelector("#easter-egg")
let stateIndex = 0;

const keyImageButton = document.querySelector("#key button")
const restartButton = document.querySelector("#restart button")

// Functions to manage state-attribute in the DOM
function isInState(name) {
  return document.body.dataset.state === name;
}
function setState(name) {
  document.body.dataset.state = name;
}

// Functions to manage keyboard history
let keypressHistory = [];
function pushKeyPress(key) {
  keypressHistory.push(key)
  if (keypressHistory.length > 10) {
    keypressHistory.shift();
  }
}
function matchesSequence(word) {
  let matched = keypressHistory.slice(0 - word.length).join("")
  return matched === word
}

startButton.addEventListener("click", () => {
  if (isInState("locked")) {
    setState("clue-1")
    stateIndex+=1;
  }
})

window.addEventListener("keypress", (event) => {
  pushKeyPress(event.key);

  if (isInState("clue-1") && matchesSequence(clue1Answer)) {
    setState("key")
    stateIndex+=1;
    console.log(stateIndex)
  }
  if (isInState("clue-2") && matchesSequence(clue2Answer)) {
    setState("clue-3")
    stateIndex+=1;
    console.log(stateIndex)
  }
  if (isInState("clue-3") && matchesSequence(clue3Answer)) {
    setState("unlocked")
    stateIndex+=1;
    console.log(stateIndex)
  }
})

keyImageButton.addEventListener("click", () => {
  if (isInState("key")) {
    setState("clue-2")
    stateIndex+=1;
  }
})

restartButton.addEventListener("click", () => {
  setState("locked")
  easterEgg.style.display = "block"
})

easterEgg.addEventListener("click", () => {
  console.log("Easter");
  setState("easter-egg");
  easterEgg.style.display = "none"
})

// timeOut
const timeOut = setTimeout(gg,30000)

function gg(){
  if (stateIndex>=5){
    clearTimeout(timeOut);
  }else{
     setState("locked") 
  }
}
