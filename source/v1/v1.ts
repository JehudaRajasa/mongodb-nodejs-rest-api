import { IController } from './util/util_interface';
import express from 'express';
import { UserController } from './user/user_controller';
import { CompanyController } from './company/company_controller';

/*
    Cron functions: used to scheduled certain
    actions within a certain period of time.
 */

interface V1 {
    _c: IController[];
    path: String;
    router: express.Router;
}

export default class APIV1 implements V1 {
    path = '/v1';
    router = express.Router();
    _c = [new UserController(), new CompanyController()];

    constructor() {
        this.initController(this._c);
    }

    private initController = (_c: IController[]) => {
        _c.forEach((controller) => {
            this.router.use(this.path, controller.router);
        });
    };
}
