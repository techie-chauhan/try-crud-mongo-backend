import Joi, { SchemaInternals } from "joi";
import { BAD_REQUEST } from "http-status";
import { NextFunction, Request, Response } from "express";
import ApiError from "@/utils/ApiError";
import pick from "@/utils/pick";

const validate =
    (schema: any) => (req: Request, res: Response, next: NextFunction) => {
        // console.log(req);
        const validSchema = pick(schema, ["params", "query", "body"]);
        const object = pick(req, Object.keys(validSchema));
        const { value, error } = Joi.compile(validSchema)
            .prefs({ errors: { label: "key" }, abortEarly: false })
            .validate(object);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(", ");
            return next(new ApiError(BAD_REQUEST, errorMessage));
        }
        Object.assign(req, value);
        return next();
    };

export default validate;
