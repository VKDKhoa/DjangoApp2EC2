// function to get CSRF token from cookie (required for POST requests in Django)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const csrftoken = getCookie("csrftoken");

// get button and input elements
const btn = document.getElementById("Send-Email-btn"); // the button id in home.html
const input = document.getElementById("email-input-fromuser"); // the input id in home.html

// function called when button is clicked
function handleSendEmailClick() {
    const email = input.value.trim(); // get email from input field, trim whitespace
    if (!email) {
        return; // if email is empty, do nothing
    }
    // send POST request to Django backend
    // fetch for send request from frontend to backend
    fetch("/send-email/", // the url path in app1/urls.py
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // to tell backend we send json data, django will parse json.loads(request.body) in views.py
            "X-CSRFToken": csrftoken, // this crsftoken is required by Django for POST requests, come from getCookie function above
        },
        body: JSON.stringify({ email: email }), // body is the data we send to server, convert JS object to JSON string
        // view.py will get this and process it by line email = data.get("email")
    }) // after fetch is sent, we will have Response object, handle it with .then
        
    .then((response) => response.json()) // parse JSON response into JS object for next .then;
    .then((data) => {
        if (data.ok) {
            alert("Email sent successfully!"); // show success message on browser
        } 
        else 
        {
            alert("Error sending email: " + data.error); // show error message on browser from backend
        }
    })
    // if fetch itself fails (e.g. network error), catch the error here
    .catch((error) => {
        console.error("Error:", error);
        alert("An unexpected error occurred."); // show generic error message
    });
}
// add click event listener to button
btn.addEventListener("click", handleSendEmailClick);
