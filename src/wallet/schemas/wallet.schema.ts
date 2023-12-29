import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'


@Schema({
    timestamps: true
})

export class Wallet {
    @Prop()
    account: string;

    @Prop()
    address: string;

    @Prop()
    firstTransaction: Date;

    @Prop()
    euroExchange: number;

    @Prop()
    usdExchange: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);