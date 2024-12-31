let keybinds = ['1', '2', '3', '4', '5', 'q','w','e','r','t','a','s','d','f','g','h','z','x','c','v','b',' ']
let altkeybinds = ['1', '2', '3', '4', '5', 'q','w','e','r','t','a','s','d','f','g','h','z','x','c','v','b',' ']
let randomComboLength = 50

if(document.URL.toString().split("?").length > 1 && document.URL.toString().split("?")[1].length > 0){
    let userSubmittedKeybind = document.URL.toString().split("=")[1].split("&")[0].replaceAll("+", " ")
    let userSubmittedComboLength = document.URL.toString().split("=")[2]

    document.getElementById("customKeys").value = userSubmittedKeybind
    document.getElementById("noOfKeystrokes").value = userSubmittedComboLength

    keybinds = userSubmittedKeybind.length > 0 ? userSubmittedKeybind.split('') : keybinds
    randomComboLength = Number(userSubmittedComboLength) > 0 ? Number(userSubmittedComboLength) : randomComboLength
}

let currentLocalStorageValue = localStorage.getItem("scoreArray")
if(currentLocalStorageValue == null || currentLocalStorageValue == ""){
    localStorage.setItem("scoreArray", "[]")
}

updateScoreDisplay()

function randomComboArrayGenerator(comboLength, keybinds){
    let comboArray = [];

    let i = 0;

    for(i=0; i<comboLength; i++){
        let randomNum = Math.ceil((Math.random() * 1000))
        let randomKeybindPosition = randomNum % (keybinds.length)
        let nextAddElement = keybinds[randomKeybindPosition]
        comboArray.push(nextAddElement)
    }
    return (comboArray)
}

let randomComboArray = randomComboArrayGenerator(randomComboLength, keybinds)

let i = 0;

for(i=0; i<randomComboArray.length; i++){
    addElement(randomComboArray[i], i)
}

function addElement(element, id) {
    const div = document.createElement('div')

    div.className = 'container'
    div.id = id.toString()
  
    firstElementClass = ""

    id == 0 ? firstElementClass = " active" : firstElementClass = ""

    div.innerHTML = `
        <div class="charactercontainer`+ firstElementClass +`">
            <p class="character">`+element+`</p>
        </div>
    `
    document.getElementById("loopcontainer").appendChild(div)
}

//global variables
let currentIndex = 0;
let startTime = Date.now()
let endTime = Date.now()
let mistakeCounter = 0

function keyUpFunction(){

    let userInput = document.getElementById("userInput").value

    document.getElementById("lastKeyPressed").innerHTML = userInput.toUpperCase();

    if(userInput == randomComboArray[currentIndex]){
        if(currentIndex == 0) {
            startTime = Date.now()
            gameBeginMethod()
            mistakeCounter = 0
        }

        document.getElementsByClassName("lastKeyPressedContainer")[0].classList.remove("lastKeyPressedIncorrect")
        document.getElementsByClassName("lastKeyPressedContainer")[0].classList.add("lastKeyPressedCorrect")
        document.getElementById("tauntText").innerHTML = "!!"

        removeElement(currentIndex)

        currentIndex ++

        if (currentIndex < randomComboArray.length){
            document.getElementById(currentIndex.toString()).children[0].classList.add("active")
        }else{
            endTime = Date.now()
            gameOverMethod()
        }
    }else{
        document.getElementsByClassName("lastKeyPressedContainer")[0].classList.remove("lastKeyPressedCorrect")
        document.getElementsByClassName("lastKeyPressedContainer")[0].classList.add("lastKeyPressedIncorrect")
        document.getElementById("tauntText").innerHTML = "??"
        document.getElementById(currentIndex.toString()).children[0].classList.add("incorrect")
        mistakeCounter ++;
    }

    document.getElementById("userInput").value=""

}


function removeElement(id) {
    document.getElementById(id.toString()).remove();
}


function gameOverMethod(){
    let totalTimeTakenByUser = (endTime - startTime)/1000
    document.getElementById("timeTaken").innerHTML = "Total Time Taken: " + totalTimeTakenByUser + "s"
    addScoreToLocalStorage(keybinds, randomComboLength, totalTimeTakenByUser, mistakeCounter)
    updateScoreDisplay()
    document.getElementById("theButton").value = "Play Again!"
}

function gameBeginMethod(){
    document.getElementById("timeTaken").innerHTML = "The Game is ON..."


}


function addScoreToLocalStorage(keybindArray, practiceLength, TimeTaken, NoOfMistakes){
    let scoreJSON = {
        keybinds: keybindArray,
        length: practiceLength,
        time: TimeTaken,
        mistakes: NoOfMistakes
    }
    let scoreArray = JSON.parse(localStorage.getItem('scoreArray'))
    scoreArray.push(scoreJSON)
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray))
}


function updateScoreDisplay(){
    let scoreToDisplay = JSON.parse(localStorage.getItem("scoreArray"))
    let scoresHTML = ""
    let i = 0
    for(i=0; i<scoreToDisplay.length; i++){
        scoresHTML += `
                    <div class="row">
                        <div class="rowElement">`+ (i+1) +`</div>
                        <div class="rowElement">`+scoreToDisplay[i].length+`</div>
                        <div class="rowElement">`+scoreToDisplay[i].time+`</div>
                        <div class="rowElement">`+scoreToDisplay[i].mistakes+`</div>
                    </div>
                    `
    }
    document.getElementById("scores").innerHTML = scoresHTML
}

function clearScores(){
    localStorage.setItem("scoreArray", "[]")
    updateScoreDisplay()
}





///////////////////////////////////////////////this is the randomcombostring (not array)
function randomComboStringGenerator(comboLength, keybinds){
    let comboString = "";

    let i = 0;

    for(i=0; i<comboLength; i++){
        let randomNum = Math.ceil((Math.random() * 1000))

        let randomKeybindPosition = randomNum % (keybinds.length)
        
        let nextAddString = keybinds[randomKeybindPosition];

        comboString = comboString.concat(nextAddString)
    }
    
    return (comboString)
}
