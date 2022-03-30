import { Document } from 'mongoose';
import ICompany from '../company/company_interface';
export default interface IUser extends Document {
    company: string | ICompany;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    pin: number;
}

export interface IUserInput {
    company: string | ICompany;
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    pin: number;
}
