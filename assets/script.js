var movies = ["A New Hope", "Raising Arizona", "13 Going On 30", "Antman", "Platoon", "Nightmare Before Christmas", "Close Encounters", "What About Bob?"];
var apikey = "&api_key=JfnU5gDQC7Gg7f61H376fTInmEBd6odu";

function renderButtons() {
    $("#movieButtons").empty()
    for (var i = 0; i < movies.length; i++) {
        var j = $("<button>");
        j.addClass("movie");
        j.attr("data-name", movies[i]);
        j.text(movies[i])
        $("#movieButtons").append(j);
    }
}

console.log(movies);
$("#submit").on("click", function (event) {
    event.preventDefault();
    var movie = $("#searchfield").val().trim();
    movies.push(movie);
    renderButtons();
    console.log(movies);
});
renderButtons();
$(document).on("click", ".movie", gifSearch);
function gifSearch() {
    $("#movieGifs").empty();
    var movie = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + apikey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        for (var k = 0; k < results.length; k++) {
            var gifDiv = $("<div>");

            var rating = results[k].rating;

            var p = $("<p>").text("Rating: " + rating);

            var movieImage = $("<img>");
            movieImage.attr("src", results[k].images.fixed_height_still.url);
            movieImage.attr("data-still", results[k].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[k].images.fixed_height.url);
            movieImage.attr("data-state", "still");
            movieImage.addClass("gif");
            console.log(movieImage.attr("src"));
            gifDiv.prepend(p);
            gifDiv.prepend(movieImage);
            $("#movieGifs").append(gifDiv);
        }
        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
            console.log(movieImage.attr("src"));
            console.log(state);
        });

    });
};
