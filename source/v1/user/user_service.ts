import User, { UserDocument, UserPopulatedDocument } from './user_model';
import Company, { CompanyDocument } from '../company/company_model';
import { IUserInput } from './user_interface';

interface IUserService {
    createUser(data: IUserInput): Promise<Record<string, unknown>>;
    getAllUsers(): Promise<UserDocument[] | unknown>;
    getOneUser(id: string): Promise<UserDocument | unknown>;
    updateUserById(id: string, data: IUserInput): Promise<Record<string, any> | unknown>;
    removeUserById(id: string): Promise<Record<string, any>>;
}

export class UserService implements IUserService {
    async createUser(data: IUserInput) {
        try {
            const phoneNumberExists: UserDocument | null = await User.findOne({ phoneNumber: data.phoneNumber }).exec();

            if (phoneNumberExists) {
                return {
                    status: 400,
                    message: 'Phone number already registered'
                };
            }

            const company: CompanyDocument | null = await Company.findById(data.company).exec();

            if (!company) {
                return {
                    status: 400,
                    message: 'Company is not listed'
                };
            }

            const result: UserDocument = await User.create(data);

            return {
                status: 200,
                message: 'User Created!',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async getAllUsers() {
        try {
            const result: UserPopulatedDocument[] = await User.find().populate('company').sort('-updatedAt').exec();

            return {
                status: 200,
                message: 'Get All Users',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async getOneUser(id: string) {
        try {
            const result: UserPopulatedDocument | null = await User.findById(id).populate('company').exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'User Not Found'
                };
            }

            return {
                status: 200,
                message: 'Get User',
                result
            };
        } catch (error: any) {
            return {
                status: 400,
                message: error.message
            };
        }
    }

    async updateUserById(id: string, data: IUserInput) {
        try {
            const result: UserPopulatedDocument | null = await User.findByIdAndUpdate(id, data, { new: true }).populate('company').exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'Update User Failed'
                };
            }

            return {
                status: 200,
                message: 'User Updated',
                result
            };
        } catch (error) {
            return error;
        }
    }

    async removeUserById(id: string) {
        try {
            const result: UserPopulatedDocument | null = await User.findByIdAndDelete(id).populate('company').exec();

            if (result == null) {
                return {
                    status: 400,
                    message: 'User Not Found'
                };
            }

            return {
                status: 200,
                message: 'User Deleted',
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
