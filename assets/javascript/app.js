// GLOBAL VARIABLES
// ===================================================================================
var topics = ["homer simpson", "marge simpson", "bart simpson", "lisa simpson", 
	"maggie simpson", "ned flanders", "maude flanders", "chief wiggum", "mr. burns", 
	"lionel hutz", "moe szyslak", "milhouse van houten", "waylon smithers", 
	"barney gumble", "kent brockman", "dr. hibbert", "edna krabappel", "principal skinner",
	"krusty the klown", "dr. nick"];

// FUNCTIONS
// ===================================================================================
// Create buttons for each topic in the array and displays them on the page
// Clears the button display first so buttons are not duplicated when a new topic
// is added
function createButtons() {
	$("#button-display").empty();
	for (var i = 0; i < topics.length; i++) {
		var topicButton = $("<button>").text(topics[i]);
		topicButton.attr("data-value", topics[i]);
		topicButton.addClass("topic-btn");
		$("#button-display").append(topicButton);
	}
}

// MAIN PROCESS 
// ===================================================================================

createButtons();

// When a user clicks a topic button a max of 10 results are pulled using Giphy API
$(document.body).on("click", ".topic-btn", function() {
	$("#image-display").empty();
	var character = $(this).attr("data-value")
	console.log(character);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + 
		"&limit=10" + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		// Once the ajax call is complete each gif, along with its rating, is shown
		// on the page in a gifDiv...img sources are defined for both still (default)
		// and active state
		for (var i = 0; i < response.data.length; i++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gif");
			var rating = response.data[i].rating;
			var gifRating = $("<p>").text("Rating: " + rating);
			var imageUrl = response.data[i].images.original_still.url;
			var imageUrlStill = response.data[i].images.original_still.url;
			var imageUrlActive = response.data[i].images.original.url;
			var characterImage = $("<img>");
			characterImage.addClass("gif-image");
			characterImage.attr("src", imageUrl);
			characterImage.attr("alt", "character image");
			characterImage.attr("data-state", "still");
			characterImage.attr("data-still", imageUrlStill);
			characterImage.attr("data-active", imageUrlActive);
			gifDiv.append(gifRating);
			gifDiv.append(characterImage);
			$("#image-display").append(gifDiv);
		}
	});
});

// When a gif image is clicked by the user, the state changes from still to active
// or vice versa
$(document.body).on("click", ".gif-image", function() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-active"));
		$(this).attr("data-state", "active");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

// When the user hits the add topic button a new button based on their input is
// created and appended to the button display area, without reloading the page
$("#add-topic").on("click", function() {
	event.preventDefault();
	var newTopic = $("#topic").val().trim();
	topics.push(newTopic);
	createButtons();
});