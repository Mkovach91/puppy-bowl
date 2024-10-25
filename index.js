const main = document.querySelector(`main`);

const teamApi = async () => {
  const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/teams`)
  const teamJson = await response.json();

  console.log(teamJson)

  const teams = teamJson.data.teams
  teams.forEach((singleteam) => {
    const teamDiv = document.createElement(`div`);
    teamDiv.classList.add(`team-container`);

    const teamName = document.createElement(`h2`)
    teamName.innerText = singleteam.name;
    teamDiv.appendChild(teamName);

    const teamRoster = document.createElement(`ul`);
    teamRoster.style.display = `none`;

    const players = singleteam.players.map((player) => {
      return `<li data-id="${player.id}">${player.name}</li>`;
    });

      teamRoster.innerHTML = players.join(``);
      teamDiv.appendChild(teamRoster);
      teamName.addEventListener(`click`, () => {
        if(teamRoster.style.display === `none`){
          teamRoster.style.display = `block`;
        } else {
          teamRoster.style.display = `none`;
        }
      });

      main.appendChild(teamDiv);
  });
}
// teamApi();


const renderAllPuppies = async () => {
  await teamApi();

  const teamList = document.querySelectorAll(`li`);
  teamList.forEach((singlePuppy) => {
    singlePuppy.addEventListener(`click`, async (event) => {
      const puppyIdClicked = event.target.dataset.id;
      const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players/${puppyIdClicked}`)
      const playerDetails = await response.json();
      
      main.innerHTML = `
      <div class="puppy-details">
      <h2>${playerDetails.data.player.name}</h2>
      <img src="${playerDetails.data.player.imageUrl}" alt="${playerDetails.data.player.name} Picture" height="250px" width="250px">
      Breed: ${playerDetails.data.player.breed}
      <button class="home">Back to Teams</button>
      </div>
      `;

      const button = document.querySelector(`button`)
      button.addEventListener('click' , () => {
        main.innerHTML= ``;
        renderAllPuppies();
      })

    })
  })
}
renderAllPuppies();





// initial test to append list of puppies to page - found `fluff` array to be empty. 
// const puppyApi = async () => {
//   const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`)
//   const responseJson = await response.json();

//   console.log(responseJson)
//   const allPlayers = responseJson.data.players
//   const puppiesList = allPlayers.map((singlepup) => {
//     return `<li>${singlepup.name}</li>`
//   });

//   // console.log(puppiesList)
//   const ul = document.createElement(`ul`)
//   ul.innerHTML = puppiesList.join(``);
//   const playerContainer = document.createElement(`div`)
//   playerContainer.appendChild(ul);
//   main.appendChild(playerContainer)

// }
// puppyApi();



