import { Document, Model, model, Schema } from 'mongoose';
import ICompany from './company_interface';

const CompanySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String, required: true },
        website: { type: String, required: false }
    },
    { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

export interface CompanyDocument extends ICompany, Document {}

export interface CompanyModel extends Model<CompanyDocument> {}

export default model<CompanyDocument, CompanyModel>('Company', CompanySchema);
