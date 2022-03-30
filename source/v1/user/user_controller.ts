import { Router, Request, Response } from 'express';
import { IUserInput } from './user_interface';
import { UserService } from './user_service';
import { IController } from '../util/util_interface';

export class UserController implements IController {
    path = '/users';
    router = Router();
    service: UserService;

    constructor() {
        this.initRouter();
        this.service = new UserService();
    }

    private initRouter() {
        this.router.post(`${this.path}`, this.createUser);
        this.router.get(`${this.path}`, this.getUsers);
        this.router.get(`${this.path}/:id`, this.getUser);
        this.router.put(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    private createUser = (req: Request, res: Response) => {
        const user: IUserInput = { ...req.body };

        this.service
            .createUser(user)
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

    private getUsers = (req: Request, res: Response) => {
        this.service
            .getAllUsers()
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

    private getUser = (req: Request, res: Response) => {
        this.service
            .getOneUser(req.params.id)
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

    private updateUser = (req: Request, res: Response) => {
        const user: IUserInput = { ...req.body };

        this.service
            .updateUserById(req.params.id, user)
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

    private deleteUser = (req: Request, res: Response) => {
        this.service
            .removeUserById(req.params.id)
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
