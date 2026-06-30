const role = localStorage.getItem("role");

document.getElementById(
    "welcome"
).innerText = `Welcome ${role}`;

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}