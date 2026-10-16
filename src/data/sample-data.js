import { v4 as uuidv4 } from 'uuid';

import premadeCategories from 'data/categories';
import { ICON_NAMES } from 'constants/constant';

// SAMPLE DATA FOR THE DEMO (FEATURE 26): SIX MONTHS OF A FILIPINO EMPLOYEE'S MONEY, ENDING TODAY
const MONTHS_OF_HISTORY = 6;

const { ACCOUNT_ICONS, CATEGORY_ICONS } = ICON_NAMES;

const SAMPLE_ACCOUNTS = [
    {
        key: 'bpi',
        account_name: 'BPI Payroll',
        account_type: 'savings-1',
        account_icon: ACCOUNT_ICONS.BPI,
        account_color: '#b11116',
        account_description: 'Salary lands here every 15th and 30th',
        opening: 45000
    },
    {
        key: 'bdo',
        account_name: 'BDO Savings',
        account_type: 'savings-1',
        account_icon: ACCOUNT_ICONS.BDO,
        account_color: '#0033a0',
        account_description: 'Emergency fund, do not touch',
        opening: 120000
    },
    {
        key: 'gcash',
        account_name: 'GCash',
        account_type: 'e-wallet',
        account_icon: ACCOUNT_ICONS.GCASH,
        account_color: '#007dfe',
        account_description: 'Bills and everyday spending',
        opening: 8000
    },
    {
        key: 'maya',
        account_name: 'Maya',
        account_type: 'e-wallet',
        account_icon: ACCOUNT_ICONS.PAYMAYA,
        account_color: '#00b464',
        account_description: 'Online shopping and subscriptions',
        opening: 3500
    },
    {
        key: 'cash',
        account_name: 'Cash on Hand',
        account_type: 'cash-on-hand',
        account_icon: ACCOUNT_ICONS.WALLET,
        account_color: '#4caf50',
        account_description: 'Wallet cash for commute and food',
        opening: 4000
    },
    {
        key: 'col',
        account_name: 'COL Financial',
        account_type: 'investments',
        account_icon: ACCOUNT_ICONS.MONETIZATION,
        account_color: '#ff9800',
        account_description: 'Stock market account',
        opening: 25000
    }
];

const CUSTOM_CATEGORIES = [
    {
        category_name: 'Coffee and Snacks',
        category_type: 'expense',
        expense_type: 'wants',
        category_icon: CATEGORY_ICONS.COOKIE,
        category_color: '#6d4c41'
    },
    {
        category_name: 'Grab and Angkas',
        category_type: 'expense',
        expense_type: 'needs',
        category_icon: CATEGORY_ICONS.TAXI,
        category_color: '#00b14f'
    },
    {
        category_name: 'Online Selling',
        category_type: 'income',
        expense_type: '',
        category_icon: CATEGORY_ICONS.SHOP,
        category_color: '#ec407a'
    }
];

// SEEDED RANDOM NUMBERS SO EVERY LOAD LOOKS THE SAME FOR THE SAME DAY
const createRandom = (seed) => {
    let state = seed;
    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
};

const roundMoney = (value) => Math.round(value * 100) / 100;

// SAME FORMAT AS utils/format-date: M/D/YYYY
const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

const findPremade = (name) => premadeCategories.find((category) => category.category_name === name);

export function buildSampleData(userId, now = new Date()) {
    const random = createRandom(now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate());
    const between = (min, max, step = 5) => Math.round((min + random() * (max - min)) / step) * step;
    const pick = (list) => list[Math.floor(random() * list.length)];

    const categories = CUSTOM_CATEGORIES.map((category, i) => ({
        ...category,
        id: uuidv4(),
        user_id: userId,
        timestamp: new Date(now.getFullYear(), now.getMonth() - MONTHS_OF_HISTORY, 1 + i).toISOString()
    }));

    const categoryByName = (name) => {
        const category = findPremade(name) || categories.find((item) => item.category_name === name);
        return { ...category, user_id: userId };
    };

    // EVERY MONEY MOVEMENT AS A PLAIN EVENT, TURNED INTO DOCS ONCE THE BALANCES ARE KNOWN
    const events = [];
    const addTransaction = (date, type, categoryName, account, amount, comments) =>
        events.push({ kind: 'transaction', date, type, categoryName, account, amount, comments });
    const addTransfer = (date, from, to, amount, comments) =>
        events.push({ kind: 'transfer', date, from, to, amount, comments });

    for (let monthsAgo = MONTHS_OF_HISTORY - 1; monthsAgo >= 0; monthsAgo--) {
        const year = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1).getFullYear();
        const month = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1).getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const on = (day) => new Date(year, month, Math.min(day, lastDay), 8 + Math.floor(random() * 12), between(0, 55));

        // INCOME
        addTransaction(on(15), 'income', 'Full-Time Job', 'bpi', 23500, 'Salary, first half');
        addTransaction(on(30), 'income', 'Full-Time Job', 'bpi', 23500, 'Salary, second half');
        addTransaction(on(30), 'income', 'Collect Interest', 'bdo', roundMoney(40 + random() * 50), 'Monthly interest');
        if (monthsAgo % 2 === 0) {
            const project = pick(['Logo design project', 'Website bug fixes', 'Social media graphics']);
            addTransaction(on(20), 'income', 'Freelance Job', 'gcash', between(6000, 12000, 500), project);
        }
        if (monthsAgo % 3 !== 1) {
            addTransaction(on(8), 'income', 'Online Selling', 'maya', between(1500, 4000, 50), 'Pre-loved items sold');
        }

        // BILLS AND FIXED COSTS
        addTransaction(on(5), 'expense', 'Rentals', 'bpi', 9500, 'Condo rent');
        addTransaction(on(3), 'expense', 'Streaming Service', 'maya', 549, 'Netflix');
        addTransaction(on(10), 'expense', 'Fitness', 'bpi', 1500, 'Gym membership');
        addTransaction(on(12), 'expense', 'Electricity Bill', 'gcash', between(2400, 3600, 10), 'Meralco');
        addTransaction(on(12), 'expense', 'Water Bill', 'gcash', between(380, 620, 10), 'Maynilad');
        addTransaction(on(18), 'expense', 'Internet Bill', 'bpi', 1699, 'PLDT Fiber');
        addTransaction(on(18), 'expense', 'Phone Bill', 'gcash', 999, 'Globe postpaid');

        // EVERYDAY SPENDING
        addTransaction(on(6), 'expense', 'Food and Beverage', 'bpi', between(1800, 3200, 10), 'Groceries at Puregold');
        addTransaction(on(21), 'expense', 'Food and Beverage', 'bpi', between(1800, 3200, 10), 'Groceries at SM Supermarket');
        const meals = ['Jollibee lunch', 'Palengke run', 'Mang Inasal with officemates', 'Bakery pandesal', 'Samgyup night', '7-Eleven snacks', 'Carinderia lunch'];
        [2, 4, 9, 11, 14, 17, 23, 26, 28].forEach((day, i) => {
            addTransaction(on(day), 'expense', 'Food and Beverage', i % 2 ? 'gcash' : 'cash', between(120, 950, 5), pick(meals));
        });
        const commutes = ['Jeep and MRT', 'Bus to Ortigas', 'Tricycle', 'P2P bus', 'Jeep fare'];
        [1, 4, 7, 11, 14, 19, 22, 27].forEach((day) => {
            addTransaction(on(day), 'expense', 'Transportation', 'cash', between(50, 380, 5), pick(commutes));
        });
        [9, 16, 25].forEach((day) => {
            addTransaction(on(day), 'expense', 'Grab and Angkas', 'gcash', between(180, 420, 5), pick(['Grab home', 'Angkas to work']));
        });
        [3, 10, 17, 24].forEach((day, i) => {
            const account = i % 2 ? 'maya' : 'gcash';
            addTransaction(on(day), 'expense', 'Coffee and Snacks', account, between(140, 260, 5), pick(['Starbucks', 'Milk tea', 'Kape at pandesal']));
        });
        addTransaction(on(13), 'expense', 'Personal Items', 'maya', between(400, 1800, 10), 'Shopee haul');

        // ONE OFFS SO THE MONTHS LOOK DIFFERENT
        if (monthsAgo === 4) addTransaction(on(22), 'expense', 'Medical Check-up', 'bpi', 1200, 'Annual physical exam');
        if (monthsAgo === 3) addTransaction(on(24), 'expense', 'Home Maintenance', 'bpi', 850, 'Aircon cleaning');
        if (monthsAgo === 2) addTransaction(on(19), 'expense', 'Gifts', 'gcash', 1500, 'Birthday gift for Mama');
        if (monthsAgo === 1) addTransaction(on(26), 'expense', 'Fun Money', 'bpi', 2500, 'Weekend trip to Tagaytay');
        if (monthsAgo === 0) addTransaction(on(7), 'expense', 'Pets', 'gcash', 1100, 'Vet visit for Mochi');

        // SAVINGS AND INVESTMENTS
        addTransaction(on(16), 'savings', 'Savings Account', 'bpi', 3000, 'Pay yourself first');
        if (monthsAgo === 3) addTransaction(on(2), 'savings', 'Time-Deposit', 'bdo', 20000, '6 month time deposit');
        addTransaction(on(17), 'investments', 'Stocks', 'col', 2500, 'Peso cost averaging');
        addTransaction(on(20), 'investments', 'Investment Funds', 'bpi', 2000, 'UITF top up');

        // TRANSFERS
        addTransfer(on(1), 'bpi', 'cash', 4000, 'ATM withdrawal');
        addTransfer(on(15), 'bpi', 'gcash', 6000, 'Cash in for bills');
        addTransfer(on(16), 'bpi', 'col', 3000, 'Fund stocks account');
        addTransfer(on(30), 'bpi', 'bdo', 8000, 'Emergency fund');
        if (monthsAgo % 2 === 1) addTransfer(on(2), 'gcash', 'maya', 1000, 'Top up for subscriptions');
    }

    // REPLAY THE EVENTS IN ORDER WITH THE APP'S OWN BALANCE RULES, SKIPPING ANY THE ACCOUNT CAN'T COVER
    const balances = {};
    const lastUsed = {};
    SAMPLE_ACCOUNTS.forEach((account) => {
        balances[account.key] = account.opening;
    });

    const keptEvents = events
        .filter((event) => event.date <= now)
        .sort((a, b) => a.date - b.date)
        .filter((event) => {
            if (event.kind === 'transfer') {
                if (balances[event.from] < event.amount) return false;
                balances[event.from] = roundMoney(balances[event.from] - event.amount);
                balances[event.to] = roundMoney(balances[event.to] + event.amount);
                lastUsed[event.from] = event.date;
                lastUsed[event.to] = event.date;
                return true;
            }
            if (event.type === 'income') {
                balances[event.account] = roundMoney(balances[event.account] + event.amount);
            } else {
                // SAME CHECK AS createTransaction: THE BALANCE MUST BE GREATER THAN THE AMOUNT
                if (!(balances[event.account] > event.amount)) return false;
                balances[event.account] = roundMoney(balances[event.account] - event.amount);
            }
            lastUsed[event.account] = event.date;
            return true;
        });

    const accountDocs = {};
    SAMPLE_ACCOUNTS.forEach(({ key, opening, ...account }) => {
        accountDocs[key] = {
            ...account,
            id: uuidv4(),
            user_id: userId,
            account_amount: balances[key],
            timestamp: (lastUsed[key] || now).toISOString()
        };
    });

    const transactions = [];
    const transfers = [];
    keptEvents.forEach((event) => {
        const base = {
            id: uuidv4(),
            user_id: userId,
            amount: event.amount,
            comments: event.comments,
            date: formatDate(event.date),
            timestamp: event.date.toISOString(),
            photoRef: '',
            photoUrl: ''
        };
        if (event.kind === 'transfer') {
            transfers.push({
                ...base,
                targetSenderAccount: accountDocs[event.from],
                targetReceiverAccount: accountDocs[event.to]
            });
        } else {
            transactions.push({
                ...base,
                type: event.type,
                category: categoryByName(event.categoryName),
                targetAccount: accountDocs[event.account]
            });
        }
    });

    return {
        accounts: Object.values(accountDocs),
        categories,
        transactions,
        transfers
    };
}
