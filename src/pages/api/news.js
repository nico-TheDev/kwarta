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
        await page.goto('https://ph.investing.com/news/most-popular-news', { waitUntil: 'load', timeout: 0 });

        const newsList = await page.evaluate(() =>
            Array.from(document.querySelectorAll('div.largeTitle .articleItem'), (e) => {
                return {
                    title: e.querySelector('.textDiv a.title').textContent,
                    link: 'https://ph.investing.com' + e.querySelector('.textDiv a.title').getAttribute('href'),
                    image: e.querySelector('a.img img').getAttribute('src'),
                    details: e.querySelector('span.articleDetails .date').textContent,
                    summary: e.querySelector('.textDiv p').textContent
                };
            })
        );

        // Close browser.
        res.status(300).json({
            newsList: newsList.slice(0, 8)
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
