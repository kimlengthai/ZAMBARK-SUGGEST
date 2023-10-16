//For Interests Page
//This is to send data to backend


let interestArray = [];

function getButton(btnName) {
    // Retrieve the paragraph using the btnName
    const interest = document.getElementById(btnName);

    // Retrieve the innerHTML of the paragraph
    const interestText = interest.innerHTML;

    // Check if the interest is already in the interestArray
    const index = interestArray.indexOf(interestText);

    if (index !== -1) {
        // Remove the interest if it's already in the array
        interestArray.splice(index, 1);
    } else {
        // Add the interest if it's not in the array
        interestArray.push(interestText);
    }

    console.log(interestArray);
}




function htmlUpdater(interests) {
    localStorage.setItem("interests", interests);
    window.location.href = `${window.location.origin}/CRtest.html`;
    // console.log(interestArray)
}


function nextBtn(){
    console.log(interestArray)
    if (interestArray.length >= 3){
        console.log(interestArray)
        htmlUpdater(interestArray)
    }
    else{
        alert('Choose 3 or more Preferences to continue!')
    }
}

