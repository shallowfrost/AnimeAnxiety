// cookies.js
const styleSheet = document.getElementById('styleSheet');
const cachedTheme = localStorage.getItem("theme");

window.onload = function () {
  if (cachedTheme) {
    setTheme(cachedTheme);
  } else {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }
};

var btnSettings = document.getElementById('btnSettings');
if (btnSettings) {
  document.getElementById("btnDark").addEventListener("click",
    () => setTheme('dark'));
  document.getElementById("btnLight").addEventListener("click",
    () => setTheme('light'));
  document.getElementById("btnGrey").addEventListener("click",
    () => setTheme('grey'));
  document.getElementById("btnSimLight").addEventListener("click",
    () => setTheme('simple-light'));
  document.getElementById("btnSimDark").addEventListener("click",
    () => setTheme('simple-dark'));
  document.getElementById("btnDefaultTheme").addEventListener("click",
    () => setTheme('dark'));
}

function setTheme(theme) {
  styleSheet.href = `./assets/css/theme/${theme}.css`;
  localStorage.setItem("theme", theme);
}
