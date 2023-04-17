const puppeteer = require('puppeteer');

async function scrapeLogic(req, res) {
    // Launch the browser
    const browser = await puppeteer.launch({ devtools: false, timeout: 0 });
    try {
        const { initialDeposit, period, subsequentDeposit, targetYear } = req.query;
        // Create a page
        const page = await browser.newPage();

        // Go to your site
        await page.goto('https://online.sunlife.com.ph/cdt/eCalcAge/investmentCalculator', {
            waitUntil: 'load'
        });

        // TYPE INTO THE INPUTS

        await page.type('pierce/input[name="initialDeposit"]', initialDeposit);
        await page.select('pierce/select[name="period"]', period);
        await page.type('pierce/input[name="subsequentDeposit"]', subsequentDeposit);
        await page.select('pierce/select[name="year"]', targetYear);

        const resultBtn = await page.waitForSelector('pierce/.cal-result-btn button');
        await resultBtn.click();
        await page.waitForSelector('pierce/.totat-investment');

        // GENERATE THE RESULT

        // total investment
        const totalInvestmentNode = await page.$('pierce/.totat-investment .amount');
        const totalInvestment = await page.evaluate((div) => div.textContent, totalInvestmentNode);
        const dataNode = await page.$('pierce/.projected-value ul');
        const finalData = await page.evaluate(
            (e) => {
                return {
                    savingsAccount: e.querySelector('li:first-child .amount').innerText,
                    timeDeposit: e.querySelector('li:nth-child(2) .amount').innerText,
                    lowRiskFund: e.querySelector('li:nth-child(3) .amount').innerText,
                    moderateRiskFund: e.querySelector('li:nth-child(4) .amount').innerText,
                    aggressiveRiskFund: e.querySelector('li:nth-child(5) .amount').innerText
                };
            },

            dataNode
        );

        // await page.screenshot({ type: 'png', fullPage: true, path: 'sample.png' });
        // Close browser.
        res.status(201).json({
            data: {
                totalInvestment,
                ...finalData
            }
        });
    } catch (err) {
        console.error(err);
        res.send(`Something Went Wrong:${err}`);
    } finally {
        await browser.close();
    }
}

export default function handler(req, res) {
    scrapeLogic(req, res);
}
