document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Loaded");
});

var count = 1;


$(document).ready(function() {
    var board = JSON.parse(localStorage.getItem("board"));

    var heading = document.getElementById("board-heading")
    heading.innerHTML = board[0].BoardName;

    data = {
        boardid: board[0].BoardID
    }

    $.ajax({
        url: 'http://localhost:8080/getDecks',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);

            response.forEach(function(deck) {
                var headingText = deck.DeckTitle; 

                // Creating the column element
                var column = $('<div class="column"></div>')
                  .attr('id', 'todo-column')
                  .attr('ondrop', 'drop(event, "todo-column")')
                  .attr('ondragover', 'allowDrop(event)');

                  data = {
                        deckid: deck.DeckId
                    }

                  $.ajax({
                    url: 'http://localhost:8080/getCards',
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(response) {
                        console.log(response);

                        response.forEach(function(card) {
                            count++;
                            var cardText = card.Name_;
                            var cardDescription = card.Description_;

                            // adding h2 element to column
                            var cardElement = $('<div class="card"></div>')
                                .attr('draggable', 'true')
                                .attr('ondragstart', 'drag(event)')
                                .text(cardDescription)

                                var cardDescriptionElement = $('<p></p>')
                                .text(cardText)
                                .css('font-weight', 'bold');
                            column.append(cardDescriptionElement)
                            column.append(cardElement)
                        });
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });

                // Creating the heading element with the dynamic text
                var heading = $('<h3></h3>').text(headingText);
              
              // Creating the "Create New Card" button
                var createButton = $('<button class="btn btn-primary mt-3 create-button">Create New Card</button>')
                .attr('onclick', 'createCard(' + deck.DeckId + ')')
                .text('Create New Card');

              
                // Creating the parent container div with the "col-sm-3" class
                var container = $('<div class="col-sm-3"></div>')
                  .append(heading)
                  .append(column)
                  .append(createButton);
              
                // Appending the container to the desired element on the page
                $('.row').append(container);
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
});

function createCard(id){
    var cardText = prompt("Enter card text", "Card text");
    var cardDescription = prompt("Enter card description", "Card description");
    count++;


    if (cardText == null || cardText == "" || cardDescription == null || cardDescription == "") {
        alert("Card not created");
    }
    else {
        $.ajax({
            url: 'http://localhost:8080/addCard',
            type: 'POST',
            data: JSON.stringify({
                CardId: count,
                Name_: cardText,
                Description_: cardDescription,
                deckid: id
            }),
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
            },
            error: function(err) {
                if (err.responseText == "Card already exists") {
                    count++;
                    alert("Id Incremented, Try Again");
                }
                else {
                    console.log(err);
                }
            }
        });
        alert("Card created");
        location.reload();
    }

}