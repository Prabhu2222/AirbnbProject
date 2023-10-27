let searcBtn=document.getElementById("search-icon");
let loc=document.querySelector("input[type='text']")
let dates=document.querySelectorAll("input[type='date']");
let checkIn=dates[0];
let checkOut=dates[1];
let guests=document.querySelector("input[type='number']")

//call the 

searcBtn.addEventListener("click",(event)=>{
   
    let myObj={};
    while(loc.value.trim().length==0||checkIn.value.trim().length==0||checkOut.value.trim().length==0){
       alert("please enter values for all the field");
       return;
    }

    myObj.locationValue=loc.value;
    myObj.checkInValue=checkIn.value;
    myObj.checkOutValue=checkOut.value;
    myObj.guestsValues=guests.value;


    let stringObj=JSON.stringify(myObj);
    localStorage.setItem("stringObj",stringObj);
    window.location.href="index2.html";
})



