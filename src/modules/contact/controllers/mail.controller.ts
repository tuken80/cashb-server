import { Request, Response } from "express";
import {getRepository} from "typeorm";

import {Mail} from "../../../entities/mail.entity";

export class MailController {
    public newsletter(req: Request, res: Response) {
        const mRepo = getRepository(Mail);

        mRepo
            .findOne({ where: { value: req.body.value } })
            .then(m => {
                if (m && m.enableNewsletter) res.status(409).end();
                else if (m && !m.enableNewsletter) {
                    m.enableNewsletter = true;

                    mRepo
                        .save(m)
                        .then(() => res.status(200).end());
                }
                else if (!m) mRepo
                        .save(new Mail(req.body.value, req.body.enableNewsletter))
                        .then(() => res.status(200).end());
            });
    }
}
