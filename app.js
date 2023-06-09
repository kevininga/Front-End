window.onload = function () {
  document.getElementById('addPlayerForm').addEventListener('submit', addPlayer);
  document.getElementById('updatePlayerForm').addEventListener('submit', updatePlayer);
  document.getElementById('deletePlayerForm').addEventListener('submit', deletePlayer);
  getPlayers();
};

async function getPlayers() {
  try {
    const response = await fetch('https://premier-league.herokuapp.com/api/players');
    const data = await response.json();
    
    let groupedData = data.reduce((groups, player) => {
      const teamName = player.team.name;
      if (!groups[teamName]) {
        groups[teamName] = [];
      }
      groups[teamName].push(player);
      return groups;
    }, {});

    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';

    for (const team in groupedData) {
      const teamDiv = document.createElement('div');
      teamDiv.classList.add('team');
      
      const teamTitle = document.createElement('h2');
      teamTitle.textContent = team;
      teamTitle.onclick = function() {
        const playersList = this.nextElementSibling;
        playersList.style.display = playersList.style.display === 'block' ? 'none' : 'block';
      };
      teamDiv.appendChild(teamTitle);

      const playersList = document.createElement('div');
      playersList.style.display = 'none';

      for (const player of groupedData[team]) {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `Name: ${player.name}, Age: ${player.age}, Number: ${player.number}, Position: ${player.position}`;
        playersList.appendChild(playerDiv);
      }

      teamDiv.appendChild(playersList);
      playersDiv.appendChild(teamDiv);
    }
  } catch (err) {
    console.error(err);
  }
}



async function addPlayer(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const number = document.getElementById('number').value;
  const position = document.getElementById('position').value;
  const teamName = document.getElementById('teamName').value;

  const newPlayer = {
    name,
    age,
    number,
    position,
    team: { name: teamName }
  };

  try {
    const response = await fetch('https://premier-league.herokuapp.com/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });

    const data = await response.json();
    console.log(data);

    // Reset form and refresh players list
    document.getElementById('addPlayerForm').reset();
    getPlayers();
  } catch (err) {
    console.error(err);
  }
}

async function updatePlayer(event) {
  event.preventDefault();
  const id = document.getElementById('updateId').value;
  const name = document.getElementById('updateName').value;
  const age = document.getElementById('updateAge').value;
  const number = document.getElementById('updateNumber').value;
  const position = document.getElementById('updatePosition').value;
  const teamName = document.getElementById('updateTeamName').value;
  const updatedPlayer = {
    name,
    age,
    number,
    position,
    team: { name: teamName },
  };

  try {
    const response = await fetch(`https://premier-league.herokuapp.com/api/players/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('updatePlayerForm').reset();
    getPlayers();
  } catch (err) {
    console.error(err);
  }
}

async function deletePlayer(event) {
  event.preventDefault();
  const id = document.getElementById('deleteId').value;
  try {
    const response = await fetch(`https://premier-league.herokuapp.com/api/players/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    document.getElementById('deletePlayerForm').reset();
    getPlayers();
  } catch (err) {
    console.error(err);
  }
}