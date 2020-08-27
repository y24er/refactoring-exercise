function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    thisAmount = calculateAmount(play, thisAmount, perf);
    let thisCredit = 0;
    thisCredit = calculateCredit(perf, play);
    result += ` ${play.name}: ${format(thisAmount)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
    volumeCredits += thisCredit;
  }
  result += `Amount owed is ${format(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
function format(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount/100);
}

function calculateCredit(perf, play) {
  let thisCredit = 0;
  thisCredit += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type)
    thisCredit += Math.floor(perf.audience / 5);
  return thisCredit;
}

function calculateAmount(play, thisAmount, perf) {
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

