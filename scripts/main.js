// main.js

// Function to add expense
function addExpense() {
  const expenseInput = document.getElementById("expense").value;
  const categoryInput = document.getElementById("category").value;
  const amountInput = document.getElementById("amount").value;
  const dateInput = document.getElementById("date").value;
  const timeInput = document.getElementById("time").value;

  // Simple validation
  if (
    !expenseInput ||
    !categoryInput ||
    !amountInput ||
    !dateInput ||
    !timeInput
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Create expense object
  const expense = {
    expense: expenseInput,
    category: categoryInput,
    amount: amountInput,
    date: dateInput,
    time: timeInput,
  };

  // Retrieve existing expenses
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear form fields
  document.getElementById("expense").value = "";
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";

  // Redirect to view expenses page (optional)
  window.location.href = "view-expense.html";
}
