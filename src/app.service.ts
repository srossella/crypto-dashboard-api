import { Injectable } from '@nestjs/common';
import * as MOCKED_TRANSACTIONS from './database/transactions.json';
import { Transaction } from './types/transaction';
import { Balance } from './types/balance';
import { NotFoundException } from '@nestjs/common';
import createBalanceByUser from './utils/createBalanceByUser';

@Injectable()
export class AppService {
  getTransactions(): Transaction[] {
    return MOCKED_TRANSACTIONS;
  }
  /**
   * @dev This method is used to get the total balance (sum of amounts)
   *  grouped by user id, and asset
   *
   * @returns {Balance[]} 
   */
  
  getBalance(): Balance[] {
    const uniqueUserId = [...new Set(MOCKED_TRANSACTIONS.map(thx => thx.user.id))];
    const balance = uniqueUserId.map(userId => {
       return createBalanceByUser(userId, MOCKED_TRANSACTIONS)
    })
    return balance
  }

   /**
   * @dev This method is used to get the total balance (sum of amounts)
   *  given a user Id
   *
   * @returns {Balance} 
   */
  
   getBalanceByUser(userId): Balance {
    const balanceByUser = createBalanceByUser(userId, MOCKED_TRANSACTIONS)
    if ( balanceByUser.userId === 'not found' ) { 
      throw new NotFoundException()
    } 
    return balanceByUser
  }
  /**
   * @dev This method is used to create a new transaction 
   *
   * @returns {Transaction[]} list of transactions
   */
  createThx(createThxDto): Transaction[]{
    const newThx = {
      id: `${MOCKED_TRANSACTIONS.length+1}-0x-trx`,
      nature: {
        code: createThxDto.nature
      },
      createdOn: new Date().toLocaleString(),
      amount: Number(createThxDto.amount),
      asset: createThxDto.asset,
      user: {
        id: createThxDto.userId
      }
    }
    MOCKED_TRANSACTIONS.push(newThx);
    return MOCKED_TRANSACTIONS
  }
}