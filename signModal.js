let profileArray = []
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDowsVTAibuecebDPvYOUD_BtQ3QW8PF6M",
  authDomain: "zambark-testing.firebaseapp.com",
  databaseURL: "https://zambark-testing-default-rtdb.firebaseio.com",
  projectId: "zambark-testing",
  storageBucket: "zambark-testing.appspot.com",
  messagingSenderId: "43801937043",
  appId: "1:43801937043:web:35205de4b7292533053966",
  measurementId: "G-JBC0XHJZDZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()



// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('emailR').value
  password = document.getElementById('passwordR').value
  full_name = document.getElementById('full_nameR').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password are False')
    return
    // Don't continue running the code
  }

 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function loginButton(){
  login()
  
}


// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password are False')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In and Subject Preferences are now Saved!')
    subjectInsertion()
    profileArray.push(email);
    profileOpen()
    
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}





// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}


//---------------------------


let profilePopup = document.getElementById("profilePage");
function profileOpen() {
  if (profilePopup.classList.contains("profilePopup__after")) {
    profilePopup.classList.remove("profilePopup__after");
  } else {
    profilePopup.classList.add("profilePopup__after");
  }
}


let popup = document.getElementById("modal");


function modalOpen() {
  if (popup.classList.contains("popup__after")) {
    popup.classList.remove("popup__after");
  } else {
    popup.classList.add("popup__after");
  }
}

//


//..........................

//Subjects are inserted into User Profile/Database
async function subjectInsertion() {
  // fetch the coursesData
  const coursesData = await subjectFetcher();

  await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/users/update/`, {
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      "email": email,
      "rec": coursesData // maps coursesData to an array of course names

    })
  });
}



// const coursesListEl = document.querySelector(".") //fill this out

async function subjectFetcher (){
    
    const interestsGroup = localStorage.getItem("interests") //gets the interest from previous page
    const interests = interestsGroup.toLowerCase(); // turns all of them to lowercase
    console.log(interests)
    const interestsArray = interests.split(','); //splits the interest string up and puts them into an array
    console.log(interestsArray); 


    let interestName = ''
    for (let i = 0; i < interestsArray.length; i++) {
        interestName += 'interests=' + interestsArray[i] +'&';
    }
    
    console.log(interestName)
    
    // remove the  '&' but delete last char
    interestName = interestName.slice(0, -1);
    // console.log(interestName)
    

    const courses = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/subjects/hsc/?${interestName}`) 
    const coursesData = await courses.json()
    const coursesListEl = document.querySelector(".row__subjects");   
    coursesListEl.innerHTML = coursesData.map((course) => userHTML(course)).join()

    console.log(coursesData)

    return coursesData;
}
 
subjectFetcher()


function userHTML(course){
    return`
    <div class="column">
    <div class="card">
        <h2 id="subjectName">${course.name}</h2>

        <div class="logoPlace" >
            <img src="${course.image}" alt="">
        </div>


        <p class="card__title" > Description </p>
        <p id="desc" >${course.description}</p>
        <p class="card__title" > Student Review </p>
        <p><br>"<span id="review">${course.review}</span>"<br></p>
        <p><br></p>
        <p id="difficulty" >Difficulty Level: ${course.difficulty}</p>
    </div>
</div>
    
    
    `
}



function profileDisplay(profile) {
  localStorage.setItem("profile", profile);
  window.location.href = `${window.location.origin}/profile.html`;

}
