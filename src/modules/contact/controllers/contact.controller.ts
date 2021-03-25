import { Request, Response } from "express";
import {getRepository} from "typeorm";

import {Contact} from "../../../entities/contact.entity";
import {Mail} from "../../../entities/mail.entity";

export class ContactController {
    public save(req: Request, res: Response) {
        const mRepo = getRepository(Mail);

        mRepo
            .findOne({ where: { value: req.body.mail.value } })
            .then(m => {
                const cRepo = getRepository(Contact);

                if (m) cRepo
                        .save(new Contact(req.body.sujet, req.body.details, m))
                        .then(() => res.status(200).end())
                else {
                    const nm = new Mail(req.body.mail.value, false);

                    mRepo
                        .save(nm)
                        .then(() => cRepo.save(new Contact(req.body.sujet, req.body.message, nm)))
                        .then(() => res.status(200).end());
                }
            });
    }
}
