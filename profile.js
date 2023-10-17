
async function profileFetcher (){
    // https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/amit%40email.com/?it=0

    const profileProperties = localStorage.getItem("profile")
    const profileEmail = profileProperties.replace('@', '%40');

    console.log(profileEmail)
    // const history = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/amit%40email.com/?it=0`) 
    // const history = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/amit%40email.com/?it=0`) 
    const history = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/${profileEmail}/?it=0`) 
    const historyData = await history.json()
    const historyListEl = document.querySelector(".row__subjects");   
    // const rec = historyData[0].rec[1]
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

// let currentIndex = 0; // Initialize the current index

// async function profileFetcher() {
//   const history = await fetch(
//     "https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/amit%40email.com/?it=0"
//   );
//   const historyData = await history.json();

//   const historyListEl = document.querySelector(".row__subjects");

//   // Function to update the content based on the current index
//   function updateContent() {
//     historyListEl.innerHTML = userHTML(historyData[0].rec[currentIndex]);
//   }

//   // Initialize content
//   updateContent();

//   const profileElement = document.querySelector(".profile__body");

//   const userName = profileElement.querySelector("#user__Name");
//   userName.innerHTML = historyData[0].username;

//   const userEmail = profileElement.querySelector("#user__Email");
//   userEmail.innerHTML = historyData[0].email;

//   const nextButton = document.getElementById("nextButton");
//   const prevButton = document.getElementById("prevButton");

//   // Add event listeners for the Next and Previous buttons
//   nextButton.addEventListener("click", () => {
//     if (currentIndex < historyData[0].rec.length - 1) {
//       currentIndex++;
//       updateContent();
//     }
//   });

//   prevButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//       updateContent();
//     }
//   });

//   return historyData;
// }

// function userHTML(history) {
//   return `
//     <div class="column">
//       <div class="card">
//         <h2 id="subjectName">${history.name}</h2>

//         <div class="logoPlace">
//           <img src="${history.image}" alt="">
//         </div>

//         <p class="card__title"> Description </p>
//         <p id="desc">${history.description}</p>
//         <p class="card__title"> Student Review </p>
//         <p><br>"<span id="review">${history.review}</span>"<br></p>
//         <p><br></p>
//         <p id="difficulty">Difficulty Level: ${history.difficulty}</p>
//       </div>
//     </div>
//   `;
// }

// profileFetcher();

  