const settingElement = document.getElementById("setting");
const NavsettingLeftElement = document.getElementById("NavsettingLeft");

const savedataElement = document.getElementById("savedata");
const btnforformElement = document.getElementById("btnforform");

function openNavsetting() {
  NavsettingLeftElement.classList.remove("fadeleft");
  NavsettingLeftElement.classList.add("nav");
  savedataElement.classList.add("boxmode");
}

settingElement.addEventListener("click", openNavsetting);
