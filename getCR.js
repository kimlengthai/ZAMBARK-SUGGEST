//For Interests Page
//This is to send data to backend


let interestArray = [];

function getButton(btnName1) {
    // Retrieve the paragraph using the paragraphId
    const interest = document.getElementById(btnName1);

    // Retrieve the innerHTML of the paragraph
    const interestText = interest.innerHTML;

    // Add the paragraph text to the interestArray
    interestArray.push(interestText);

    console.log(interestArray)
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

