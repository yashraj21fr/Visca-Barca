function addExpense() {
  const expense = document.getElementById("expense").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // Validate that the amount is positive
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("Please log in to add an expense.");
    window.location.href = "login.html";
    return;
  }

  // Fetch existing expenses or initialize an empty object
  let expenses = JSON.parse(localStorage.getItem("expenses")) || {};

  // If no expenses exist for the logged-in user, initialize an empty array
  if (!expenses[loggedInUser]) {
    expenses[loggedInUser] = [];
  }

  // Add the new expense
  expenses[loggedInUser].push({ expense, category, amount, date, time });

  // Save back to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear the form after submission
  document.getElementById("expense-form").reset();

  // Provide feedback with a delay before redirect
  alert("Expense added successfully!");
  setTimeout(() => {
    window.location.href = "view-expense.html";
  }, 1000); // Redirect after 1 second
}

// Add event listener for form submission
document
  .getElementById("expense-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    addExpense(); // Call the addExpense function
  });
