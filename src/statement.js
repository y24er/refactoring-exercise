function statement(invoice, plays) {
  let data = getData(invoice,plays);
  let result = printText(data);
  return result;
}

function statementHtml(invoice, plays) {
  let data = getData(invoice,plays);
  let result = printHtml(data);
  return result;
}

module.exports = {
  statement,
  statementHtml,
};

function getData(invoice,plays){
  let totalAmount = calculateTotalAmount(invoice, plays);
  let volumeCredits = calculateColumeCredits(invoice, plays);
  return {totalAmount,volumeCredits,invoice,plays};
}

function printHtml(data) {
  let result = `<h1>Statement for ${data.invoice.customer}</h1>\n` +
    '<table>\n' +
    '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  for (let performance of data.invoice.performances) {
    const play = data.plays[performance.playID];
    let thisAmount = calculateAmount(play, performance);
    result += ` <tr><td>${play.name}</td><td>${performance.audience}</td><td>${format(thisAmount)}</td></tr>\n`;
  }
  result += `</table>\n<p>Amount owed is <em>${format(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.volumeCredits}</em> credits</p>\n`;
  return result;
}

function calculateTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = calculateAmount(play, performance);
    totalAmount += thisAmount;
  }
  return totalAmount;
}

function calculateColumeCredits(invoice, plays) {
  let columeCredits = 0;
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisCredit = calculateCredit(performance, play);
    columeCredits += thisCredit;
  }
  return columeCredits;
}

function printText(data) {
  let result = `Statement for ${data.invoice.customer}\n`;
  for (let performance of data.invoice.performances) {
    const play = data.plays[performance.playID];
    let thisAmount = calculateAmount(play, performance);
    result += ` ${play.name}: ${format(thisAmount)} (${performance.audience} seats)\n`;
  }
  result += `Amount owed is ${format(data.totalAmount)}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
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

function calculateAmount(play, performance) {
  let thisAmount = 0;
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

