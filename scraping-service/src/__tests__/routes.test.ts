import request from "supertest";
import app from "../app";
import * as scrapeLogic from "../scrapeLogic";

jest.mock("../scrapeLogic");

const mockScrapeInflation = scrapeLogic.scrapeInflation as jest.MockedFunction<typeof scrapeLogic.scrapeInflation>;
const mockScrapeNews = scrapeLogic.scrapeNews as jest.MockedFunction<typeof scrapeLogic.scrapeNews>;
const mockScrapeStocks = scrapeLogic.scrapeStocks as jest.MockedFunction<typeof scrapeLogic.scrapeStocks>;
const mockScrapeInvestments = scrapeLogic.scrapeInvestments as jest.MockedFunction<typeof scrapeLogic.scrapeInvestments>;

describe("GET /", () => {
    it("returns welcome message", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toContain("WELCOME");
    });
});

describe("GET /inflation", () => {
    it("returns 200 with inflation data shape", async () => {
        mockScrapeInflation.mockResolvedValueOnce({
            message: "Inflation Rate in the Philippines",
            data: [{ date: "2024-01-01", month: "Jan", rate: "3.2%", prevRate: "3.1%" }],
            source: "Philippine Statistics Authority",
        });

        const res = await request(app).get("/inflation");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("source");
    });

    it("returns 500 when scraper throws", async () => {
        mockScrapeInflation.mockRejectedValueOnce(new Error("Scrape failed"));
        const res = await request(app).get("/inflation");
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("error");
    });
});

describe("GET /news", () => {
    it("returns 200 with newsList array", async () => {
        mockScrapeNews.mockResolvedValueOnce({
            newsList: [{ title: "Test", link: "https://example.com", image: "img.jpg" }],
        });

        const res = await request(app).get("/news");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("newsList");
        expect(Array.isArray(res.body.newsList)).toBe(true);
    });

    it("returns 500 when scraper throws", async () => {
        mockScrapeNews.mockRejectedValueOnce(new Error("Scrape failed"));
        const res = await request(app).get("/news");
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("error");
    });
});

describe("GET /stocks", () => {
    it("returns 200 with trendingStocks and marketMovers", async () => {
        mockScrapeStocks.mockResolvedValueOnce({
            trendingStocks: [],
            marketMovers: [],
        });

        const res = await request(app).get("/stocks");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("trendingStocks");
        expect(res.body).toHaveProperty("marketMovers");
    });

    it("returns 500 when scraper throws", async () => {
        mockScrapeStocks.mockRejectedValueOnce(new Error("Scrape failed"));
        const res = await request(app).get("/stocks");
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("error");
    });
});

describe("GET /investment", () => {
    it("returns 200 with investment data", async () => {
        mockScrapeInvestments.mockResolvedValueOnce({
            data: {
                totalInvestment: "₱100,000",
                savingsAccount: "₱105,000",
                timeDeposit: "₱107,000",
                lowRiskFund: "₱115,000",
                moderateRiskFund: "₱130,000",
                aggressiveRiskFund: "₱150,000",
            },
        });

        const res = await request(app)
            .get("/investment")
            .query({ initialDeposit: "10000", period: "12", subsequentDeposit: "1000", targetYear: "2030" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("totalInvestment");
    });

    it("returns 500 when scraper throws", async () => {
        mockScrapeInvestments.mockRejectedValueOnce(new Error("Scrape failed"));
        const res = await request(app).get("/investment");
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("error");
    });
});
