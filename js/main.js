let text1 = "The sun was setting over the horizon, painting the sky with hues of orange and pink. A gentle breeze blew through the leaves of the nearby trees, rustling them softly. In the distance, a bird chirped a sweet melody, while a nearby stream gurgled happily. It was a peaceful and serene moment, a brief respite from the chaos of the world."
let text2 = "The streets were bustling with people, each busily going about their day. Cars honked impatiently as they jostled for space on the busy roads. The smell of fresh coffee wafted from nearby cafes, mingling with the scent of hot pretzels being sold from street vendors. It was a vibrant and lively scene, full of energy and excitement."
let text3 = "The wind was howling outside, sending shivers down everyone's spines. The sky was dark and ominous, as if a storm were about to break loose. People hurried along the streets, clutching their coats tightly and trying to avoid the biting cold. It was a stark contrast to the warm and cozy atmosphere inside the nearby coffee shops, where the smell of freshly brewed coffee and baked goods filled the air."
let texts = [text1,text2,text3];
const playBtn = document.getElementById("play-btn");
let pharaphDom = document.getElementById("text-pharaph");
let chars = "";
let wrongLetters = [];
let maxTime = 60;
let timeLeft = maxTime;
let timer = document.getElementById("time");
let textSelector = 0;
let accuracyErrors = 0;
let writtedByUser = 0;
let accuracyPercent = 100;
let errors = 0;
let wpm = 0;
let i = 0;
function start() {
    pharaphDom.innerHTML = "";
    playBtn.style.display = "none";
    textSelector = Math.floor(Math.random() * texts.length);
    /*iterates over each character in the chars array . For each character, 
    it creates a new span element containing the character and stores it 
    as a string in the span variable. It then appends this span string to the DOM
    */
    chars = texts[textSelector].split("");
    chars.forEach(char => {
        span = `<span>${char}</span>`;
        pharaphDom.innerHTML += span;
    })
    i = 0;
    accuracyErrors = 0;
    writtedByUser = 0;
    wrongLetters = [];
    startTimer()
}
function Wpm(){
    wpm = Math.round(((writtedByUser - errors)  / 5)  / (maxTime - timeLeft) * 60);
}
function restart(){
    let retryBtn = document.createElement("button");
    retryBtn.className = "retry-btn";
    let btnText = document.createTextNode("Retry");
    retryBtn.appendChild(btnText);
    document.getElementById("results-window").appendChild(retryBtn);

        retryBtn.addEventListener("click",()=>{
            timeLeft = 60;
            wpm = 0;
            start()
            document.getElementById("results-window").style.display = "none";
            errors = 0;
        })
}
function showResults(){
    document.getElementById("results-window").style.display = "flex";
    document.getElementById("show-errors").innerHTML = "Errors: " + errors;
    document.getElementById("show-accuracy").innerHTML = "Accuracy: " + accuracyPercent;
    document.getElementById("show-wpm").innerHTML = "WPM: " + wpm;
}
function startTimer(){
   let interval = setInterval(()=>{
    if(timeLeft > 0){
        timeLeft--;
        timer.innerHTML = "Time: " + timeLeft;
    }else {
        clearInterval(interval)
        showResults()
        restart()
    }
   },1000)
}
function accuracy() {
    /*checks if the length of the string in texts[textSelector] is greater than zero
     and also that precisionErrors is not a NaN value. If both conditions are true, 
     calculate a new value for acc.The resulting value of acc is then converted to a 
     string with 2 decimal places using the toFixed() method.
    */
    let acc = 100;
    if (texts[textSelector].length > 0 && !isNaN(accuracyErrors)) {
      acc = ((writtedByUser - accuracyErrors) / writtedByUser) * 100;
    }
    accuracyPercent = acc.toFixed(2) + "%";
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracyPercent;
}
playBtn.addEventListener("click",()=>{
        start()
        document.addEventListener("keydown",(event) =>{
            if(event.key == "Backspace"){
                if (i > 0) {
                    i--;
                    if(pharaphDom.querySelectorAll("span")[i].className = "wrong" && errors > 0){
                        errors --;
                    }
                    pharaphDom.querySelectorAll("span")[i].classList.remove("active", "wrong");
                }
            }
            else if(event.key == "Shift"){
                i = i;
                acc = acc;
            }
            else {
                let expectedChar = chars[i];
                if (event.key == expectedChar) {
                    pharaphDom.querySelectorAll("span")[i].classList.add("active");
                    i++;
                    } else {
                        pharaphDom.querySelectorAll("span")[i].classList.add("wrong");
                        wrongLetters.push(pharaphDom.querySelectorAll("span")[i].innerHTML);
                        errors++;
                        accuracyErrors ++;
                        i++;
                }}
            if(event.key == "Shift" || event.key == "Backspace") {
                writtedByUser = writtedByUser;
            }
            document.getElementById("errors").innerHTML ="Errors: " + errors;
            writtedByUser ++;
            accuracy(); 
            Wpm()
        })
        startTimer()
    })  