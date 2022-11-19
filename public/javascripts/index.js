function waitForElement(id, callback) {
  var poops = setInterval(function () {
    if (document.getElementById(id)) {
      clearInterval(poops);
      callback();
    }
  }, 100);
}

waitForElement("form", function () {
  let LOCAL_URI = `http://localhost:3000`;
  let DEV_URI = `https://job-agency-assignment-2.azurewebsites.net`

  document
    .getElementById("email")
    ?.setAttribute("placeholder", "Enter Email Address");
  document
    .getElementById("password")
    ?.setAttribute("placeholder", "Enter Password");
  document
    .getElementById("cpassword")
    ?.setAttribute("placeholder", "Confirm Password");
  
  localStorage.setItem('local_uri', LOCAL_URI);
  localStorage.setItem('dev_uri', DEV_URI)
});


