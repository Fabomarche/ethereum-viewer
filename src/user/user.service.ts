import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }

    async addAddressToWallet(userId: string, address: string): Promise<User> {
        const user = await this.userModel.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }


        if (user.wallets.includes(address)) {
            throw new NotFoundException('Address already exists in wallet');
        }

        user.wallets.push(address);

        return await user.save();
    }
}
