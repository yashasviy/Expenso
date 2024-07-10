import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddEntry = () => {
    const newTransaction = {
      id: transactions.length + 1,
      details,
      amount: parseFloat(amount)
    };

    setTransactions([...transactions, newTransaction]);
    setDetails('');
    setAmount('');
  };

  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  const expense = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  return (
    <div className="App">
      <h1>Expenso</h1>
      <div className="container">
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">₹{income}</p>
          </div>
          <div>
            <h4>Expenses</h4>
            <p className="money minus">₹{Math.abs(expense).toFixed(2)}</p>
          </div>
        </div>
        <h3>History</h3>
        <ul className="list">
          {transactions.map(transaction => (
            <li key={transaction.id} className={transaction.amount > 0 ? 'plus' : 'minus'}>
              {transaction.details}
              <span>{transaction.amount > 0 ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3>Add New Entry</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddEntry(); }}>
          <div className="form-control">
            <label htmlFor="text">Details</label>
            <input
              type="text"
              id="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter details..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
          <button type="submit" className="btn">Add Entry</button>
        </form>
      </div>
    </div>
  );
}

export default App;
