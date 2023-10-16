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
  // favourite_song = document.getElementById('favourite_song').value
  // milk_before_cereal = document.getElementById('milk_before_cereal').value

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


    











    let crPopup = document.getElementById("crPopup");
    crPopup.classList.remove("crPopup");

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


let popup = document.getElementById("modal");

function modalOpen() {
if (popup.classList.contains("popup__after")) {
  popup.classList.remove("popup__after");
} else {
  popup.classList.add("popup__after");
}
}

//


