import * as dotenv from 'dotenv';

import * as winston from 'winston';

import "reflect-metadata";
import {createConnection, Connection} from "typeorm";

import * as express from 'express';
import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';

import {AuthController} from "./modules/session/controllers/auth.controller";
import {ContactController} from "./modules/contact/controllers/contact.controller";
import {MailController} from "./modules/contact/controllers/mail.controller";
import {ActualiteController} from "./modules/evenementiel/controllers/actualite.controller";
import {MediaController} from "./modules/cloud/controllers/media.controller";

import {AuthMiddleware} from "./modules/session/middlewares/auth.middleware";

dotenv.config({
    path: `${__dirname}/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`
});

const modules = {
    session: {
        middlewares: [
            AuthMiddleware
        ],
        controllers: {
            auth: new AuthController()
        },
        routes: [
            {
                path: '/auth/signin',
                method: 'post',
                controller: 'auth',
                action: 'signin'
            }
        ]
    },
    contact: {
        controllers: {
            mail: new MailController(),
            contact: new ContactController()
        },
        routes: [
            {
                path: '/newsletter',
                method: 'post',
                controller: 'mail',
                action: 'newsletter'
            },
            {
                path: '/contact',
                method: 'post',
                controller: 'contact',
                action: 'save'
            }
        ]
    },
    cloud: {
        controllers: {
            media: new MediaController()
        },
        routes: [
            {
                path: '/musiques',
                method: 'get',
                controller: 'media',
                action: 'getsMusique'
            }
        ]
    },
    evenementiel: {
        controllers: {
            actu: new ActualiteController()
        }
    }
};

class Server {
    private readonly app: express.Application;
    private logger;

    constructor() {
        this.app  = express();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
                new winston.transports.File({ filename: `${__dirname}/../logs/combined.log` }),
            ],
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }

        createConnection()
            .then((connection: Connection) => {
                this.app.locals.db = connection;

                return this.app.locals.db.synchronize();
            })
            .then(() => {
                this.loadMiddlewares();

                Object.keys(modules).forEach(module => {
                    if (modules[module]['middlewares'] !== undefined) modules[module]['middlewares'].forEach(middleware => this.loadMiddleware(middleware));
                    if (modules[module]['routes'] !== undefined) modules[module]['routes'].forEach(route => this.loadController(module, route));
                });
            });
    }

    private loadMiddlewares(): void {
        this.app.use('/api/static', express.static(`${__dirname}/public`));

        this.loadMiddleware(express.json());
        this.loadMiddleware(express.urlencoded({ extended: false }));

        const dbHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
            req.app.locals.db = this.app.locals.db;

            next();
        };

        this.loadMiddleware(dbHandler);
    }

    private loadMiddleware(middleware: RequestHandler): void {
        this.app.use(middleware);
    }

    private loadController(module, route): void {
        this.app[route.method](`/api${route.path}`, modules[module]['controllers'][route.controller][route.action]);
    }

    public launch(): void {
        const errorHandler: ErrorRequestHandler = (err: { stack: any; }, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).end();
        };

        this.app.use(errorHandler);

        this.app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
    }
}

new Server().launch();
