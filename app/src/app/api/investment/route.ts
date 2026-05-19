import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const initialDeposit = searchParams.get('initialDeposit') ?? '';
    const period = searchParams.get('period') ?? '';
    const subsequentDeposit = searchParams.get('subsequentDeposit') ?? '';
    const targetYear = searchParams.get('targetYear') ?? '';

    const browser = await puppeteer.launch({ devtools: false, args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('https://online.sunlife.com.ph/cdt/eCalcAge/investmentCalculator', { waitUntil: 'load' });

        await page.type('pierce/input[name="initialDeposit"]', initialDeposit);
        await page.select('pierce/select[name="period"]', period);
        await page.type('pierce/input[name="subsequentDeposit"]', subsequentDeposit);
        await page.select('pierce/select[name="year"]', targetYear);

        const resultBtn = await page.waitForSelector('pierce/.cal-result-btn button');
        await resultBtn!.click();
        await page.waitForSelector('pierce/.totat-investment');

        const totalInvestmentNode = await page.$('pierce/.totat-investment .amount');
        const totalInvestment = await page.evaluate((div) => (div as HTMLElement).textContent ?? '', totalInvestmentNode);

        const dataNode = await page.$('pierce/.projected-value ul');
        const finalData = await page.evaluate((e) => {
            const el = e as HTMLElement;
            return {
                savingsAccount: (el.querySelector('li:first-child .amount') as HTMLElement).innerText,
                timeDeposit: (el.querySelector('li:nth-child(2) .amount') as HTMLElement).innerText,
                lowRiskFund: (el.querySelector('li:nth-child(3) .amount') as HTMLElement).innerText,
                moderateRiskFund: (el.querySelector('li:nth-child(4) .amount') as HTMLElement).innerText,
                aggressiveRiskFund: (el.querySelector('li:nth-child(5) .amount') as HTMLElement).innerText,
            };
        }, dataNode);

        return NextResponse.json({ data: { totalInvestment, ...finalData } }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    } finally {
        await browser.close();
    }
}
