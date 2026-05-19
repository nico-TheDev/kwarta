import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
    try {
        const page = await browser.newPage();
        await page.goto('https://ph.investing.com/news/most-popular-news', { timeout: 0, waitUntil: 'load' });
        await page.waitForSelector('div.largeTitle .articleItem');

        const newsList = await page.evaluate(() =>
            Array.from(document.querySelectorAll('div.largeTitle .articleItem'), (e) => ({
                title: e.querySelector('.textDiv a.title')!.getAttribute('title') as string,
                link: 'https://ph.investing.com' + e.querySelector('.textDiv a.title')!.getAttribute('href'),
                image: e.querySelector('a.img img')!.getAttribute('src') as string,
                details: e.querySelector('span.articleDetails .date')?.innerHTML ?? null,
                summary: e.querySelector('.textDiv p')?.innerHTML ?? null,
            }))
        );

        return NextResponse.json({ newsList: newsList.slice(0, 8) }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    } finally {
        await browser.close();
    }
}
