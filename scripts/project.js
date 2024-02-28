
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
});


var count=0;
  

$(document).ready(function() {
    var user = JSON.parse(localStorage.getItem("user"));

    data = {
        UserID: 3
    }
    
    $.ajax({
        url: 'http://localhost:8080/getProject',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
    
            // Iterating over the projects and creating project cards dynamically
            response.forEach(function(project) {
                count++;
                var projectCard = $('<div class="project-card"></div>');
                var projectTitle = $('<h2></h2>').text(project.ProjectName);
                var projectDescription = $('<p></p>').text(project.DueDate);
                var projectStatus = $('<span class="status completed">Completed</span>');
                var viewButton = $('<button class="view-button">View</button>').click(function() {
                    openProjectDetails(project.ProjectID);
                  });
                  
    
                // Appending project details to the project card
                projectCard.append(projectTitle, projectDescription, projectStatus, viewButton);
                $('.completed-projects').append(projectCard);
            });
        },
        error: function(response) {
            console.log(response);
        }
    });    
});


function openProjectDetails(id) {
    
    data = {
        pid: id
    }
    $.ajax({
        url: 'http://localhost:8080/getProjectDetails',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            localStorage.setItem("board", JSON.stringify(response));
            window.location.href = "Scrum.html";
        }
    });
}


$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        // Get the values of all input fields
        var projectTitle = document.getElementById('project-title').value;
        var projectDueDate = document.getElementById('project-due-date').value;
        var projectAdminID = document.getElementById('project-adminid').value;
        var projectManagerID = document.getElementById('project-managerid').value;
        var projectCustomerID = document.getElementById('project-custid').value;

        // Creating an object to hold the data
        var data = {
            ProjectID: count+1,
            ProjectName: projectTitle,
            DueDate: projectDueDate,
            managerid: projectManagerID,
            custid: projectCustomerID,
            adminid: projectAdminID
        };
        console.log(data);

        // Sending the data to the backend using AJAX
        $.ajax({
            url: 'http://localhost:8080/addProject', 
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                alert("Project Added");
                count++;
                window.location.href = "board.html";
            },
            error: function(response) {
                console.log(response);
            }
        });
    });
});


    

