let itValue = 0

async function profileFetcher (){
    // https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/amit%40email.com/?it=0

    const profileProperties = localStorage.getItem("profile")
    const profileEmail = profileProperties.replace('@', '%40');

    console.log(profileEmail)

    const history = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/${profileEmail}/?it=${itValue}`) 
    const historyData = await history.json()
    const historyListEl = document.querySelector(".row__subjects");   

    console.log(history)
    historyListEl.innerHTML = historyData[0].rec.map((history) => userHTML(history)).join()


    console.log(historyData)

    const profileElement = document.querySelector(".profile__body");

  
    const userEmail = profileElement.querySelector("#user__Email");
    userEmail.innerHTML = historyData[0].email;

    return historyData;
}
 
profileFetcher()

function userHTML(history){
    return`
    <div class="column">
    <div class="card">
        <h2 id="subjectName">${history.name}</h2>

        <div class="logoPlace" >
            <img src="${history.image}" alt="">
        </div>


        <p class="card__title" > Description </p>
        <p id="desc" >${history.description}</p>
        <p class="card__title" > Student Review </p>
        <p><br>"<span id="review">${history.review}</span>"<br></p>
        <p><br></p>
        <p id="difficulty" >Difficulty Level: ${history.difficulty}</p>
    </div>
</div>
    
    
    `
}

function prevButtonClick() {
    itValue++; // Increment the "it" value
    profileFetcher(); // Fetch and update data with the new "it" value
    console.log(history)
}

function nextButtonClick() {
    if (itValue > 0) {
        itValue--; // Decrement the "it" value (ensure it doesn't go below 0)
        profileFetcher(); // Fetch and update data with the new "it" value
        console.log(history)
    }
}


