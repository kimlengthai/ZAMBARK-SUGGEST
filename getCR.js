//For Interests Page
//This is to send data to backend


let interestArray = [];

function getButton(btnName) {
    // get the name of button using btnName
    const interest = document.getElementById(btnName);

    // get the innerHTML of the paragraph
    const interestText = interest.innerHTML;

    // checkin if the interest is already in the interestArray
    const index = interestArray.indexOf(interestText);

    if (index !== -1) {
        // delete innit the interest if it's already in the array BRUV
        interestArray.splice(index, 1);
    } else {
        // add/push the interest if it's not in the array
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

