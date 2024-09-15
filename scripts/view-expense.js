window.onload = function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("Please log in to view your expenses.");
    window.location.href = "login.html";
    return;
  }

  // Fetch and display expenses on page load
  const expenses = safeParse(localStorage.getItem("expenses")) || {};
  const userExpenses = expenses[loggedInUser] || [];
  renderExpenses(userExpenses);
};

// Function to search expenses based on input
function searchExpenses() {
  const query = document.getElementById("search").value.toLowerCase();
  const expenses = safeParse(localStorage.getItem("expenses")) || {};
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("Please log in to perform a search.");
    return;
  }

  const userExpenses = expenses[loggedInUser] || [];
  const filteredExpenses = userExpenses.filter(
    (e) =>
      e.expense.toLowerCase().includes(query) ||
      e.category.toLowerCase().includes(query)
  );

  renderExpenses(filteredExpenses);
}

// Function to render the expenses in the table
function renderExpenses(expenses) {
  const tableBody = document.querySelector("#expense-table tbody");
  tableBody.innerHTML = ""; // Clear previous data

  if (expenses.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5">No expenses found.</td></tr>';
    return;
  }

  expenses.forEach((exp) => {
    const row = `<tr>
                  <td>${exp.expense}</td>
                  <td>${exp.category}</td>
                  <td>₹${exp.amount}</td>
                  <td>${formatDate(exp.date)}</td>
                  <td>${exp.time}</td>
                </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Function to export expenses as CSV using Blob for better file handling
function exportExpenses() {
  const expenses = safeParse(localStorage.getItem("expenses")) || {};
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("Please log in to export expenses.");
    return;
  }

  const userExpenses = expenses[loggedInUser] || [];

  // Define CSV headers with BOM for UTF-8 encoding
  let csvContent = "\uFEFFExpense,Category,Amount (₹),Date,Time\n";

  // Add each expense as a CSV row
  userExpenses.forEach((exp) => {
    const row = `"${exp.expense}","${exp.category}",${exp.amount},"${formatDate(
      exp.date
    )}","${exp.time}"\n`;
    csvContent += row;
  });

  // Create a Blob for proper file handling
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Set attributes for the link
  link.setAttribute("href", url);
  link.setAttribute("download", "expenses.csv");

  // Append the link to the body, trigger download, and then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to safely parse JSON and handle errors
function safeParse(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing JSON", e);
    return {};
  }
}

// Function to format the date (YYYY-MM-DD) and wrap in quotes to avoid Excel auto-formatting
function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return ""; // Return an empty string if the date is invalid
  // Format date as YYYY-MM-DD for better compatibility with Excel
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}
