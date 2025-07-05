<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<p id="result">Thank you for visiting</p>

<!-- Add a hyperlink with onclick event -->
<a href="#" onclick="loadWebsite()">Visit MobileHackingLab</a>

<script>

    function loadWebsite() {
       window.location.href = "https://www.mobilehackinglab.com/";
    }

    // Fetch and display the time when the page loads
    var result = AndroidBridge.getTime("id");
    var lines = result.split('\n');
    var timeVisited = lines[0];
    var fullMessage = "Thanks for playing the game\n\n Please visit mobilehackinglab.com for more! \n\nTime of visit: " + timeVisited;
    document.getElementById('result').innerText = fullMessage;

</script>

</body>
</html>
