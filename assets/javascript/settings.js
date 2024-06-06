// settings.js

document.getElementById('btnSettings').addEventListener("click", function () {
    const panelContainer = document.getElementById("settingsPanelContainer");
    panelContainer.classList.toggle('open');
});

document.getElementById('btnResetSettings').addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

document.getElementById('settingsPanelContainer').addEventListener("click", function () { 
    this.classList.remove('open');
});

document.querySelector('.settings-panel').addEventListener("click", function (event) {
    event.stopPropagation();
});
