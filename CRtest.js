//this would fetch from the backend

const coursesListEl = document.querySelector(".column") //fill this out

async function main (){
    const courses = await fetch(``) //fill this out
    const coursesData = await courses.json()
    coursesListEl.innerHTML = coursesData.map((user) => userHTML(user)).join

    console.log(coursesData)
}

main()

function userHTML(user){
    return`
    <div class="card">
    <h2>Introduction to Psychology</h2>
    <div class="emoji">📚</div>
    <p><br>"<span class="ital">This course has really helped me with opportunities for my career in psychology.</span>" - Zihad Burhan<br></p>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <p><br></p>
    <hr>
    <p><br>"<span class="ital">Very difficult and the tutors and electives are pointless and unhelpful.</span>" - Rahul Zurhan<br></p>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <p><br></p>
</div>
    
    
    `
}
