import puppeteer from "puppeteer";

const options = {
    args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--disable-site-isolation-trials",
    ],
    executablePath:
        process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
};

export interface InflationEntry {
    date: string;
    month: string;
    rate: string;
    prevRate: string;
}

export interface InflationResult {
    message: string;
    data: InflationEntry[];
    source: string;
}

export interface NewsItem {
    title: string;
    link: string;
    image: string;
}

export interface NewsResult {
    newsList: NewsItem[];
}

export interface InvestmentQuery {
    initialDeposit: string;
    period: string;
    subsequentDeposit: string;
    targetYear: string;
}

export interface InvestmentData {
    totalInvestment: string;
    savingsAccount: string;
    timeDeposit: string;
    lowRiskFund: string;
    moderateRiskFund: string;
    aggressiveRiskFund: string;
}

export interface InvestmentResult {
    data: InvestmentData;
}

export interface StockItem {
    id: string;
    company: string;
    link: string;
    price: string;
    priceIncrease: string;
    pricePercentage: string;
}

export interface MarketMover {
    company: string;
    link: string;
    price: string;
    pricePercentage: string;
    volume: string;
}

export interface StocksResult {
    trendingStocks: StockItem[];
    marketMovers: MarketMover[];
}

export async function scrapeInflation(): Promise<InflationResult> {
    const browser = await puppeteer.launch(options);
    try {
        const page = await browser.newPage();
        await page.goto("https://tradingeconomics.com/philippines/inflation-cpi");

        const data = await page.evaluate(() =>
            Array.from(document.querySelectorAll("#calendar .an-estimate-row"), (e) => ({
                date: (e.querySelector("td:first-child") as HTMLElement).innerText,
                month: (e.querySelector("td:nth-child(4)") as HTMLElement).innerText,
                rate: (e.querySelector("td:nth-child(5)") as HTMLElement).innerText,
                prevRate: (e.querySelector("td:nth-child(6)") as HTMLElement).innerText,
            }))
        );

        return {
            message: "Inflation Rate in the Philippines",
            data,
            source: "Philippine Statistics Authority",
        };
    } finally {
        await browser.close();
    }
}

export async function scrapeNews(): Promise<NewsResult> {
    const browser = await puppeteer.launch({ ...options });
    try {
        const page = await browser.newPage();
        await page.goto("https://ph.investing.com/news/most-popular-news", {
            timeout: 0,
            waitUntil: "load",
        });

        await page.waitForSelector("div.largeTitle .articleItem");

        const newsList = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".largeTitle .articleItem"), (e) => ({
                title: e.querySelector(".textDiv a.title")!.getAttribute("title") as string,
                link:
                    "https://ph.investing.com" +
                    e.querySelector(".textDiv a.title")!.getAttribute("href"),
                image: e.querySelector("a.img img")!.getAttribute("src") as string,
            }))
        );

        return { newsList: newsList.slice(0, 8) };
    } finally {
        await browser.close();
    }
}

export async function scrapeInvestments(query: InvestmentQuery): Promise<InvestmentResult> {
    const { initialDeposit, period, subsequentDeposit, targetYear } = query;
    const browser = await puppeteer.launch(options);
    try {
        const page = await browser.newPage();
        await page.goto("https://online.sunlife.com.ph/cdt/eCalcAge/investmentCalculator", {
            waitUntil: "load",
            timeout: 0,
        });

        await page.type('pierce/input[name="initialDeposit"]', initialDeposit);
        await page.select('pierce/select[name="period"]', period);
        await page.type('pierce/input[name="subsequentDeposit"]', subsequentDeposit);
        await page.select('pierce/select[name="year"]', targetYear);

        const resultBtn = await page.waitForSelector("pierce/.cal-result-btn button");
        await resultBtn!.click();
        await page.waitForSelector("pierce/.totat-investment");

        const totalInvestmentNode = await page.$("pierce/.totat-investment .amount");
        const totalInvestment = await page.evaluate(
            (div) => (div as HTMLElement).textContent ?? "",
            totalInvestmentNode
        );

        const dataNode = await page.$("pierce/.projected-value ul");
        const finalData = await page.evaluate((e) => {
            const el = e as HTMLElement;
            return {
                savingsAccount: (el.querySelector("li:first-child .amount") as HTMLElement).innerText,
                timeDeposit: (el.querySelector("li:nth-child(2) .amount") as HTMLElement).innerText,
                lowRiskFund: (el.querySelector("li:nth-child(3) .amount") as HTMLElement).innerText,
                moderateRiskFund: (el.querySelector("li:nth-child(4) .amount") as HTMLElement).innerText,
                aggressiveRiskFund: (el.querySelector("li:nth-child(5) .amount") as HTMLElement).innerText,
            };
        }, dataNode);

        return { data: { totalInvestment, ...finalData } };
    } finally {
        await browser.close();
    }
}

export async function scrapeStocks(): Promise<StocksResult> {
    const browser = await puppeteer.launch(options);
    try {
        const page = await browser.newPage();
        await page.goto("https://ph.investing.com/equities/trending-stocks", {
            waitUntil: "load",
            timeout: 0,
        });

        await page.waitForSelector("div.chartPopWrap .marketChart");

        const trendingStocks = await page.evaluate(() =>
            Array.from(document.querySelectorAll("div.chartPopWrap .marketChart"), (e) => ({
                id: e.parentElement!.getAttribute("id") as string,
                company: (e.querySelector("a:first-child") as HTMLElement).textContent as string,
                link: "https://ph.investing.com" + e.querySelector("a")!.getAttribute("href"),
                price: (e.querySelector("a:first-child + div :first-child") as HTMLElement).textContent as string,
                priceIncrease: (e.querySelector("a:first-child + div :nth-child(2)") as HTMLElement).textContent as string,
                pricePercentage: (e.querySelector("a:first-child + div :nth-child(3)") as HTMLElement).textContent as string,
            }))
        );

        const marketMovers = await page.evaluate(() =>
            Array.from(document.querySelectorAll("table#MM_table1 tbody tr"), (e) => ({
                company: (e.querySelector("td:nth-child(2) a") as HTMLElement).textContent as string,
                link: "https://ph.investing.com" + e.querySelector("a")!.getAttribute("href"),
                price: (e.querySelector("td:nth-child(3)") as HTMLElement).textContent as string,
                pricePercentage: (e.querySelector("td:nth-child(4)") as HTMLElement).textContent as string,
                volume: (e.querySelector("td:nth-child(5)") as HTMLElement).textContent as string,
            }))
        );

        return { trendingStocks, marketMovers };
    } finally {
        await browser.close();
    }
}
