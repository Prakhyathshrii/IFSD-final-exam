const readline = require('readline');

class Politician {
  constructor(name, votes, money) {
    this.name = name;
    this.votes = votes;
    this.money = money;
  }
}

class Party {
  constructor() {
    this.politicians = [];
  }

  addPolitician(politician) {
    this.politicians.push(politician);
  }

  findMaxVotesPolitician() {
    let maxVotes = 0;
    let maxVotesPolitician = null;

    for (const politician of this.politicians) {
      if (politician.votes > maxVotes) {
        maxVotes = politician.votes;
        maxVotesPolitician = politician;
      }
    }

    return maxVotesPolitician;
  }

  findMaxMoneyPolitician() {
    let maxMoney = 0;
    let maxMoneyPolitician = null;

    for (const politician of this.politicians) {
      if (politician.money > maxMoney) {
        maxMoney = politician.money;
        maxMoneyPolitician = politician;
      }
    }

    return maxMoneyPolitician;
  }
}

function getInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const party = new Party();

  // Take user input for politicians
  const numPoliticians = parseInt(await getInput('Enter the number of politicians in the party: '));
  for (let i = 1; i <= numPoliticians; i++) {
    const name = await getInput(`Enter the name of politician ${i}: `);
    const votes = parseInt(await getInput(`Enter the number of votes for ${name}: `));
    const money = parseInt(await getInput(`Enter the amount of money for ${name}: `));
    const politician = new Politician(name, votes, money);
    party.addPolitician(politician);
  }

  // Find the politician with max votes and max money
  const maxVotesPolitician = party.findMaxVotesPolitician();
  const maxMoneyPolitician = party.findMaxMoneyPolitician();

  console.log(`Politician with the maximum number of votes: ${maxVotesPolitician.name}`);
  console.log(`Politician with the maximum amount of money: ${maxMoneyPolitician.name}`);
}

// Call the main function
main();
