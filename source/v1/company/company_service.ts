import Company, { CompanyDocument } from './company_model';
import { ICompanyInput } from './company_interface';

interface ICompanyService {
    createCompany(data: ICompanyInput): Promise<CompanyDocument | unknown>;
    getAllCompanies(): Promise<CompanyDocument[] | unknown>;
    getOneCompany(id: string): Promise<CompanyDocument | unknown>;
    updateCompanyById(id: string, data: ICompanyInput): Promise<CompanyDocument | unknown>;
    removeCompanyById(id: string): Promise<CompanyDocument | unknown>;
}

export class CompanyService implements ICompanyService {
    async createCompany(data: ICompanyInput) {
        try {
            const result: CompanyDocument = await Company.create(data);

            return {
                status: 200,
                message: 'Company Created!',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async getAllCompanies() {
        try {
            const result: CompanyDocument[] = await Company.find().sort('-updatedAt').exec();

            return {
                status: 200,
                message: 'Get All Companies',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async getOneCompany(id: string) {
        try {
            const result: CompanyDocument | null = await Company.findById(id).exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'Company Not Found'
                };
            }

            return {
                status: 200,
                message: 'Get Company',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async updateCompanyById(id: string, data: ICompanyInput) {
        try {
            const result: CompanyDocument | null = await Company.findByIdAndUpdate(id, data, { new: true }).exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'Update Company Failed'
                };
            }

            return {
                status: 200,
                message: 'Company Updated',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async removeCompanyById(id: string) {
        try {
            const result: CompanyDocument | null = await Company.findByIdAndDelete(id).exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'Company not found'
                };
            }

            return {
                status: 200,
                message: 'Company Deleted',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }
}
