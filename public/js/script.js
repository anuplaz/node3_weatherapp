//Inpsect element in browser. resources.
console.log('Client side js is loaded.')

const weatherLocation = document.getElementById('weatherLocation')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')
forecast.textContent=''

weatherLocation.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                forecast.textContent=data.error
            else{
                forecast.textContent=data.location+' : '+data.forecast
            }
        })
    })    
})