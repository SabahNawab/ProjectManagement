
var slidebarOpen = false;
var slidebar = document.getElementById("slidebar");


function OpenSlidebar(){
    if(!slidebarOpen){
        slidebar.classList.add("slidebar-responsive");
        slidebarOpen= true;
    }
}


function closeSlidebar() {

    if (slidebarOpen) {
        slidebar.classList.remove("slidebar-responsive");
        slidebarOpen= false;
    }
}


