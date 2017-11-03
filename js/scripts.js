
window.onload = function() {
  calcPoints();
  // generateLeaderboard();
}

let players = [
  { name: 'Murray', played: '0', wins: '0', draws: '0', losses: '0', scored: '0', against: '0', points: '0' },
  { name: 'Don', played: '0', wins: '0', draws: '0', losses: '0', scored: '0', against: '0', points: '0' },
  { name: 'Frank', played: '0', wins: '0', draws: '0', losses: '0', scored: '0', against: '0', points: '0' },
  { name: 'Sam', played: '0', wins: '0', draws: '0', losses: '0', scored: '0', against: '0', points: '0' },
  { name: 'Jimmy', played: '0', wins: '0', draws: '0', losses: '0', scored: '0', against: '0', points: '0' },
];

let teams = ['Liverpool','Bort Dortmen', 'Inter','Man U', 'Mexico','Germany'];
let fixtures = [];

function generateLeaderboard() {

  var leaderboard = document.getElementById("leaderboard");

  // Clear table contents
  leaderboard.innerHTML = '';

  for(var i=0;i<players.length;i++){

    leaderboard.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + players[i].name + '</th><td>' + players[i].played + '</td><td>' + players[i].wins + '</td><td>' + players[i].draws + '</td><td>' + players[i].losses + '</td><td>' + players[i].scored + '</td><td>' + players[i].against + '</td><td>' + players[i].points + '</td></tr>');
   }
}

function calcDifference() {

  for(var i =0; i<players.length;i++){
    players[i].difference = players[i].scored - players[i].against;
  }
  console.log(players);

}

function calcPoints() {

  for(var i=0;i<players.length;i++){
    if(players[i].points === undefined) {
      players[i].points = 0;
    } else {
      if(players[i].wins) {
        var plWins = players[i].wins * 3;
        }
        if(players[i].draws) {
          var plDraws = players[i].draws * 1;
        }
        players[i].points = plWins + plDraws;
     }
  }
}

function addPlayer() {
  var newPlayer = document.getElementById('playername').value;
  players.push( { name: newPlayer, played: 0, wins: 0, draws: 0, losses: 0, scored: 0, against: 0, points: 0, } );
  var listPlayer = document.getElementById("list-player");
  listPlayer.insertAdjacentHTML('beforeend', '<li>' + newPlayer + '</li>');
  document.getElementById('playername').value = '';
}

function getRandomIndex(max) {
  return Math.floor( Math.random() * max );
}
// Function to assign teams to fixtures
function assignTeams() {
  let ply1Team = '', ply2Team = '';
  // set max value to the length of teams array
  const max = teams.length;
  // assign a random team value using random number
  // not greater than teams.length
  ply1Team = teams[getRandomIndex(max)];

  do {
    // run this code once assigning random team to player 2
    ply2Team = teams[getRandomIndex(max)];
    // check if player 1 team = player 2 team
    // if it is then re-run do block until not equal
  } while(ply1Team === ply2Team);
  // return array of player 1 team and player 2 team
  return [ply1Team, ply2Team];

}

function calcFixtures() {
  // Declare array of players
  let arrOfPlayers = [];
  fixtures = [];
  // Declare current player variable
  let currPlayer;

  if(players.length % 2 != 0) {
    let playersObj = players.length;
    players.push({name: "Dummy"});
  }

  // loop through all players within the players object
  for(let d = 0; d<players.length;d++){

    // push each player into the players array
    arrOfPlayers.push(players[d].name);
  }
  // while length of players array is greater than zero
  while(arrOfPlayers.length > 0) {
    // set the current player to first value in players array
    let currPlayer = arrOfPlayers[0]; // Murray
    // loop through each player within the players array
    for(let i=1;i<arrOfPlayers.length;i++) {
      // push the current player and each of the other players in players array
      // into the fixtures array e.g. [[murray, donnie], [murray, frank]]
      // push player1 and player2 into fixtures object for every match
      assignTeams(currPlayer, arrOfPlayers[i]);
      fixtures.push({ player1Name: currPlayer, player2Name: arrOfPlayers[i] });
      // fixtures.push({ player1Name{ name: currPlayer, team: assignTeams}, player2Name: arrOfPlayers[i] });
    }
    // remove the current player from the players array and start over
    arrOfPlayers.shift();
    // console.log(arrOfPlayers.length);
  }
  shuffleArray(fixtures);

  // loop through shuffled array of players
  // assign teams to shuffled fixtures
  for (let j=0;j<fixtures.length;j++){
    // assign return teams array to teams var
    let teams = assignTeams();
    // set new property value on fixtures array of objects
    // assigning team to player 1 & team to player 2
    fixtures[j].player1Team = teams[0];
    fixtures[j].player2Team = teams[1];
  }

  renderFixtures();
  console.log(fixtures);
}

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function renderFixtures() {
  let fixtureSelect = document.getElementById("fixtures");

  fixtureSelect.innerHTML = '';
  // console.log(fixtures);

  for(var i=0;i<fixtures.length;i++){

    if(fixtures[i].player2Name != 'Dummy') {
      fixtureSelect.insertAdjacentHTML('beforeend', '<div id="match-' + [i] + '" class="col-md-6"><div class="col-md-4 text-center"><span>' + fixtures[i].player1Name + '</span>:' + fixtures[i].player1Team + '<input type="number" /></div><div class="col-md-4 text-center"><span>VS</span></div><div class="col-md-4 text-center"><input type="number" /><span>' + fixtures[i].player2Name + '</span>:' + fixtures[i].player2Team + '</div></div>');
    }
  }
}
