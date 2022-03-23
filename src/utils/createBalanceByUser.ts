import { Balance } from '../types/balance';
import { Transaction } from '../types/transaction';

/**
   * This function filter an array of transactions and returns the balance of each asset for a given user. 
   * @param  {string, Transaction[]}    userId transactions
   * @returns {Balance} 
   */


export default function createBalanceByUser(userId : string, transactions : Transaction[]) : Balance {
  const thx = transactions.filter(thx => thx.user.id === userId)
  if (thx.length === 0) {
    userId = 'not found' 
  }
  let balanceByUser : Balance = {
    userId: userId,
    btc : 0,
    eth : 0,
    dot : 0
  }
  thx.forEach(function (thx) {
    if (thx.asset === "BTC"){
      balanceByUser.btc += thx.amount;
    } else if (thx.asset === "ETH"){
      balanceByUser.eth += thx.amount;
    } else if (thx.asset === "DOT"){
      balanceByUser.dot += thx.amount;
    }    
  });
  return balanceByUser 
}