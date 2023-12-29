import { Controller, Get, Query } from '@nestjs/common';
import { EtherscanService } from './etherscan.service';

@Controller('api/etherscan')
export class EtherscanController {
    constructor(private readonly etherscanService: EtherscanService) { }

    @Get('/balance')
    async getAccountBalance(@Query('address') address: string): Promise<any> {
        return this.etherscanService.getAccountBalance(address);
    }

    @Get('/ethprice')
    async getEthPrice(): Promise<any> {
        return this.etherscanService.getEthPrice();
    }

    @Get('/txlist')
    async isWalletOld(@Query('address') address: string): Promise<any> {
        return this.etherscanService.isWalletOld(address);
    }

}
