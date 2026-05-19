import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
    try {
        const page = await browser.newPage();
        await page.goto('https://ph.investing.com/equities/trending-stocks', { waitUntil: 'load', timeout: 0 });

        const trendingStocks = await page.evaluate(() =>
            Array.from(document.querySelectorAll('div.chartPopWrap .marketChart'), (e) => ({
                id: e.parentElement!.getAttribute('id') as string,
                company: (e.querySelector('a:first-child') as HTMLElement).textContent as string,
                link: 'https://ph.investing.com' + e.querySelector('a')!.getAttribute('href'),
                price: (e.querySelector('a:first-child + div :first-child') as HTMLElement).textContent as string,
                priceIncrease: (e.querySelector('a:first-child + div :nth-child(2)') as HTMLElement).textContent as string,
                pricePercentage: (e.querySelector('a:first-child + div :nth-child(3)') as HTMLElement).textContent as string,
            }))
        );

        const marketMovers = await page.evaluate(() =>
            Array.from(document.querySelectorAll('table#MM_table1 tbody tr'), (e) => ({
                company: (e.querySelector('td:nth-child(2) a') as HTMLElement).textContent as string,
                link: 'https://ph.investing.com' + e.querySelector('a')!.getAttribute('href'),
                price: (e.querySelector('td:nth-child(3)') as HTMLElement).textContent as string,
                pricePercentage: (e.querySelector('td:nth-child(4)') as HTMLElement).textContent as string,
                volume: (e.querySelector('td:nth-child(5)') as HTMLElement).textContent as string,
            }))
        );

        return NextResponse.json({ trendingStocks, marketMovers }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    } finally {
        await browser.close();
    }
}
