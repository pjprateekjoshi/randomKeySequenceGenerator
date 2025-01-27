//global variables
let currentIndex = 0
let startTime = null
let endTime = null
let mistakeCounter = 0
let keybinds = ['1', '2', '3', '4', '5', 'q','w','e','r','t','a','s','d','f','g','h','z','x','c','v','b',' ']
let altkeybinds = []
let randomComboLength = 50
let randomComboArray = []
let isAltKeyPressedByUser = false

gameSetup()


document.addEventListener("keyup", keyUpFunction)
document.addEventListener("keydown", keyDownFunction)

function keyDownFunction(e){
    e.preventDefault()
    let userInput = e.key
    if(userInput == "Alt"){
        isAltKeyPressedByUser = true
        showAltMiniTextOnCurrentKey()
    }else{
        document.getElementById("lastKeyPressed").innerHTML = userInput.toUpperCase()
        if(isAltKeyPressedByUser){
            if(randomComboArray[currentIndex].combineWith == "Alt"){
                if(userInput == randomComboArray[currentIndex].value){
                    userPressedCorrectKeyUpdate()
                }else{
                    userPressedIncorrectKeyUpdate()
                }
            }else{
                userPressedIncorrectKeyUpdate()
            }
        }else{

            if(randomComboArray[currentIndex].combineWith == "Alt"){
                    userPressedIncorrectKeyUpdate()
            }else{
                if(userInput == randomComboArray[currentIndex].value){
                    userPressedCorrectKeyUpdate()
                }else{
                    userPressedIncorrectKeyUpdate()
                }
            }
        }
    }
}

function keyUpFunction(e){
    e.preventDefault()
    if(e.key == "Alt") isAltKeyPressedByUser = false
    if(isAltKeyPressedByUser){
        showAltMiniTextOnCurrentKey()
    }else{
        hideAltMiniTextOnCurrentKey()
    }
}

function userPressedCorrectKeyUpdate(){
    if(currentIndex == 0) {
        startTime = Date.now()
        gameBeginMethod()
        mistakeCounter = 0
    }

    document.getElementsByClassName("lastKeyPressedContainer")[0].classList.remove("lastKeyPressedIncorrect")
    document.getElementsByClassName("lastKeyPressedContainer")[0].classList.add("lastKeyPressedCorrect")
    document.getElementById("tauntText").innerHTML = "!!"

    removeElementFromUI(currentIndex)

    currentIndex ++

    if (currentIndex < randomComboArray.length){
        document.getElementById(currentIndex.toString()).children[0].classList.add("active")
    }else{
        endTime = Date.now()
        gameOverMethod()
    }
}

function userPressedIncorrectKeyUpdate(){
    document.getElementsByClassName("lastKeyPressedContainer")[0].classList.remove("lastKeyPressedCorrect")
    document.getElementsByClassName("lastKeyPressedContainer")[0].classList.add("lastKeyPressedIncorrect")
    document.getElementById("tauntText").innerHTML = "??"
    document.getElementById(currentIndex.toString()).children[0].classList.add("incorrect")
    mistakeCounter ++;
}


//defined methods
function gameSetup(){
    if(document.URL.toString().split("?").length > 1 && document.URL.toString().split("?")[1].length > 0){
        let userSubmittedKeybind = document.URL.toString().split("=")[1].split("&")[0].replaceAll("+", " ")
        let userSubmittedAltKeybind = document.URL.toString().split("=")[2].split("&")[0].replaceAll("+", " ")
        let userSubmittedComboLength = document.URL.toString().split("=")[3]

        document.getElementById("customKeys").value = userSubmittedKeybind
        document.getElementById("altCustomKeys").value = userSubmittedAltKeybind
        document.getElementById("noOfKeystrokes").value = userSubmittedComboLength

        keybinds = userSubmittedKeybind.length > 0 ? userSubmittedKeybind.split('') : keybinds
        altkeybinds = userSubmittedAltKeybind.length > 0 ? userSubmittedAltKeybind.split('') : altkeybinds
        randomComboLength = Number(userSubmittedComboLength) > 0 ? Number(userSubmittedComboLength) : randomComboLength
    }

    let currentLocalStorageValue = localStorage.getItem("scoreArray")
    if(currentLocalStorageValue == null || currentLocalStorageValue == ""){
        localStorage.setItem("scoreArray", "[]")
    }

    updateScoreDisplay()

    let combinedKeybinds = keybindsCombiner(keybinds, altkeybinds)
    randomComboArray = randomComboArrayGenerator(randomComboLength, combinedKeybinds)

    let i = 0;
    for(i=0; i<randomComboArray.length; i++){
        addElementToUI(randomComboArray[i], i)
    }
}

function keybindsCombiner(theKeybinds, theAltKeybinds){
    let combinedKeybinds = []
    let i = 0;
    for(i=0; i<theKeybinds.length; i ++){
        let objectToAdd = {
            value : theKeybinds[i],
            combineWith: null
        }
        combinedKeybinds.push(objectToAdd)
    }
    for(i=0; i<theAltKeybinds.length; i ++){
        let objectToAdd = {
            value : theAltKeybinds[i],
            combineWith: "Alt"
        }
        combinedKeybinds.push(objectToAdd)
    }
    return combinedKeybinds
}
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

function addElementToUI(element, id) {
    const div = document.createElement('div')

    div.className = 'container'
    div.id = id.toString()
  
    firstElementClass = ""

    id == 0 ? firstElementClass = " active" : firstElementClass = ""
    let combineWithValue = element.combineWith ? element.combineWith : ""
    div.innerHTML = `
        <div class="charactercontainer`+ firstElementClass +`">`+
            `<sub class="supersmalltext">`+ 
            combineWithValue
            +`</sub>` +
            `<p class="character">`+ element.value +`</p>
        </div>
    `
    document.getElementById("loopcontainer").appendChild(div)
}

function removeElementFromUI(id) {
    document.getElementById(id.toString()).remove();
}

function gameOverMethod(){
    let totalTimeTakenByUser = (endTime - startTime)/1000
    document.getElementById("timeTaken").innerHTML = "Total Time Taken: " + totalTimeTakenByUser + "s"
    addScoreToLocalStorage(keybinds, randomComboLength, totalTimeTakenByUser, mistakeCounter)
    updateScoreDisplay()
    document.getElementById("theButton").value = "Play Again!"
    document.removeEventListener("keyup", keyUpFunction)
    document.removeEventListener("keydown", keyDownFunction)
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
    let leastTimeTaken = 9999999999
    let flawlessScoring = {leastMistakesMade: -1, flawlessLeastTimeTake: 9999999999}
    let idLeastTimeTaken = -1
    let idFlawlessLeastTimeTaken = -1
    for(i=0; i<scoreToDisplay.length; i++){
        if(scoreToDisplay[i].mistakes < flawlessScoring.leastMistakesMade){
            if(scoreToDisplay[i].leastTimeTaken < flawlessScoring.flawlessLeastTimeTake){
                flawlessScoring.leastMistakesMade = scoreToDisplay[i].mistakes
                flawlessScoring.flawlessLeastTimeTake = scoreToDisplay[i].leastTimeTaken
                idFlawlessLeastTimeTaken = i
            }
        }

        if(scoreToDisplay[i].leastTimeTaken < leastTimeTaken){
            leastTimeTaken = scoreToDisplay[i].leastTimeTaken
            idLeastTimeTaken = i
        }
        scoresHTML += `
                    <div class="row" id="`+ "score" + i +`">
                        <div class="rowElement">`+ (i+1) +`</div>
                        <div class="rowElement">`+scoreToDisplay[i].length+`</div>
                        <div class="rowElement">`+scoreToDisplay[i].time+`</div>
                        <div class="rowElement">`+scoreToDisplay[i].mistakes+`</div>
                    </div>
                    `
    }
    document.getElementById("scores").innerHTML = scoresHTML
    console.log(idLeastTimeTaken, idFlawlessLeastTimeTaken)
    document.getElementById("score" + idLeastTimeTaken.toString()) ? document.getElementById("score" + idLeastTimeTaken).classList.add("highlighted") : null
    document.getElementById("score" + idFlawlessLeastTimeTaken.toString()) ? document.getElementById("score" + idFlawlessLeastTimeTaken).classList.add("highlighted") : null
    document.getElementById("scores").innerHTML = scoresHTML
}

function clearScores(){
    localStorage.setItem("scoreArray", "[]")
    updateScoreDisplay()
}

function showAltMiniTextOnCurrentKey(){
    document.getElementById("altDisplayer").innerHTML = "Alt"
}
function hideAltMiniTextOnCurrentKey(){
    document.getElementById("altDisplayer").innerHTML = ""
}