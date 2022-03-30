import { Document, Model, model, Schema, Types } from 'mongoose';
import IUser from './user_interface';
import ICompany from '../company/company_interface';

const UserSchema: Schema = new Schema(
    {
        company: { type: Types.ObjectId, required: true, ref: 'Company' },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        pin: { type: Number, required: true }
    },
    { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

export interface UserBaseDocument extends IUser, Document {}

export interface UserDocument extends UserBaseDocument {
    company: ICompany['_id'];
}

export interface UserPopulatedDocument extends UserBaseDocument {
    company: ICompany;
}

export interface UserModel extends Model<UserDocument> {}

export default model<UserDocument, UserModel>('User', UserSchema);
