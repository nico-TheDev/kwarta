const puppeteer = require('puppeteer');

async function scrapeLogic(res) {
    // Launch the browser
    const browser = await puppeteer.launch({
        devtools: false,
        headless: true,
        defaultViewport: false,
        args: ['--no-sandbox']
    });
    try {
        // Create a page
        const page = await browser.newPage();

        // Go to your site
        await page.goto('https://ph.investing.com/equities/trending-stocks', { waitUntil: 'load', timeout: 0 });

        const trendingStocks = await page.evaluate(() =>
            Array.from(document.querySelectorAll('div.chartPopWrap  .marketChart'), (e) => {
                return {
                    id: e.parentElement.getAttribute('id'),
                    company: e.querySelector('a:first-child').textContent,
                    link: 'https://ph.investing.com' + e.querySelector('a').getAttribute('href'),
                    price: e.querySelector('a:first-child + div :first-child').textContent,
                    priceIncrease: e.querySelector('a:first-child + div :nth-child(2)').textContent,
                    pricePercentage: e.querySelector('a:first-child + div :nth-child(3)').textContent
                };
            })
        );

        const marketMovers = await page.evaluate(() =>
            Array.from(document.querySelectorAll('table#MM_table1 tbody tr'), (e) => {
                return {
                    company: e.querySelector('td:nth-child(2) a').textContent,
                    link: 'https://ph.investing.com' + e.querySelector('a').getAttribute('href'),
                    price: e.querySelector('td:nth-child(3)').textContent,
                    pricePercentage: e.querySelector('td:nth-child(4)').textContent,
                    volume: e.querySelector('td:nth-child(5)').textContent
                };
            })
        );

        await page.goto('https://edge.pse.com.ph/');

        const indexSummary = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.index > table:nth-child(2) > tbody:nth-child(3) > tr'), (e) => {
                return {
                    label: e.querySelector('td.label').textContent,
                    price: e.querySelector('td:nth-child(2)').textContent,
                    priceChange: e.querySelector('td:nth-child(3)').textContent.trim(),
                    pricePercentage: e.querySelector('td:nth-child(4)').textContent.trim()
                };
            })
        );

        // await page.goto('https://www.pse.com.ph/indices-composition/', { waitUntil: 'domcontentloaded', timeout: 0 });
        // const element = await page.$('#dropdownMenuButton');
        // await element.click();
        // const elementTwo = await page.$('a#pse-diy');
        // await elementTwo.click();
        // // await page.click('#dropdownMenuButton');
        // // await page.click('a#pse-diy');

        // const topDivStocks = await page.evaluate(() =>
        //     Array.from(document.querySelectorAll('table#data tbody#index-body tr'), (e) => {
        //         return {
        //             id: e.querySelector('td.index-count').textContent,
        //             company: e.querySelector('td.index-name').textContent,
        //             symbol: e.querySelector('td.index-symbol a').textContent,
        //             link: e.querySelector('td.index-symbol a').getAttribute('href'),
        //             price: e.querySelector('td.text-price').textContent,
        //             shares: e.querySelector('td.text-shares').textContent
        //         };
        //     })
        // );

        // Close browser.
        res.status(300).json({
            trendingStocks,
            marketMovers,
            indexSummary
            // topDivStocks
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    } finally {
        // await browser.close();
    }
}

export default function handler(req, res) {
    scrapeLogic(res);
}
