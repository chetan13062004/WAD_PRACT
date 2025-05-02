// ===== Helper Functions =====
function getUsers() {
    // Get all users from localStorage or return empty array
    return JSON.parse(localStorage.getItem("users")) || [];
  }
  
  function saveUsers(users) {
    // Save users to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  // ===== Registration =====
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Stop form from reloading page
  
      // Get input values
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      // Load existing users
      const users = getUsers();
  
      // Check if username already exists
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        alert("Username already taken.");
        return;
      }
  
      // Create new user
      const newUser = { username, email, password };
      users.push(newUser);
      saveUsers(users);
  
      alert("Registered successfully!");
      window.location.href = "login.html"; // Go to login page
    });
  }
  
  // ===== Login =====
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get login values
      const username = document.getElementById("loginUsername").value.trim();
      const password = document.getElementById("loginPassword").value;
  
      const users = getUsers();
  
      // Check if user exists and password matches
      const validUser = users.find(user => user.username === username && user.password === password);
  
      if (validUser) {
        alert("Login successful!");
        window.location.href = "users.html"; // Go to users list
      } else {
        alert("Invalid username or password.");
      }
    });
  }
  
  // ===== Display Users (users.html) =====
  if (window.location.pathname.includes("users.html")) {
    const users = getUsers();
    const tableBody = document.querySelector("#userTable tbody");
  
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${user.username}</td><td>${user.email}</td>`;
      tableBody.appendChild(row);
    });
  }
  