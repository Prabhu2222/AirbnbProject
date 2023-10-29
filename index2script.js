let stringObj=localStorage.getItem("stringObj");
if(stringObj==null){
    let loadingDiv=document.querySelector(".loading");
    loadingDiv.innerHTML=`OOPS! Something went wrong...<br>Plz try again...<br>
    check your internet connection...<br>Probably you are accessing directly this page...`
    
}
stringObj=JSON.parse(stringObj);
// localStorage.clear();

//updating index2 header

let searchBarBox=document.querySelector(".searchBar");

let child1=searchBarBox.children[0];
child1.children[0].innerText=stringObj.locationValue;

let child2=searchBarBox.children[2];
child2.children[0].innerText=stringObj.checkInValue+"--"+stringObj.checkOutValue;

let child3=searchBarBox.children[4];
console.log(stringObj.guests)
child3.children[0].innerText=stringObj.guestsValues+" guests";

//updating body of index2.html

let arrayOfResults;
let loadingDiv=document.querySelector(".loading");
let body=document.getElementById("main-body-left");

let overlay=document.getElementById("overlay");

//////////////////testing purpose/////////////////////////////////////////////////////////
// arrayOfResults=JSON.parse(localStorage.getItem("data"));
// loadingDiv.style.animation="none";
// loadingDiv.innerHTML=`${Math.floor(arrayOfResults.length/2)} + results found`;


// let map;


// function initMap() {
//     let random=Math.floor(Math.random()*arrayOfResults.length);

   
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: arrayOfResults[random].lat, lng:arrayOfResults[random].lng }, // Centered at some default location
//         zoom: 15
//     });

  
//    for(let i=0;i<arrayOfResults.length;i++){
//        let obj=arrayOfResults[i];
//        let lat=obj.lat;
//        let lng=obj.lng;
//        let label=obj.name[0];
//        let marker=addMarker(lat,lng,label);
//        let infoWindow=new google.maps.InfoWindow({
//         content:`<h3>${obj.name}</h3>`
//        })
//        marker.addListener('click',()=>{
//         infoWindow.open(map,marker)
//        })

//    }
  

//     function addMarker(lati,longi,label){
//         let marker=new google.maps.Marker({
//             position:{lat:lati,lng:longi },
//             map:map,
//             animation:google.maps.Animation.DROP,
//             label:label
//         })
 
//         return marker;
//     }

    
   
// }


// for(let i=0;i<arrayOfResults.length;i++){
//     let obj=arrayOfResults[i];
//     let len=obj.images.length;
//     let randIdx=Math.floor((Math.random()*len));
//     let imgsrc=obj.images[randIdx];//imag link
//     let type=obj.type;
//     let name=obj.name;
//     let address=obj.address;
//     let noOfGuests=obj.persons;
//     let bedrooms=obj.bedrooms;
//     let beds=obj.beds;
//     let bathrooms=obj.bathrooms;
   
//     let ameinitiesArr=obj.previewAmenities;
//     let rating=obj.rating;
//     let reviewCount=obj.reviewsCount;
//     let price=obj.price.rate;


//     let newCard= createCard(imgsrc,type,name,address,noOfGuests,bedrooms,beds,bathrooms,ameinitiesArr,rating,reviewCount,price);
//     body.appendChild(newCard);

// }




/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////


fetchingData(stringObj.locationValue,stringObj.checkInValue,stringObj.checkOutValue,stringObj.guestsValues);



let map;


function initMap() {
  //  let arrayOfResults= fetchingData(stringObj.locationValue,stringObj.checkInValue,stringObj.checkOutValue,stringObj.guestsValues);

  let random=Math.floor(Math.random()*arrayOfResults.length);

 
  map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: arrayOfResults[random].lat, lng:arrayOfResults[random].lng }, // Centered at some default location
      zoom: 12
  });


 for(let i=0;i<arrayOfResults.length;i++){
     let obj=arrayOfResults[i];
     let lat=obj.lat;
     let lng=obj.lng;
     let label=obj.name[0];
     let marker=addMarker(lat,lng,label);
     let infoWindow=new google.maps.InfoWindow({
      content:`<h3>${obj.name}</h3>`
     })
     marker.addListener('click',()=>{
      infoWindow.open(map,marker)
     })

 }


  function addMarker(lati,longi,label){
      let marker=new google.maps.Marker({
          position:{lat:lati,lng:longi },
          map:map,
          animation:google.maps.Animation.DROP,
          label:label
      })

      return marker;
  }

  
 
}



async function fetchingData(locationValue,checkIn,checkOut,guests){
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${locationValue}&checkin=${checkIn}&checkout=${checkOut}&adults=${guests}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ff5a063dcdmsh34922828a689713p158780jsnd0fc1162fcc6',
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        arrayOfResults=result.results;
        localStorage.setItem("data",JSON.stringify(arrayOfResults));
        loadingDiv.style.animation="none";
        loadingDiv.innerHTML=`${Math.floor(arrayOfResults.length/2)} + results found.`;
        document.querySelector(".hzal-bar").style.height="4px";
        initMap();

        for(let i=0;i<arrayOfResults.length;i++){
            let obj=arrayOfResults[i];
            let len=obj.images.length;
            let randIdx=Math.floor((Math.random()*len));
            let imgsrc=obj.images[randIdx];//imag link
            let type=obj.type;
            let name=obj.name;
            let address=obj.address;
            let noOfGuests=obj.persons;
            let bedrooms=obj.bedrooms;
            let beds=obj.beds;
            let bathrooms=obj.bathrooms;
           
            let ameinitiesArr=obj.previewAmenities;
            let rating=obj.rating;
            let reviewCount=obj.reviewsCount;
            let price=obj.price.rate;
            let totalPrice=obj.price.total;
            let priceItemsArr=obj.price.priceItems;
        
            let newCard= createCard(imgsrc,type,name,address,noOfGuests,bedrooms,beds,bathrooms,ameinitiesArr,rating,reviewCount,price);
            body.appendChild(newCard);

            //add evntlilstner for eachcard
            newCard.addEventListener('click',(event)=>{
                overlay.style.display="block";
                let newCard= createPricingCard(price,rating,reviewCount,priceItemsArr,totalPrice);
                document.body.appendChild(newCard);
           })
        }
  
    } catch (error) {
        loadingDiv.style.animation="none";
        loadingDiv.innerHTML=`OOPS! Something went wrong...<br>Plz try again...<br>
        check your internet connection...`
        console.error(error);
    }
    
    }


function createCard(imgsrc,type,name,address,guests,bedrooms,bed,bathrooms,ameinitiesArr,rating,reviewCount,price){
    let cardDiv=document.createElement("div");
    cardDiv.className="card";

    let cardDivLeft=document.createElement('div');
    cardDivLeft.className='card-left';
       let image=document.createElement("img");
       image.src=imgsrc;//src to be given from input;
    cardDivLeft.appendChild(image);   


    let cardDivRight=document.createElement("div");
    cardDivRight.className='card-right';

  //right top section
    let cardDivRightTop=document.createElement("div");
    cardDivRightTop.className="card-right-top";

       let cardDivRightTopLeft=document.createElement("div");
       cardDivRightTopLeft.className="card-right-top-left";
       let span1=document.createElement("span");
       span1.style.fontSize='14px';
       span1.innerText=type;//to be filled from input->type
       let span2=document.createElement("span");
       span2.style.fontSize="20px";
       span2.style.fontWeight='bold';
       span2.innerText=name;//topbe filled from input->name

       let spanX=document.createElement("span");
       spanX.style.fontSize="14px";
       spanX.innerText=address;//address goes here;

       cardDivRightTopLeft.append(span1,span2,spanX);


       let cardDivRightTopRight=document.createElement("div");
       cardDivRightTopRight.className="card-right-top-right";
       let span3=document.createElement("span");
       span3.innerHTML=`<i class="fa-solid fa-heart" style="color: #d3c0c0;"></i>`;

       cardDivRightTopRight.appendChild(span3);
    
    cardDivRightTop.append(cardDivRightTopLeft,cardDivRightTopRight);   

  //right middle section
  let cardRightMiddle=document.createElement("div");
  cardRightMiddle.className="card-right-middle";
     let span4=document.createElement("span");
     span4.innerHTML=`${guests} guest/s &#x2022; ${bedrooms} bedrooms &#x2022; ${bed} beds &#x2022; ${bathrooms} bathrooms</span>`  
     let span5=document.createElement("span");
     let content=``;
     for(let j=0;j<ameinitiesArr.length;j++){
        if(j==ameinitiesArr.length-1){
            content+=ameinitiesArr[j];   
        }
        else {
            content+=ameinitiesArr[j];
            content+=` `;
            content+= `&#x2022`;
            content+=` `;
        }   
     }

     span5.innerHTML=content;
   
     cardRightMiddle.append(span4,span5);

  //right bottom section
  
  let cardRightBottom=document.createElement("div");
  cardRightBottom.className="card-right-bottom";
          
      let cardRightBottomLeft=document.createElement("div");
      cardRightBottomLeft.className="card-right-bottom-left";
          
          let span6=document.createElement("span");
          span6.style.fontWeight="bold";
          if(rating==undefined) rating="no ratings yet";
          span6.innerHTML=`${rating} &nbsp`;//rating

          let span7=document.createElement("span");
          span7.innerHTML=`<i class="fa-solid fa-star" style="color:#F59E0B"></i>`;

          let span8=document.createElement("span");
          span8.innerHTML=`&nbsp (${reviewCount} reviews)`;//reviews
      
      cardRightBottomLeft.append(span6,span7,span8);

      let cardRightBottomRight=document.createElement("div");
      cardRightBottomRight.className="card-right-bottom-right";

          let span9=document.createElement("span");
          span9.style.fontWeight="bold";
          span9.style.fontSize="16px";
          span9.innerText=`\$ ${price}`;

          let span10=document.createElement("span");
          span10.innerText=`/night`
      
      cardRightBottomRight.append(span9,span10);
  
  cardRightBottom.append(cardRightBottomLeft,cardRightBottomRight);
  
 cardDivRight.append(cardDivRightTop,cardRightMiddle,cardRightBottom); 


 cardDiv.append(cardDivLeft,cardDivRight);

 return cardDiv;
}


function createPricingCard(price,rating,review,priceItemsArr,total){
    let priceCardDiv=document.createElement("div");
    priceCardDiv.className="cardPriceDetails";
     let cardTopDiv=document.createElement("div");
     cardTopDiv.className="cpd-top"
      let img=document.createElement("img");
      img.src="images/Vector2.png";
      let button=document.createElement("button");
      button.innerText="Close"
      button.addEventListener('click',removeFrombody);
      cardTopDiv.append(img,button);
    priceCardDiv.appendChild(cardTopDiv);
    
    
    let ratingsDiv=document.createElement("div");
    ratingsDiv.className="cpd";
    let span1=document.createElement("span")
    span1.innerHTML=`<b>\$${price}</b>/night`//price
    let span2=document.createElement("span")
    span2.innerHTML=`<i class="fa-solid fa-star" style="color:#F59E0B"></i>&nbsp;<b>${rating}</b>&nbsp;(${review} reviews)`;//rating , review
    ratingsDiv.append(span1,span2);
    
    priceCardDiv.appendChild(ratingsDiv);

    let priceDiv=document.createElement("div");
    priceDiv.className='cpd';
    priceDiv.innerHTML=`<h2>Price Details:</h2>`

    priceCardDiv.appendChild(priceDiv);
    let linediv=document.createElement("div");
    linediv.className="line"
    priceCardDiv.appendChild(linediv);

    //dynamically add all other pricings from data ->all price goes here
    for(let i=0;i<priceItemsArr.length;i++){
        let priceObj=priceItemsArr[i];
        let div=document.createElement("div");
        div.className='cpd';
        let spanX=document.createElement("span");
        spanX.innerText=priceObj.title+":";
        let spanY=document.createElement("span");
        spanY.innerHTML=`<b>\$${priceObj.amount}</b>`;

        div.append(spanX,spanY);
        priceCardDiv.append(div);
    }
                                                   

    //total amount
    let linediv2=document.createElement("div");
    linediv2.className="line"
    priceCardDiv.appendChild(linediv2);

    let totalDiv=document.createElement("div");
    totalDiv.className='cpd';
    let span3=document.createElement("span");
    span3.innerHTML=`<b>Total:</b>`;
    let span4=document.createElement("span");
    span4.innerHTML=`<b>\$${total}</b>`;
    totalDiv.append(span3,span4);

    priceCardDiv.appendChild(totalDiv);

    return priceCardDiv;
}

function removeFrombody(event){
    //to remove from the body
    overlay.style.display="none";
    let myTarget=event.target.parentNode.parentNode;
    myTarget.remove();
}





// let card=document.querySelector(".card");
// let overlay=document.getElementById("overlay");
// card.addEventListener('click',(event)=>{
//      overlay.style.display="block";
//     let newCard= createPricingCard();
//     document.body.appendChild(newCard);
// })
































  




