document.addEventListener("DOMContentLoaded", function() {
    // Initial state
    history.replaceState({ page: "surveyIntro" }, "");

    // Handle survey start
    document.getElementById("startSurvey").addEventListener("click", function() {
        history.pushState({ page: "question1" }, "");
        navigateTo("question1");
    });

    // Handle next question button
    document.getElementById("nextQuestion").addEventListener("click", function() {
        var selectedCareerStatus = document.querySelector('input[name="careerStatus"]:checked').value;
        console.log("Selected career status:", selectedCareerStatus); // Log the selected status
        history.pushState({ page: "interestsPage" }, "");
        navigateTo("interestsPage");
    });

    // Handle browser's back or forward buttons
    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.page) {
            navigateTo(event.state.page);
        }
    });

    // Navigation function
    function navigateTo(page) {
        document.getElementById("surveyIntro").style.display = "none";
        document.getElementById("question1").style.display = "none";
        document.getElementById("interestsPage").style.display = "none";
        document.getElementById(page).style.display = "block";
    }

    // Previous JavaScript code for interest selection
    var interests = document.querySelectorAll('.interest');
    interests.forEach(function(interest) {
        interest.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default link behavior
            var selectedInterest = this.textContent.trim();
            console.log("You selected:", selectedInterest); // Log the selected interest
        });
    });
});
