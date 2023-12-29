import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Wallet } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
    constructor(
        @InjectModel(Wallet.name)
        private walletModel: mongoose.Model<Wallet>
    ) { }


    async findAll(): Promise<Wallet[]> {
        const wallets = await this.walletModel.find()
        return wallets
    }

}
