import express from "express";
import type { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {
    addDays,
    addWeeks,
    subDays,
    parse as parseDate,
    format,
} from "date-fns";
import * as fs from "fs";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Title",
            version: "1.0.0",
            description: "Your API Description",
        },
    },
    apis: ["./src/server.ts"], // Replace with the path to your actual API file
};

const swaggerSpec = swaggerJSDoc(options);

// Write Swagger JSON to a file
const swaggerJsonPath = "./swagger.json";
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));

/**
 * @swagger
 * /add-days:
 *   get:
 *     summary: Add days to the current date.
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days to add.
 *     responses:
 *       '200':
 *         description: Successfully added days.
 *         content:
 *           text/plain:
 *             example: "2023-12-08"
 */

/**
 * @swagger
 * /add-weeks:
 *   get:
 *     summary: Add weeks to the current date.
 *     parameters:
 *       - in: query
 *         name: weeks
 *         schema:
 *           type: integer
 *         description: Number of weeks to add.
 *     responses:
 *       '200':
 *         description: Successfully added weeks.
 *         content:
 *           text/plain:
 *             example: "2023-12-15"
 */

/**
 * @swagger
 * /sub-days-from-12-jan-2019:
 *   get:
 *     summary: Subtract days from a specific date (12 Jan 2019).
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days to subtract.
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to subtract days.
 *     responses:
 *       '200':
 *         description: Successfully subtracted days.
 *         content:
 *           text/plain:
 *             example: "2018-07-09"
 */

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/add-days", (req: Request, res: Response) => {
    const daysToAdd = getQueryParam(req.query.days, 6);
    const resultDate = addDays(new Date(), daysToAdd);
    respondWithDate(res, resultDate);
});

app.get("/add-weeks", (req: Request, res: Response) => {
    const weeksToAdd = getQueryParam(req.query.weeks, 6);
    const resultDate = addWeeks(new Date(), weeksToAdd);
    respondWithDate(res, resultDate);
});

app.get("/sub-days-from-12-jan-2019", (req: Request, res: Response) => {
    const daysToSubtract = getQueryParam(req.query.days, 187);
    const fromDate = req.query.fromDate
        ? parseDate(
              req.query.fromDate as string,
              "yyyy-MM-dd",
              new Date(2019, 1, 12)
          )
        : new Date(2019, 1, 12);

    const resultDate = subDays(fromDate, daysToSubtract);
    respondWithDate(res, resultDate);
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Not Found");
});

const respondWithDate = (res: Response, date: Date) => {
    res.status(200).send(format(date, "yyyy-MM-dd"));
};

const getQueryParam = (
    param: string | string[] | any | undefined,
    defaultValue: number
): number => {
    const paramArray = Array.isArray(param) ? param : [param]; // Ensure param is an array
    const firstElement =
        paramArray && paramArray.length > 0 ? paramArray[0] : undefined;
    return firstElement ? parseInt(firstElement, 10) : defaultValue;
};

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
