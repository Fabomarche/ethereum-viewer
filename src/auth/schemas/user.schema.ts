import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class User {
    @Prop()
    email: string

    @Prop({ unique: [true, 'duplicate email entered'] })
    password: string

    @Prop()
    wallets: string[]

}

export const UserSchema = SchemaFactory.createForClass(User)