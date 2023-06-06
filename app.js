    document.addEventListener('DOMContentLoaded', (event) => {
    const playerForm = document.querySelector('#player-form');
    const playersList = document.querySelector('#players-list');
    const spinner = document.querySelector('#spinner');
    const errorMessage = document.querySelector('#error-message');
    let updatingPlayerId = null;
  
    playerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      errorMessage.classList.add('hidden');
      spinner.classList.remove('hidden');
  
      const name = document.querySelector('#player-name').value;
      const age = document.querySelector('#player-age').value;
      const url = updatingPlayerId 
        ? `http://localhost:3000/api/players/${updatingPlayerId}` 
        : 'http://localhost:3000/api/players';
      const method = updatingPlayerId ? 'PUT' : 'POST';
  
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, age })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const player = await response.json();
  
        if (updatingPlayerId) {
          const li = document.querySelector(`#player-${player.id}`);
          li.textContent = `${player.name} (${player.age})`;
          document.querySelector('#submit-button').textContent = 'Add player';
          updatingPlayerId = null;
        } else {
          playersList.appendChild(createPlayerElement(player));
        }
        
        playerForm.reset();
  
      } catch (error) {
        errorMessage.textContent = `Failed to load: ${error}`;
        errorMessage.classList.remove('hidden');
      } finally {
        spinner.classList.add('hidden');
      }
    });
  
    async function loadPlayers() {
      const response = await fetch('http://localhost:3000/api/players');
      const players = await response.json();
      for (let player of players) {
        playersList.appendChild(createPlayerElement(player));
      }
    }
  
    function createPlayerElement(player) {
      const li = document.createElement('li');
      li.setAttribute('id', `player-${player.id}`);
      li.textContent = `${player.name} (${player.age})`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        const response = await fetch(`http://localhost:3000/api/players/${player.id}`, { method: 'DELETE' });
        if (response.ok) {
            li.remove();
        } else {
          console.error(`Failed to delete player with ID ${player.id}`);
        }
      });
  
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        document.querySelector('#player-name').value = player.name;
        document.querySelector('#player-age').value = player.age;
        document.querySelector('#submit-button').textContent = 'Update player';
        updatingPlayerId = player.id;
      });
  
      li.appendChild(deleteButton);
      li.appendChild(updateButton);
      return li;
    }
  
    loadPlayers();
  });


    document.addEventListener('DOMContentLoaded', (event) => {
    const teamForm = document.querySelector('#team-form');
    const teamsList = document.querySelector('#teams-list');
    const teamSpinner = document.querySelector('#team-spinner');
    const teamErrorMessage = document.querySelector('#team-error-message');
    let updatingTeamId = null;
  
    teamForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      teamErrorMessage.classList.add('hidden');
      teamSpinner.classList.remove('hidden');
  
      const name = document.querySelector('#team-name').value;
      const url = updatingTeamId 
        ? `http://localhost:3000/api/teams/${updatingTeamId}` 
        : 'http://localhost:3000/api/teams';
      const method = updatingTeamId ? 'PUT' : 'POST';
  
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const team = await response.json();
  
        if (updatingTeamId) {
          const li = document.querySelector(`#team-${team.id}`);
          li.textContent = `${team.name}`;
          document.querySelector('#team-submit-button').textContent = 'Add team';
          updatingTeamId = null;
        } else {
          teamsList.appendChild(createTeamElement(team));
        }
        
        teamForm.reset();
  
      } catch (error) {
        teamErrorMessage.textContent = `Failed to load: ${error}`;
        teamErrorMessage.classList.remove('hidden');
      } finally {
        teamSpinner.classList.add('hidden');
      }
    });
  
    async function loadTeams() {
      const response = await fetch('http://localhost:3000/api/teams');
      const teams = await response.json();
      for (let team of teams) {
        teamsList.appendChild(createTeamElement(team));
      }
    }
  
    function createTeamElement(team) {
      const li = document.createElement('li');
      li.setAttribute('id', `team-${team.id}`);
      li.textContent = `${team.name}`;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        const response = await fetch(`http://localhost:3000/api/teams/${team.id}`, { method: 'DELETE' });
        if (response.ok) {
            li.remove();
        } else {
          console.error(`Failed to delete team with ID ${team.id}`);
        }
      });
  
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        document.querySelector('#team-name').value = team.name;
        document.querySelector('#team-submit-button').textContent = 'Update team';
        updatingTeamId = team.id;
      });
  
      li.appendChild(deleteButton);
      li.appendChild(updateButton);
      return li;
    }
  
    loadTeams();
  });

  