const checkLocalStorage = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? checkLocalStorage : [];
// state

const addTransaction = e => {
  e.preventDefault();

  if($('#text').val().trim() === '' || $('#amount').val().trim() === '') {
    alert('Please add valid input')
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000),
      text: $('#text').val(),
      amount:+$('#amount').val()
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    $('#text').val("");
    $('#amount').val("");
  }

};

const deleteTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id)
  updateLocalStorage();
  init();
};

// add transactions to dom
const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button onclick="deleteTransaction(${transaction.id})" class="delete-btn" >x</button>
  `;

  $('#list').append(item);
};

// update the balance, income and expense

const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc += item,0).toFixed(2);
  $('#balance').html(`£${total}`);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc += item, 0)
    .toFixed(2);
  $('#money-plus').html(`£+${income}`);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc += item, 0)
    .toFixed(2);
  $('#money-minus').html(`£${expense}`);
};

// update local storage
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};



// App init
const init = () => {
  $('#list').html('');

  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();


$('#form').submit(addTransaction);