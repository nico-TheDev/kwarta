// SAVED MARKET DATA FOR THE DEMO (FEATURE 32): SAMPLE FIGURES, NOT LIVE QUOTES.
// SHAPES MATCH WHAT THE OLD SCRAPER ROUTES RETURNED, SO PAGES READ IT THE SAME WAY.
// PRICES SIT INSIDE A PSE BOARD LOT BAND (pages/stocks/LotTable.js) SO THE CALCULATOR ACCEPTS THEM.

const quoteLink = (ticker) => `https://www.google.com/finance/quote/${ticker}:PSE`;

const stockList = [
    { ticker: 'SM', company: 'SM Investments Corp.', sector: 'Holding Firms', price: '865.00', change: '+1.17%', dividendYield: '0.80%' },
    { ticker: 'BDO', company: 'BDO Unibank, Inc.', sector: 'Financials', price: '148.20', change: '+0.82%', dividendYield: '2.43%' },
    { ticker: 'BPI', company: 'Bank of the Philippine Islands', sector: 'Financials', price: '121.40', change: '-0.41%', dividendYield: '3.29%' },
    { ticker: 'MBT', company: 'Metropolitan Bank & Trust Co.', sector: 'Financials', price: '71.30', change: '+0.35%', dividendYield: '4.91%' },
    { ticker: 'ALI', company: 'Ayala Land, Inc.', sector: 'Property', price: '26.85', change: '-1.29%', dividendYield: '1.68%' },
    { ticker: 'SMPH', company: 'SM Prime Holdings, Inc.', sector: 'Property', price: '24.45', change: '+0.62%', dividendYield: '1.80%' },
    { ticker: 'AC', company: 'Ayala Corporation', sector: 'Holding Firms', price: '612.00', change: '+0.33%', dividendYield: '1.27%' },
    { ticker: 'AEV', company: 'Aboitiz Equity Ventures, Inc.', sector: 'Holding Firms', price: '33.70', change: '-0.59%', dividendYield: '3.56%' },
    { ticker: 'TEL', company: 'PLDT Inc.', sector: 'Services', price: '1,285.00', change: '+0.78%', dividendYield: '7.47%' },
    { ticker: 'GLO', company: 'Globe Telecom, Inc.', sector: 'Services', price: '1,842.00', change: '-0.32%', dividendYield: '5.43%' },
    { ticker: 'ICT', company: 'International Container Terminal Services, Inc.', sector: 'Services', price: '402.80', change: '+1.46%', dividendYield: '2.21%' },
    { ticker: 'JFC', company: 'Jollibee Foods Corp.', sector: 'Industrial', price: '238.60', change: '+2.05%', dividendYield: '1.38%' },
    { ticker: 'URC', company: 'Universal Robina Corp.', sector: 'Industrial', price: '88.15', change: '-0.73%', dividendYield: '4.08%' },
    { ticker: 'MER', company: 'Manila Electric Co.', sector: 'Industrial', price: '512.50', change: '+0.49%', dividendYield: '4.77%' },
    { ticker: 'DITO', company: 'DITO CME Holdings Corp.', sector: 'Services', price: '1.42', change: '-2.07%', dividendYield: '0.00%' }
].map((stock) => ({ ...stock, link: quoteLink(stock.ticker) }));

const bySymbol = (ticker) => stockList.find((stock) => stock.ticker === ticker);

// SAME FIELDS THE ph.investing.com SCRAPER PRODUCED
const trendingStocks = [
    { ticker: 'JFC', priceIncrease: '+4.80' },
    { ticker: 'ICT', priceIncrease: '+5.80' },
    { ticker: 'SM', priceIncrease: '+10.00' },
    { ticker: 'BDO', priceIncrease: '+1.20' },
    { ticker: 'TEL', priceIncrease: '+10.00' },
    { ticker: 'ALI', priceIncrease: '-0.35' }
].map(({ ticker, priceIncrease }) => {
    const stock = bySymbol(ticker);
    return {
        id: ticker,
        company: stock.company,
        link: stock.link,
        price: stock.price,
        priceIncrease,
        pricePercentage: stock.change
    };
});

const marketMovers = [
    { ticker: 'DITO', volume: '48.2M' },
    { ticker: 'SMPH', volume: '21.7M' },
    { ticker: 'ALI', volume: '18.9M' },
    { ticker: 'AEV', volume: '6.4M' },
    { ticker: 'MBT', volume: '5.1M' },
    { ticker: 'URC', volume: '3.3M' }
].map(({ ticker, volume }) => {
    const stock = bySymbol(ticker);
    return {
        company: stock.company,
        link: stock.link,
        price: stock.price,
        pricePercentage: stock.change,
        volume
    };
});

// A READING LIST OF EXPLAINERS IN PLACE OF SCRAPED HEADLINES; LINKS GO TO THE REAL SOURCES' HOME PAGES
const newsList = [
    {
        title: 'How the BSP policy rate shapes what your savings account earns',
        link: 'https://www.bsp.gov.ph/',
        image: '/static/images/articles/savings.jpg',
        details: 'Bangko Sentral ng Pilipinas',
        summary: 'Why bank interest rates move when the central bank changes its key rate.'
    },
    {
        title: 'What the PSEi measures, and why it moves every trading day',
        link: 'https://www.pse.com.ph/',
        image: '/static/images/articles/stocks.jpg',
        details: 'Philippine Stock Exchange',
        summary: 'The 30 companies behind the index and how their prices add up.'
    },
    {
        title: 'Retail Treasury Bonds: lending to the government from ₱5,000',
        link: 'https://www.treasury.gov.ph/',
        image: '/static/images/articles/bonds.jpg',
        details: 'Bureau of the Treasury',
        summary: 'How RTBs pay interest and what happens when they mature.'
    },
    {
        title: 'Peso cost averaging for first time investors',
        link: 'https://www.pseacademy.com.ph/',
        image: '/static/images/articles/investments.jpg',
        details: 'PSE Academy',
        summary: 'Investing a fixed amount on a schedule instead of timing the market.'
    },
    {
        title: 'Up to ₱1 million: how deposit insurance protects your bank account',
        link: 'https://www.pdic.gov.ph/',
        image: '/static/images/articles/general.jpg',
        details: 'PDIC',
        summary: 'What deposit insurance covers per depositor, per bank.'
    },
    {
        title: 'Dividend stocks: what Filipino investors look for',
        link: 'https://ph.investing.com/news/',
        image: '/static/images/articles/stocks.jpg',
        details: 'Investing.com Philippines',
        summary: 'Dividend yield, payout history and why a high yield can be a warning sign.'
    }
];

// LAST TWO MONTHS OF PH HEADLINE INFLATION (SAMPLE FIGURES)
const inflation = {
    current: { month: 'Sep', rate: '2.1%' },
    previous: { month: 'Aug', rate: '2.4%' }
};

export const marketSnapshot = {
    stocks: { stockList, trendingStocks, marketMovers },
    news: { newsList },
    inflation
};
