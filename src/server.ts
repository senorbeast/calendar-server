import * as http from "http";
import { parse } from "url";
import {
    addDays,
    addWeeks,
    subDays,
    parse as parseDate,
    format,
} from "date-fns";

const server = http.createServer((req, res) => {
    const { pathname, query } = parse(req.url || "", true);

    const getQueryParam = (param: string, defaultValue: number): number => {
        return query[param]
            ? parseInt(query[param] as string, 10)
            : defaultValue;
    };

    if (pathname === "/add-days") {
        const daysToAdd = getQueryParam("days", 6);
        const resultDate = addDays(new Date(), daysToAdd);
        return respondWithDate(res, resultDate);
    }

    if (pathname === "/add-weeks") {
        const weeksToAdd = getQueryParam("weeks", 6);
        const resultDate = addWeeks(new Date(), weeksToAdd);
        return respondWithDate(res, resultDate);
    }

    if (pathname === "/sub-days-from-12-jan-2019") {
        const daysToSubtract = getQueryParam("days", 187);
        const fromDate = query.fromDate
            ? parseDate(
                  query.fromDate as string,
                  "yyyy-MM-dd",
                  new Date(2019, 1, 12)
              )
            : new Date(2019, 1, 12); // Use default value if query.fromDate is not provided

        const resultDate = subDays(fromDate, daysToSubtract);
        return respondWithDate(res, resultDate);
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
});

const respondWithDate = (res: http.ServerResponse, date: Date) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(format(date, "yyyy-MM-dd"));
};

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
