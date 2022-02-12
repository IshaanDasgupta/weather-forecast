const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    fetch('/weather?location=' + search.value).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = "";
            }
            else{
                messageOne.textContent = "Currently tempreature is : " + data.temp + "*C in " + data.locationName;
                messageTwo.textContent = "The current time is : " + data.time;

            }
        }) 
    })
})

