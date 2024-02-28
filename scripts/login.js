document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
});
  


$(document).ready(function() {
    // Event handler for form submission
    $('form').submit(function(event) {
        event.preventDefault();

    var pageName = window.location.pathname.split("/").pop();
    console.log(pageName);

      // Getting the email and password values
      var email = $('input[name="email"]').val();
      var password = $('input[type="password"]').val();

      // Creating an object to hold the data
      var data = {
        email: email,
        password: password
      };

      // Sending the data to the backend using AJAX
      $.ajax({
        url: 'http://localhost:8080/login', 
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            if (response == "Invalid username or password") {
                alert("Invalid username or password");
            }
            else {
                if(response[0].rollid == 1) {
                    if(pageName == "loginAdmin.html"){
                    alert("Login Successful");
                    window.location.href = 'indexAdmin.html';
                }
                else{
                    alert("Login from Your Portal");
                }
                }
                else if(response[0].rollid == 2) {
                    if(pageName == "loginCustomer.html"){
                    alert("Login Successful");
                    window.location.href = 'issues.html';
                    }
                    else{
                        alert("Login from Your Portal");
                    }
                }
                else if(response[0].rollid == 3) {
                    if(pageName == "loginManager.html"){
                    alert("Login Successful");
                    localStorage.setItem("user", JSON.stringify(response[0]));
                    window.location.href = 'Dashboard.html';
                   }
                   else{
                    alert("Login from Your Portal");
                }
            }
            else if(response[0].rollid == 4) {
                if(pageName == "loginMember.html"){
                alert("Login Successful");
                window.location.href = 'Dashboard.html';
                }
                else{
                    alert("Login from Your Portal");
                }
            }
            }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
