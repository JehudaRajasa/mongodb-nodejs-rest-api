import { Document } from 'mongoose';

export default interface ICompany extends Document {
    name: string;
    contactNumber: string;
    email: string;
    website: string;
}

export interface ICompanyInput {
    name: string;
    contactNumber: string;
    email: string;
    website: string;
}
