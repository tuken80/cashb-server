import { Request, Response } from "express";
import {readdir} from 'fs';
import {getRepository} from "typeorm";
import {Musique} from "../../../entities/musique.entity";

export class MediaController {
    public getsMusique(req: Request, res: Response) {
        const mRepo = getRepository(Musique);

        mRepo
            .find({
                order: {
                    annee: "DESC"
                }
            })
            .then(ms => res.status(200).json(ms));
    }
}
