const test = require('ava');
const { statement, statementHtml } = require('../src/statement');

test('test1 one performances is tragedy and audience is 30', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 30
      }
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    }
  };
  const result = statement(invoice, plays);
  t.is(result, 'Statement for SmallCo\n' +
    ' Hamlet: $400.00 (30 seats)\n' +
    'Amount owed is $400.00\n' +
    'You earned 0 credits \n')
})

test('test2 one performances is tragedy and audience is 31', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
      {
        'playID': 'hamlet',
        'audience': 31
      }
    ]
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    }
  };
  const result = statement(invoice, plays);
  t.is(result, 'Statement for SmallCo\n' +
    ' Hamlet: $410.00 (31 seats)\n' +
    'Amount owed is $410.00\n' +
    'You earned 1 credits \n')
})

test('test3 one performances hamlet audience is 20', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 20
      }
    ]
  };
  const plays = {
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    }
  };
  const result = statement(invoice, plays);
  t.is(result, 'Statement for SmallCo\n' +
    ' As You Like It: $360.00 (20 seats)\n' +
    'Amount owed is $360.00\n' +
    'You earned 4 credits \n')
})

test('test4 one performances hamlet audience is 21', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 21
      }
    ]
  };
  const plays = {
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    }
  };
  const result = statement(invoice, plays);
  t.is(result, 'Statement for SmallCo\n' +
    ' As You Like It: $468.00 (21 seats)\n' +
    'Amount owed is $468.00\n' +
    'You earned 4 credits \n')
})

test('test5 throw error unknown type', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
      {
        'playID': 'as-like',
        'audience': 21
      }
    ]
  };
  const plays = {
    'as-like': {
      'name': 'As You Like It',
      'type': 'happy',
    }
  };
  t.throws(() => statement(invoice, plays), "unknown type: happy");
})

test('test6 none performances', t => {
  //given
  const invoice = {
    'customer': 'SmallCo',
    'performances': [
    ]
  };
  const plays = {

  };
  const result = statement(invoice, plays);
  t.is(result, 'Statement for SmallCo\n' +
    'Amount owed is $0.00\n' +
    'You earned 0 credits \n');
})

test('test7 Customer BigCo has three performances. ' +
  'Hamlet has 55 audiences. ' +
  'As You Like Is has 35 audiences. ' +
  'Othello has 40 audiences.', t => {
    //given
    const invoice = {
      'customer': 'BigCo',
      'performances': [
        {
          'playID': 'hamlet',
          'audience': 55,
        },
        {
          'playID': 'as-like',
          'audience': 35,
        },
        {
          'playID': 'othello',
          'audience': 40,
        },
      ],
    };


    const plays = {
      'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
      },
      'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
      },
      'othello': {
        'name': 'Othello',
        'type': 'tragedy',
      },
    };
    const result = statement(invoice, plays);
    t.is(result, 'Statement for BigCo\n' +
      ' Hamlet: $650.00 (55 seats)\n' +
      ' As You Like It: $580.00 (35 seats)\n' +
      ' Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits \n');
  });

test('test8 Customer BigCo has three performances. ' +
  'Hamlet has 55 audiences. ' +
  'As You Like Is has 35 audiences. ' +
  'Othello has 40 audiences.', t => {
    //given
    const invoice = {
      'customer': 'BigCo',
      'performances': [
        {
          'playID': 'hamlet',
          'audience': 55,
        },
        {
          'playID': 'as-like',
          'audience': 35,
        },
        {
          'playID': 'othello',
          'audience': 40,
        },
      ],
    };


    const plays = {
      'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
      },
      'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
      },
      'othello': {
        'name': 'Othello',
        'type': 'tragedy',
      },
    };
    const result = statementHtml(invoice, plays);
    t.is(result, '<h1>Statement for BigCo</h1>\n' +
      '<table>\n' +
      '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
      ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
      ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
      ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
      '</table>\n' +
      '<p>Amount owed is <em>$1,730.00</em></p>\n' +
      '<p>You earned <em>47</em> credits</p>\n');

  });