import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletSchema } from './schemas/wallet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }])],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule { }
