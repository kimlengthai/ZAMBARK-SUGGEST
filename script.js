document.addEventListener("DOMContentLoaded", function() {
    // Handle survey start
    document.getElementById("startSurvey").addEventListener("click", function() {
      document.getElementById("surveyIntro").style.display = "none";
      document.getElementById("question1").style.display = "block";
    });
  
    // Handle next question button
    document.getElementById("nextQuestion").addEventListener("click", function() {
      document.getElementById("question1").style.display = "none";
      document.getElementById("interestsPage").style.display = "block";
    });
  
    // Previous JavaScript code for interest selection
    var interests = document.querySelectorAll('.interest');
  
    interests.forEach(function(interest) {
      interest.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        var selectedInterest = this.textContent.trim();
        console.log("You selected:", selectedInterest); // Log the selected interest
        // You can now do something with the selected interest
      });
    });
  });
  