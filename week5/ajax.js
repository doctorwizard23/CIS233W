console.log("Hello AJAX!")

window.addEventListener('load', function() {
    document.getElementById('fetchButton').addEventListener('click', function() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost/CIS233W/week5/fetch.php?name=Noah&lastName=McGarry&title=Student&course=CIS%20233W", false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);

        var html = "<table>"
        html += "<tr><th>Key</th><th>Value</th></tr>";
        for (key in response) {
            html += "<tr><td>" + key + "</td><td>" + response[key] + "</td></tr>";
        }
        html += "</table>";
        document.getElementById("results").innerHTML = html;
    });
});