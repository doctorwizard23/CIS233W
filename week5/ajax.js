console.log("Hello AJAX!")

window.addEventListener('load', function() {
    document.getElementById('fetchButton').addEventListener('click', function() {
        var xhr = new XMLHttpRequest();
        var firstName = encodeURIComponent(document.getElementById('firstName').value);
        var lastName = encodeURIComponent(document.getElementById('lastName').value);
        var title = encodeURIComponent(document.getElementById('title').value);
        var course = encodeURIComponent(document.getElementById('course').value);

        var data = "firstName=" + firstName + "&lastName=" + lastName + "&title=" + title + "&course=" + course;

        /* For GET method
        xhr.open("GET", "http://localhost/CIS233W/week5/fetch.php?" + data, true);
        /* */

        /* For POST */
        xhr.open("POST", "http://localhost/CIS233W/week5/fetch.php?" + data, true);
        /* */

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var response = JSON.parse(xhr.responseText);

                var html = "<table>"
                html += "<tr><th>Key</th><th>Value</th></tr>";
                for (key in response) {
                    html += "<tr><td>" + key + "</td><td>" + response[key] + "</td></tr>";
                }
                html += "</table>";
                document.getElementById("results").innerHTML = html;
            }
        }

        /* For GET 
        xhr.send();
        /* */

        /* For POST */
        xhr.send(data);
    });
});