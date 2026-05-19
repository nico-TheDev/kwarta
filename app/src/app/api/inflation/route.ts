import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function GET() {
    const browser = await puppeteer.launch({ devtools: false, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://tradingeconomics.com/philippines/inflation-cpi');

        const data = await page.evaluate(() =>
            Array.from(document.querySelectorAll('#calendar .an-estimate-row'), (e) => ({
                date: (e.querySelector('td:first-child') as HTMLElement).innerText,
                month: (e.querySelector('td:nth-child(4)') as HTMLElement).innerText,
                rate: (e.querySelector('td:nth-child(5)') as HTMLElement).innerText,
            }))
        );

        return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    } finally {
        await browser.close();
    }
}
