import { v4 as uuidv4 } from 'uuid';

const articles = [
    {
        articleTitle: "How to tell if your investment is doing well?",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/how-to-tell-if-your-investment-is-doing-well",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "When to pull your money out of a company's stocks?",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/when-to-pull-your-money-out-of-a-companys-stocks",
        articleImage: "/static/images/articles/stocks.jpg",
        articleTags: ["Stocks"],
        id: uuidv4(),
    },
    {
        articleTitle: "The 5 characteristics of safe haven assets",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/the-5-characteristics-of-safe-haven-assets",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "Three considerations before making a new investment during a downturn",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/three-considerations-before-making-a-new-investment-during-a-downturn",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Managing your portfolio during a recession",
        articleAuthor: "EARNEST",
        articleLink: "Managing your portfolio during a recession",
        articleImage: "/static/images/articles/stocks.jpg",
        articleTags: ["Stocks", "Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "2 signs your emergency fund needs a tune-up",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/2-signs-your-emergency-fund-needs-a-tune-up",
        articleImage: "/static/images/articles/savings.jpg",
        articleTags: ["Savings"],
        id: uuidv4(),
    },
    {
        articleTitle: "Questions to answer when picking a fixed-term investment",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/questions-to-answer-when-picking-a-fixed-term-investment",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Top tips for investing in time deposits",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/top-tips-for-investing-in-time-deposits",
        articleImage: "/static/images/articles/savings.jpg",
        articleTags: ["Savings", "Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Getting the proper investor's mindset",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/getting-the-proper-investors-mindset",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "3 questions to ask when buying a big-ticket item",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/3-questions-to-ask-when-buying-a-big-ticket-item",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "3 questions to answer before investing in real estate",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/3-questions-to-answer-before-investing-in-real-estate",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Tips for managing money when you get married",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/tips-for-managing-money-when-you-get-married",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "Tracking your net worth",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/tracking-your-net-worth",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "3 ways to reduce financial stress",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/3-ways-to-reduce-financial-stress",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "Getting good financial habits",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/getting-good-financial-habits",
        articleImage: "/static/images/articles/general.jpg",
        articleTags: ["General"],
        id: uuidv4(),
    },
    {
        articleTitle: "What to do if your investment is underperforming",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/what-to-do-if-your-investment-is-underperforming",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Things to ask when choosing an investment service",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/things-to-ask-when-choosing-an-investment-service",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "What to do when there's a bear market?",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/what-to-do-when-theres-a-bear-market",
        articleImage: "/static/images/articles/stocks.jpg",
        articleTags: ["Stocks"],
        id: uuidv4(),
    },
    {
        articleTitle: "When to do a partial withdrawal",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/when-to-do-a-partial-withdrawal",
        articleImage: "/static/images/articles/savings.jpg",
        articleTags: ["Savings", "Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Choosing between growth and income investing",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/choosing-between-growth-and-income-investing",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Avoiding emotional investing",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/avoiding-emotional-investing",
        articleImage: "/static/images/articles/investments.jpg",
        articleTags: ["Investments"],
        id: uuidv4(),
    },
    {
        articleTitle: "Bond laddering",
        articleAuthor: "EARNEST",
        articleLink: "https://earnest.ph/life/bond-laddering",
        articleImage: "/static/images/articles/bonds.jpg",
        articleTags: ["Bonds"],
        id: uuidv4(),
    },
]

export default articles;





export const accountArticles = [
    {
        id: 1,
        title: 'Test ',
        link: '',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente voluptatem nisi quasi iure. Eius, sit.'
    },
    {
        id: 2,
        title: 'Tester',
        link: '',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente voluptatem nisi quasi iure. Eius, sit.'
    },
    {
        id: 3,
        title: 'Tested',
        link: '',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente voluptatem nisi quasi iure. Eius, sit.'
    }
];