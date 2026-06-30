function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("role", role);

    window.location.href = "dashboard.html";
}