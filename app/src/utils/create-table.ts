interface TableRow {
    year: number;
    begin_balance: string;
    yearly_contribution: string;
    total_contributions: number;
    interest_earned: string;
    total_interest_earned: string;
    end_balance: string;
}

function futureValue(rate = 0, nper = 0, pmt = 0, pv = 0, type = 0): number {
    if (rate !== 0) {
        return -pv * Math.pow(1 + rate, nper) - (pmt * (1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate;
    }
    return -pv - pmt * nper;
}

export default function calculateTable(
    initial_investment: number | string,
    monthly_contribution: number,
    years_to_grow: number,
    rate_of_return: number,
    currency: string,
    chartType: string,
    period: number
): TableRow[] {
    const initialInvestment = parseFloat(String(initial_investment));
    const yearlyContribution = monthly_contribution * period;
    const currentYear = new Date().getFullYear() - 1;
    const dataset: TableRow[] = [];

    for (let i = 1; i <= years_to_grow; i++) {
        const year = currentYear + i;
        const begin_balance =
            i === 1
                ? initialInvestment
                : futureValue(rate_of_return / 100 / period, (i - 1) * period, -monthly_contribution, -initialInvestment, 0);

        const end_balance = futureValue(rate_of_return / 100 / period, i * period, -monthly_contribution, -initialInvestment, 0);
        const total_contributions = yearlyContribution * i;
        const total_interest_earned = end_balance - initialInvestment - total_contributions;
        const interest_earned = end_balance - begin_balance - yearlyContribution;

        dataset.push({
            year,
            begin_balance: Math.round(begin_balance).toLocaleString('en'),
            yearly_contribution: yearlyContribution.toLocaleString('en'),
            total_contributions,
            interest_earned: Math.round(interest_earned).toLocaleString('en'),
            total_interest_earned: Math.round(total_interest_earned).toLocaleString('en'),
            end_balance: Math.round(end_balance).toLocaleString('en'),
        });
    }

    return dataset;
}
