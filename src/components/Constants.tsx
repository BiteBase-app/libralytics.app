const Constants = {
  name: 'Libralytics',
  webname: 'libralytics',
  tld: '.app',
  mobile: '+66 1234567890',
  whatsapp: 'https://api.whatsapp.com/send/?phone=661234567890',
  sales: 'mailto:sales@libralytics.app',
};

export default Constants;

export const SEOs = {
  website: `https://${Constants.webname}+${Constants.tld}`,
  seoTitle: `${Constants.name} — Fresh restaurant & delivery intelligence data`,
  seoDesciption: `With ${Constants.name}, get GrabFood, foodpanda, ShopeeFood, Lineman intelligence data, and more! Get your competitive advantage today!`,
  seoKeywords:
    'Data Scrape, artificial intelligence, API, Data Analytics, competitive intelligence, grabfood, foodpanda, shopeefood, robinhood, lineman, delivery rider, driver, revenue, logistics',
};

export const FAQs = [
  {
    i: 1,
    q: `What is ${Constants.name}?`,
    a: `${Constants.name} is a AI chatbot service that opens new possibilities, generating images within seconds that bring your words to life.`,
  },
  {
    i: 2,
    q: 'Where can I find it?',
    a: `Available on WhatsApp currently, send hi to ${Constants.mobile}.`,
  },
  {
    i: 3,
    q: 'How does it work?',
    a: `${Constants.name} uses GPT-3 (davinci/curie) and plans to expand to
    more NLP models available in the market.`,
  },
  {
    i: 4,
    q: 'What to avoid typing?',
    a: `Due to WhatsApp policies, ${Constants.name} will not accept words associated with illegal or offensive content. For more details, please refer to our usage policy.`,
  },
  {
    i: 5,
    q: 'How much does this cost?',
    a: 'We offer 10 free trial image generations, after which we have a pocket-friendly unlimited plan for just $10 per month.',
  },
  {
    i: 6,
    q: 'How to reach you?',
    a: `You can send your queries to contact@${Constants.webname}.com to clear your doubts.`,
  },
];
