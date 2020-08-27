function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let orderContent = '';
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = 0;
    thisAmount = calculateAmount(play, thisAmount, performance);
    let thisCredit = 0;
    thisCredit = calculateCredit(performance, play);
    orderContent += printOrderLine(play, thisAmount, performance);
    totalAmount += thisAmount;
    volumeCredits += thisCredit;
  }
  let result = printResult(invoice, orderContent, totalAmount, volumeCredits);
  return result;
}

module.exports = {
  statement,
};
function printResult(invoice, orderContent, totalAmount, volumeCredits) {
  let result = `Statement for ${invoice.customer}\n`;
  result += orderContent;
  result += `Amount owed is ${format(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function printOrderLine(play, thisAmount, performance) {
  return ` ${play.name}: ${format(thisAmount)} (${performance.audience} seats)\n`;
}

function format(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

function calculateCredit(performance, play) {
  let thisCredit = 0;
  thisCredit += Math.max(performance.audience - 30, 0);
  if ('comedy' === play.type)
    thisCredit += Math.floor(performance.audience / 5);
  return thisCredit;
}

function calculateAmount(play, thisAmount, performance) {
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (performance.audience > 30) {
        thisAmount += 1000 * (performance.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (performance.audience > 20) {
        thisAmount += 10000 + 500 * (performance.audience - 20);
      }
      thisAmount += 300 * performance.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

