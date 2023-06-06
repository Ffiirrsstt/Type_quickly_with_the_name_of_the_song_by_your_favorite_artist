const wordElement = document.getElementById("word");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");

const artistElement = document.getElementById("artist");
const artiststartElement = document.getElementById("artiststart");
// const formElement = document.getElementById("form");

const inputprintElement = document.getElementById("inputprint");
const resetElement = document.getElementById("reset");

const ClearElement = document.getElementById("Clear");

const ModeElement = document.getElementById("Mode");
const levelElement = document.getElementById("level");

const ModedropdownElement = document.getElementById("Modedropdown");
const leveldropdownElement = document.getElementById("leveldropdown");

const modecurrentElement = document.getElementById("modecurrent");
const levelcurrentElement = document.getElementById("levelcurrent");
const ArtistcurrentElement = document.getElementById("Artistcurrent");

const CMElement = document.getElementById("CM");
const SMElement = document.getElementById("SM");
const UMElement = document.getElementById("UM");

const CMstartElement = document.getElementById("CMstart");
const SMstartElement = document.getElementById("SMstart");
const UMstartElement = document.getElementById("UMstart");

const hardElement = document.getElementById("hard");
const interElement = document.getElementById("inter");
const easyElement = document.getElementById("easy");

const hardstartElement = document.getElementById("hardstart");
const interstartElement = document.getElementById("interstart");
const easystartElement = document.getElementById("easystart");

const notsaveElement = document.getElementById("notsave");
// const savedataElement = document.getElementById("savedata");
const backElement = document.getElementById("back");

const settingStartElement = document.getElementById("settingStart");
const savedatastartElement = document.getElementById("savedatastart");

const inputfornoneElement = document.getElementById("inputfornone");
const historyfornoneElement = document.getElementById("historyfornone");
const gamefornoneElement = document.getElementById("gamefornone");
const detailscoreElement = document.getElementById("detailscore");

const historywordElement = document.getElementById("historyword");
const startinthreeElement = document.getElementById("startinthree");

let datamusicwords;
let history = [];
let resultword;
let timeCal;
let three = 3;
let timethree;
let selectmode = localStorage.getItem("mode");
let selectlevel = localStorage.getItem("level");
let preSelectmode;
let preSelectlevel;
let premusic = localStorage.getItem("music");

function difftime() {
  time--;
  timeElement.innerText = `${time} Second`;
  if (time == 0) {
    clearInterval(timeCal);
    timeElement.innerText = `End the game.`;
  }
}
function randomWord() {
  let len = datamusicwords.length + 1;
  resultword = datamusicwords[Math.floor(Math.random() * len)];
  if (resultword) {
    wordElement.innerText = `${resultword}`;
    history.push(resultword);
  } else {
    randomWord();
  }
}

function cheakWord(event) {
  if (event.target.value == resultword) {
    event.target.value = "";
    scoreElement.innerHTML = `score : ${++score}`;
    if (selectmode == "Survival") {
      if (selectlevel == "Hard") {
        time = 3;
      } else if (selectlevel == "Intermediate") {
        time = 5;
      } else {
        time = 7;
      }
    }
    if (selectmode == "Ultimate") {
      if (selectlevel == "Hard") {
        time += 4;
      } else if (selectlevel == "Intermediate") {
        time += 8;
      } else {
        time += 12;
      }
    }
    randomWord();
  }
}

function timethreeforwait() {
  startinthreeElement.innerText = `The game will start in ${--three} seconds.`;
  if (three == -1) {
    clearInterval(timethree);
    startinthree.classList.add("none");
    three = 3;
    historywordElement.classList.remove("none");
    setGameStart();
  }
}

async function waitready() {
  historywordElement.classList.add("none");
  wordElement.innerHTML =
    '<img class="image" src="img/loading-bar.png" alt="">';
  await loaddatamusic();
  score = 0;
  scoreElement.innerHTML = `score : 0`;
  reultModeandLevel();
  timeElement.innerText = `${time} Second`;
  startinthree.classList.remove("none");
  startinthreeElement.innerText = `The game will start in ${three} seconds.`;
  timethree = setInterval(timethreeforwait, "1000");
}

function setGameStart() {
  randomWord();
  timeCal = setInterval(difftime, 1000);
}

async function loaddatamusic() {
  if (artistElement.value) {
    premusic = artistElement.value;
  } else {
    artistElement.value = premusic;
  }
  localStorage.setItem("music", premusic);
  history = [];
  let data = await fetch(
    `https://api.lyrics.ovh/suggest/${artistElement.value}`
  );
  data = await data.json();

  datamusic(data.data);
}

function datamusic(data) {
  datamusicwords = [];
  data.map((element) => {
    let title = element.title;
    datamusicwords.push(title);
  });
}

function nonefordropdown() {
  notsaveElement.classList.add("none");
  savedataElement.classList.add("none");
  backElement.classList.remove("none");
  ModedropdownElement.classList.add("none");
  leveldropdownElement.classList.add("none");
}
function settingback() {
  backElement.classList.add("none");
  notsaveElement.classList.remove("none");
  savedataElement.classList.remove("none");
  ModedropdownElement.classList.add("none");
  leveldropdownElement.classList.add("none");
}

function reultModeandLevel() {
  if (selectmode == "Challenge") {
    if (selectlevel == "Hard") {
      time = 30;
    } else if (selectlevel == "Intermediate") {
      time = 60;
    } else {
      time = 120;
    }
  } else {
    if (selectlevel == "Hard") {
      time = 3;
    } else if (selectlevel == "Intermediate") {
      time = 5;
    } else {
      time = 7;
    }
  }
}

function closesetting() {
  NavsettingLeftElement.classList.remove("nav");
  NavsettingLeft.classList.add("fadeleft");
}

function detaildatacurrent() {
  modecurrentElement.innerText = `Mode : ${selectmode}`;
  levelcurrentElement.innerText = `Level : ${selectlevel}`;
  if (artistElement.value) {
    ArtistcurrentElement.innerText = `Artist : ${artistElement.value}`;
  } else {
    ArtistcurrentElement.innerText = `Artist : ${premusic}`;
  }
}

function callallneed() {
  selectcolorMode();
  selectcolorLevel();
  detaildatacurrent();
}

function selectcolorMode() {
  CMElement.classList.remove("selectModeLevel");
  SMElement.classList.remove("selectModeLevel");
  UMElement.classList.remove("selectModeLevel");
  if (selectmode == "Challenge") {
    CMElement.classList.add("selectModeLevel");
  } else if (selectmode == "Survival") {
    SMElement.classList.add("selectModeLevel");
  } else {
    UMElement.classList.add("selectModeLevel");
  }
}

function selectcolorLevel() {
  hardElement.classList.remove("selectModeLevel");
  interElement.classList.remove("selectModeLevel");
  easyElement.classList.remove("selectModeLevel");
  if (selectlevel == "Hard") {
    hardElement.classList.add("selectModeLevel");
  } else if (selectlevel == "Intermediate") {
    interElement.classList.add("selectModeLevel");
  } else {
    easyElement.classList.add("selectModeLevel");
  }
}

function openSettingStart() {
  if (
    (selectmode == "null") |
    (selectlevel == "null") |
    (premusic == "null") |
    (selectmode == null) |
    (selectlevel == null) |
    (premusic == null) |
    (selectmode == "") |
    (selectlevel == "") |
    (premusic == "") |
    selectmode |
    selectlevel |
    premusic
  ) {
    settingStartElement.classList.remove("none");
    inputfornoneElement.classList.add("none");
    historyfornoneElement.classList.add("none");
    gamefornoneElement.classList.add("none");
    detailscoreElement.classList.add("none");
  }
}

function save() {
  detaildatacurrent();
  closesetting();
  if (
    artistElement.value &&
    artistElement.value !== "null" &&
    artistElement.value !== null
  ) {
    premusic = artistElement.value;
  }
  localStorage.setItem("music", premusic);
  localStorage.setItem("mode", selectmode);
  localStorage.setItem("level", selectlevel);
}

function closesettingstart() {
  settingStartElement.classList.add("none");
  inputfornoneElement.classList.remove("none");
  historyfornoneElement.classList.remove("none");
  gamefornoneElement.classList.remove("none");
  detailscoreElement.classList.remove("none");
}

function formodeAndLevelSelect() {
  selectcolorMode();
  selectcolorLevel();
  savedataElement.classList.remove("boxmode");

  if (
    selectmode !== "null" &&
    selectlevel !== "null" &&
    selectmode !== null &&
    selectlevel !== null &&
    selectmode !== "" &&
    selectlevel !== "" &&
    selectmode &&
    selectlevel &&
    artiststartElement.value
  ) {
    savedatastartElement.classList.remove("boxmode");
  }
}

function CMfunction() {
  preSelectmode = selectmode;
  selectmode = "Challenge";
  formodeAndLevelSelect();
}

function SMfunction() {
  preSelectmode = selectmode;
  selectmode = "Survival";
  formodeAndLevelSelect();
}

function UMfunction() {
  preSelectmode = selectmode;
  selectmode = "Ultimate";
  formodeAndLevelSelect();
}

function Hardfunction() {
  preSelectlevel = selectlevel;
  selectlevel = "Hard";
  formodeAndLevelSelect();
}

function interfunction() {
  preSelectlevel = selectlevel;
  selectlevel = "Intermediate";
  formodeAndLevelSelect();
}

function easyfunction() {
  preSelectlevel = selectlevel;
  selectlevel = "Easy";
  formodeAndLevelSelect();
}

inputprintElement.addEventListener("input", (event) => cheakWord(event));
ClearElement.addEventListener("click", () => (history = []));
resetElement.addEventListener("click", waitready);

CMElement.addEventListener("click", () => CMfunction());
SMElement.addEventListener("click", () => SMfunction());
UMElement.addEventListener("click", () => UMfunction());
hardElement.addEventListener("click", () => Hardfunction());
interElement.addEventListener("click", () => interfunction());
easyElement.addEventListener("click", () => easyfunction());

CMstartElement.addEventListener("click", () => CMfunction());
SMstartElement.addEventListener("click", () => SMfunction());
UMstartElement.addEventListener("click", () => UMfunction());
hardstartElement.addEventListener("click", () => Hardfunction());
interstartElement.addEventListener("click", () => interfunction());
easystartElement.addEventListener("click", () => easyfunction());

savedatastartElement.addEventListener("click", () => {
  premusic = artiststartElement.value;
  if (
    selectmode !== "null" &&
    selectlevel !== "null" &&
    premusic !== "null" &&
    selectmode !== null &&
    selectlevel !== null &&
    premusic !== null &&
    selectmode !== "" &&
    selectlevel !== "" &&
    premusic !== "" &&
    selectmode &&
    selectlevel &&
    premusic
  ) {
    closesettingstart();
    save();
    callallneed();
    inputprintElement.focus();
    waitready();
  }
});
savedataElement.addEventListener("click", () => save());
backElement.addEventListener("click", () => {
  settingback();
});
notsaveElement.addEventListener("click", () => {
  selectmode = preSelectmode;
  selectlevel = preSelectlevel;
  artistElement.vale = premusic;
  selectcolorMode();
  selectcolorLevel();
  closesetting();
});
ModeElement.addEventListener("click", () => {
  nonefordropdown();
  ModedropdownElement.classList.remove("none");
});
levelElement.addEventListener("click", () => {
  nonefordropdown();
  leveldropdownElement.classList.remove("none");
});

artiststartElement.addEventListener("input", formodeAndLevelSelect);
artistElement.addEventListener("input", formodeAndLevelSelect);

// formElement.addEventListener("submit", (element) => {
//   element.preventDefault();
//   loaddatamusic();
// });

openSettingStart();
callallneed();
