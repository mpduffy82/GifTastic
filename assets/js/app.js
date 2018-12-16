var topics = [
    "Australia",
    "The United States of America",
    "The United Kingdom",
    "Germany",
    "Croatia",
    "Greece",
    "Ireland",
    "Norway",
    "Italy",
    "Spain",
    "China",
    "Singapore",
    "Japan",
    "Nepal",
    "New Zealand"
];

const apiKey = "nGTpkmqjNIFcrB8JgSNCsFrv6IoSQvQ0"

topics.forEach(function (topic) {
    addButton(topic)
})

function addButton(topic) {
    var id = topic.split(' ').join('');
    $("#topics").append('<button id="' + id + '" type="button">' + topic + '</button>')
    $("#" + id).click(function () {
        $("#images").html('')
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${topic}&limit=10&rating=pg`
        }).done(function (response) {
            console.log(response)
            response.data.forEach(function (gif) {
                var id = gif.id
                var stillUrl = gif.images.fixed_height_still.url
                var gifUrl = gif.images.fixed_height.url
                $("#images").append('<div class="img"> <img id="' + id + '" src="' + stillUrl + '"> <p>' + gif.rating.toUpperCase() + '</p></div>')

                $("#" + id).click(function () {
                    if ($("#" + id).attr('src') === stillUrl) {
                        $("#" + id).attr('src', gifUrl)
                    } else {
                        $("#" + id).attr('src', stillUrl)
                    }
                })
            })
        });
    })
}
$("#submit").click(function () {
    console.log($("#newButton").val())
    if ($("#newButton").val()) {
        addButton($("#newButton").val())
    }
})