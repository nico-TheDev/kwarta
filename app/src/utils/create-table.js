function futureValue(rate = 0, nper = 0, pmt = 0, pv = 0, type = 0) {
    var result;
    if (rate != 0.0) {
        result = -pv * Math.pow(1 + rate, nper) - (pmt * (1 + rate * type) * (Math.pow(1 + rate, nper) - 1)) / rate;
    } else {
        result = -pv - pmt * nper;
    }
    return result;
} //Output table of investment value
export default function calculateTable(
    initial_investment,
    monthly_contribution,
    years_to_grow,
    rate_of_return,
    currency,
    chartType,
    period
) {
    initial_investment = parseFloat(initial_investment);

    var year_array = [];
    var initial_investment_array = [];
    var total_contributions_array = [];
    var total_interest_earned_array = [];

    var year,
        dataset = [],
        begin_balance,
        yearly_contribution,
        total_contributions,
        interest_earned,
        total_interest_earned,
        end_balance;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear() - 1;
    yearly_contribution = monthly_contribution * period;

    for (let i = 1; i <= years_to_grow; i++) {
        year = currentYear + i;
        year_array.push(year);
        initial_investment_array.push(initial_investment);

        if (i == 1) {
            begin_balance = initial_investment;
        } else {
            begin_balance = futureValue(
                rate_of_return / 100 / period,
                (i - 1) * period,
                -monthly_contribution,
                -initial_investment,
                0
            );
        }
        total_contributions = yearly_contribution * i;
        end_balance = futureValue(
            rate_of_return / 100 / period,
            i * period,
            -monthly_contribution,
            -initial_investment,
            0
        );
        total_interest_earned = end_balance - initial_investment - total_contributions;
        interest_earned = end_balance - begin_balance - yearly_contribution;

        total_contributions_array.push(total_contributions);
        total_interest_earned_array.push(total_interest_earned);

        begin_balance = Math.round(begin_balance).toLocaleString('en');
        end_balance = Math.round(end_balance).toLocaleString('en');
        total_interest_earned = Math.round(total_interest_earned).toLocaleString('en');
        interest_earned = Math.round(interest_earned).toLocaleString('en');

        dataset.push({
            year,
            begin_balance,
            yearly_contribution: yearly_contribution.toLocaleString('en'),
            total_contributions,
            interest_earned,
            total_interest_earned,
            end_balance
        });
    }

    return dataset;

    // all_array = [initial_investment, total_contributions, total_interest_earned_array.at(-1)];

    // if (window.myChart instanceof Chart) {
    //     window.myChart.destroy();
    // }

    // updateChart(
    //     chartType,
    //     year_array,
    //     initial_investment_array,
    //     total_contributions_array,
    //     total_interest_earned_array,
    //     all_array
    // );
}
