// Mock user data (should be replaced with proper backend storage in real use case)
let users = JSON.parse(localStorage.getItem("users")) || [];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Store logged in user in localStorage for session persistence
    localStorage.setItem("loggedInUser", user.username);
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password");
  }
}
