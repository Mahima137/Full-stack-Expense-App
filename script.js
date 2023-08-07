// Retrieve expenses from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display expenses on the screen
function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expense.description} - ${expense.type} - Rs:${expense.amount}</span>
            <button class="editBtn" data-index="${index}">Edit</button>
            <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });

    // Attach event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach(button => button.addEventListener('click', editExpense));

    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => button.addEventListener('click', deleteExpense));
}

// Function to add an expense
function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseType = document.getElementById('expenseType').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && expenseType && !isNaN(expenseAmount)) {
        const newExpense = {
            description: expenseName,
            type: expenseType,
            amount: expenseAmount
        };

        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        renderExpenses();
    }
}

// Function to edit an expense
function editExpense(event) {
    const index = event.target.getAttribute('data-index');
    const newDescription = prompt('Enter new description:');
    const newType = prompt('Enter new type:');
    const newAmount = parseFloat(prompt('Enter new amount:'));

    if (newDescription && newType && !isNaN(newAmount)) {
        expenses[index].description = newDescription;
        expenses[index].type = newType;
        expenses[index].amount = newAmount;

        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

// Function to delete an expense
function deleteExpense(event) {
    const index = event.target.getAttribute('data-index');
    expenses.splice(index, 1);

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Attach event listener to "Add Expense" button
const addExpenseButton = document.getElementById('addExpense');
addExpenseButton.addEventListener('click', addExpense);

// Initial rendering of expenses
renderExpenses();
