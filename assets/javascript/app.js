// GLOBAL VARIABLES
// ===================================================================================
var topics = ["homer simpson", "marge simpson", "bart simpson", "lisa simpson", 
	"maggie simpson", "ned flanders", "chief wiggum", "mr. burns", "lionel hutz",
	"moe szyslak", "milhouse van houten", "waylon smithers", "barney gumble", 
	"kent brockman", "dr. hibbert"];

// FUNCTIONS
// ===================================================================================



// MAIN PROCESS 
// ===================================================================================

// create buttons for each topic in the array
for (var i = 0; i < topics.length; i++) {
	var topicButton = $("<button>").text(topics[i]);
	topicButton.attr("data-value", topics[i]);
	topicButton.addClass("topic-btn");
	$("#button-display").append(topicButton);
}

$(document.body).on("click", ".topic-btn", function() {
	var character = $(this).attr("data-value")
	console.log(character);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=dc6zaTOxFJmzC";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {
			var gifDiv = $("<div>");
			var rating = response.data[i].rating;
			var gifRating = $("<p>").text("Rating: " + rating);
			var imageUrl = response.data[i].images.source_post_url;
			var characterImage = $("<img>");
			characterImage.attr("src", imageUrl);
			characterImage.attr("alt", "character image");
			gifDiv.append(gifRating);
			gifDiv.append(characterImage);
			$("#image-display").append(gifDiv);
		}
	});
});