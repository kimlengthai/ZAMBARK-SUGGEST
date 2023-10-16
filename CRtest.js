//This is the Page that shows the recommended pages
//this would fetch from the backend


// const coursesListEl = document.querySelector(".") //fill this out

async function main (){
    
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
    
    // Remove the trailing '&' from interestName
    interestName = interestName.slice(0, -1);
    // console.log(interestName)
    
    // const databaseLink = `https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/subjects/hsc/?${interestName}`
    // console.log(databaseLink)
    // Now you can make the fetch request using the constructed URL
    const courses = await fetch(`https://17w1ig90pc.execute-api.ap-southeast-2.amazonaws.com/live/subjects/hsc/?${interestName}`) 
    const coursesListEl = document.querySelector(".row__subjects");   
    const coursesData = await courses.json()
    coursesListEl.innerHTML = coursesData.map((course) => userHTML(course)).join()

    console.log(coursesData)

}

main()

function userHTML(course){
    return`
    <div class="column">
    <div class="card">
        <h2>${course.name}</h2>
        <img class="logoPlace" src="./assets/cr__logo.png" alt="">
        <p><br>"<span class="ital">Blah Blah</span>" - Student Review<br></p>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <p><br></p>
        <hr>
        <p><br>"<span class="ital">Blah Blah</span>" - Student Review<br></p>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <p><br></p>
    </div>
</div>
    
    
    `
}
