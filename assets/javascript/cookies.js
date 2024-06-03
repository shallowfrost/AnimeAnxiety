// Variables
const themeToggle = document.querySelector(".theme-toggle");

// Function to toggle theme
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme") || "grey-mode";
    const newTheme = currentTheme === "light-mode" ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", newTheme);
    changeTheme(newTheme);
}

// Function to change theme
function changeTheme(theme) {
    document.body.className = theme;
}

// Initial setup for the theme based on the cached preference
const cachedTheme = localStorage.getItem("theme");
if (cachedTheme) {
    changeTheme(cachedTheme);
} else {
    // If no theme is cached, default to grey mode
    document.body.classList.add("dark-mode");
}

document.body.classList.add("transition")

// Event listener for theme toggle button
themeToggle.onclick = toggleTheme;