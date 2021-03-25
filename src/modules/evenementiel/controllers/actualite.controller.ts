import { Request, Response } from "express";
import {getRepository} from "typeorm";

import {Actualite} from "../../../entities/actualite.entity";

export class ActualiteController {
    public save(req: Request, res: Response): void {
        getRepository(Actualite)
            .save(new Actualite(req.body.titre, req.body.description, req.body.contenu, req.body.date))
            .then(() => res.status(200).end());
    }
}
