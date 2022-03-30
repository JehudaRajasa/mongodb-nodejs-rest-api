import { Router, Request, Response } from 'express';
import { ICompanyInput } from './company_interface';
import { CompanyService } from './company_service';
import { IController } from '../util/util_interface';

export class CompanyController implements IController {
    path = '/companies';
    router = Router();
    service: CompanyService;

    constructor() {
        this.initRouter();
        this.service = new CompanyService();
    }

    private initRouter() {
        this.router.post(`${this.path}`, this.createCompany);
        this.router.get(`${this.path}`, this.getCompanies);
        this.router.get(`${this.path}/:id`, this.getCompany);
        this.router.put(`${this.path}/:id`, this.updateCompany);
        this.router.delete(`${this.path}/:id`, this.deleteCompany);
    }

    private createCompany = (req: Request, res: Response) => {
        const company: ICompanyInput = { ...req.body };

        this.service
            .createCompany(company)
            .then((data: any) => {
                if (data.status != 200) {
                    res.status(data.status).json({
                        message: data.message
                    });
                }

                res.status(200).json({
                    message: data.message,
                    result: data.result
                });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error
                });
            });
    };

    private getCompanies = (req: Request, res: Response) => {
        this.service
            .getAllCompanies()
            .then((data: any) => {
                if (data.status != 200) {
                    res.status(data.status).json({
                        message: data.message
                    });
                }

                res.status(200).json({
                    message: data.message,
                    result: data.result
                });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error
                });
            });
    };

    private getCompany = (req: Request, res: Response) => {
        this.service
            .getOneCompany(req.params.id)
            .then((data: any) => {
                if (data.status != 200) {
                    res.status(data.status).json({
                        message: data.message
                    });
                }

                res.status(200).json({
                    message: data.message,
                    result: data.result
                });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error
                });
            });
    };

    private updateCompany = (req: Request, res: Response) => {
        const company: ICompanyInput = { ...req.body };

        this.service
            .updateCompanyById(req.params.id, company)
            .then((data: any) => {
                if (data.status != 200) {
                    res.status(data.status).json({
                        message: data.message
                    });
                }

                res.status(200).json({
                    message: data.message,
                    result: data.result
                });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error
                });
            });
    };

    private deleteCompany = (req: Request, res: Response) => {
        this.service
            .removeCompanyById(req.params.id)
            .then((data: any) => {
                if (data.status != 200) {
                    res.status(data.status).json({
                        message: data.message
                    });
                }

                res.status(200).json({
                    message: data.message,
                    result: data.result
                });
            })
            .catch((error: Error) => {
                res.status(500).json({
                    message: 'Internal Server Error',
                    error
                });
            });
    };
}
