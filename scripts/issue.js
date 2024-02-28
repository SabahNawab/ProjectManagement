document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
}
);


var count;

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:8080/getIssueCount',
        type: 'GET',
        contentType: 'application/json',
        success: function(response) {
            for(var i = 0; i < response.length; i++) {
                addIssueCard(response[i].Description_, response[i].typeid, response[i].pid);
            }

            console.log(response);
            count=response.length;
            console.log(count);
        }
    });
});


function addIssue() {
    var description = prompt("Please enter a description of the issue", "Issue Description");
    var type = prompt("Please enter the type of issue\n 1 -Code bug \n 2 -Scope issue \n 3 -Testing Issue \n 4 -Feature Issue", "Issue Type");
    var pid = prompt("Please enter the project ID", "Project ID");
    count++;

    var issue = {
        IssueID: count,
        Description_: description,
        typeid: type,
        pid: pid
    };

    $.ajax({
        url: 'http://localhost:8080/addIssue',
        type: 'POST',
        data: JSON.stringify(issue),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
}

function addIssueCard(description, type, projectId) {
    var card = document.createElement('div');
    card.className = 'card';
    card.style.width = '18rem';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = description;

    var cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerHTML = "Issue Type: " + type + "<br>Project ID: " + projectId;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);

    document.getElementById('issuesList').appendChild(card);

  }
  



