import { Controller, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('api/user')
export class UserController {
    constructor(private readonly walletService: UserService) { }

    @Put('/favourite')
    async addAddressToWallet(@Request() req): Promise<{ message: string }> {
        const address = req.body.address;
        const userId = req.body.userId;

        await this.walletService.addAddressToWallet(userId, address);

        return { message: 'Address added to wallet successfully' };
    }
}
