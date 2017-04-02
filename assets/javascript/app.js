// GLOBAL VARIABLES
// ===================================================================================
var topics = ["Homer Simpson", "Marge Simpson", "Bart Simpson", "Lisa Simpson", 
	"Maggie Simpson", "Ned Flanders", "Maude Flanders", "Chief Wiggum", "Mr. Burns", 
	"Lionel Hutz", "Moe Szyslak", "Milhouse Van Houten", "Waylon Smithers", 
	"Barney Gumble", "Kent Brockman", "Dr. Hibbert", "Edna Krabappel", "Principal Skinner",
	"Krusty the Klown", "Dr. Nick"];

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

// Run the createButtons function right away
createButtons();

// When a user clicks a topic button the image dispay is emptied and the data value of the 
// button is pulled in order to be used in the API call
$(document.body).on("click", ".topic-btn", function() {
	$("#image-display").empty();
	var character = $(this).attr("data-value")
	console.log(character);
	// Searches based on the character, limits results to 10 with a rating of pg or lower
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + 
		"&limit=10" + "&rating=pg" + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		// Once the ajax call is complete each gif, along with its rating, is shown
		// on the page in a gifDiv...img sources are defined for both still and active
		// states, with the default appearance being still
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

// When the user hits the add topic button their input value is added to the topics array
// and the createButtons function is run again without reloading the page
$("#add-topic").on("click", function() {
	event.preventDefault();
	var newTopic = $("#topic").val().trim();
	topics.push(newTopic);
	createButtons();
	$("#topic").text().empty();
});