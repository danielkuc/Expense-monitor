// const balance = document.querySelector('#balance');
// const moneyPlus = document.querySelector('#money-plus');
// const moneyMinus = document.querySelector('#money-minus');
// const list = document.querySelector('#list');
// const form = document.querySelector('#form');
// const text = document.querySelector('#text');
// const amount = document.querySelector('#amount');

const dummyTransactions = [
  {id:1, text: 'Flower', amount:-20},
  {id:2, text: 'Salary', amount: 300},
  {id:3, text: 'Book', amount:-10},
  {id:4, text: 'Camera', amount: 150}
];

let transactions = dummyTransactions;
// state

const addTransaction = e => {
  e.preventDefault();

  if($('#text').val().trim() === '' || $('#amount').val().trim() === '') {
    alert('Please add valid input')
  } else {
    const transaction = {
      id: incrementId(dummyTransactions),
      text: $('#text').val(),
      amount:+$('#amount').val()
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    $('#text').val("");
    $('#amount').val("");
  }

};

const deleteTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id)
  init();
};

const incrementId = (array) => {
  return array[array.length-1].id+=1;
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



// App init
const init = () => {
  $('#list').html('');

  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();


$('#form').submit(addTransaction);