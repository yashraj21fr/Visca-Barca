// Mock user data (should be replaced with proper backend storage in real use case)
let users = JSON.parse(localStorage.getItem("users")) || [];

function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate form input
  if (!name || !email || !username || !password) {
    alert("All fields are required!");
    return;
  }

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    alert("Username already exists!");
  } else {
    const newUser = { name, email, username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully");
    window.location.href = "login.html";
  }
}
