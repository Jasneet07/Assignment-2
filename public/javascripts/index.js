

function waitForElement(id, callback){
    var poops = setInterval(function(){
        if(document.getElementById(id)){
            clearInterval(poops);
            callback();
        }
    }, 100);
}

waitForElement("form", function(){
    document.getElementById("email")?.setAttribute("placeholder", "Enter Email Address");
    document.getElementById("password")?.setAttribute("placeholder", "Enter Password");
    document.getElementById("cpassword")?.setAttribute("placeholder", "Confirm Password");
});


const del = document.getElementById('delete');


del?.addEventListener('click', function() {
    console.log("Click Delete")
})