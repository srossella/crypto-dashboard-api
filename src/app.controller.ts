import { Controller, Get, Post, Body,Req , Res,HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction } from './types/transaction';
import { Balance } from './types/balance';
import { Param } from '@nestjs/common';

class CreateThxDto {
  nature: string;
  amount: string;
  asset: string;
  userId: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
  * GET /transactions endpoint
  * 
  * @return   {Transaction[]}    array of all the transactions
  */
  @Get('transactions')
  getTransactions(): Transaction[] {
    return this.appService.getTransactions();
  }
  /**
  * POST /transactions endpoint
  * 
  * @return   {Transaction[]}    array of all the transactions with the new thx created 
  */
  @Post('transactions')
  create(@Body() createThxDto: CreateThxDto) {
    return this.appService.createThx(createThxDto);
  }

  /**
  * GET /balance endpoint
  * 
  * @return   {Balance[]}    array of the balance for each user
  */

  @Get('balance')
  getBalance(): Balance[] {
    return this.appService.getBalance();
  }

  /**
   * 
  * GET /balance/:userId endpoint
  * this is not yet used in frontend but implemented for the future
  *
  * @param    {string}     userId 
  * @return   {Balance}    return the balance for a given user ID
  */

  @Get('balance/:userId')
  findOne(@Param() params): Balance {
    const userId = params.userId;
    return this.appService.getBalanceByUser(userId);
  }
}
