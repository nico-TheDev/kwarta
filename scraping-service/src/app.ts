import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { scrapeInflation, scrapeInvestments, scrapeNews, scrapeStocks, InvestmentQuery } from "./scrapeLogic";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("WELCOME TO CASH API!");
});

app.get("/inflation", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await scrapeInflation();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

app.get("/investment", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query as unknown as InvestmentQuery;
        const data = await scrapeInvestments(query);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

app.get("/stocks", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await scrapeStocks();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

app.get("/news", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await scrapeNews();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

// Centralized error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

export default app;
