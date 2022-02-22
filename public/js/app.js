const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    fetch('/weather?location=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
                messageThree.textContent = "";
                messageFour.textContent = "";
            }
            else{
                messageOne.innerHTML = data.desc + ", " + data.temp + "<span>&#176;</span>" +"C";
                messageTwo.innerHTML = "Feels Like : " + data.feelsLike + "<span>&#176;</span>" +"C";
                messageThree.innerText = "Humidity : " + data.humidity;
                var date = new Date("2/15/2003 "+ data.time + " UTC");
                console.log(date);
                messageFour.innerText = date.toLocaleTimeString() + ", " + data.locationName;

            }
        }) 
    })
})
