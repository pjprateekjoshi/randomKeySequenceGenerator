let keybinds = ['1', '2', '3', '4', '5', 'q','w','e','r','t','a','s','d','f','g','h','z','x','c','v','b',' ']

let altkeybinds = ['1', '2', '3', '4', '5', 'q','w','e','r','t','a','s','d','f','g','h','z','x','c','v','b',' ']

randomComboLength = 10

function randomComboArrayGenerator(comboLength, keybinds){
    let comboArray = [];

    let i = 0;

    for(i=0; i<comboLength; i++){
        let randomNum = Math.ceil((Math.random() * 1000))

        let randomKeybindPosition = randomNum % (keybinds.length)
        
        let nextAddElement = keybinds[randomKeybindPosition];

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

function keyUpFunction(){

    let userInput = document.getElementById("userInput").value

    document.getElementById("lastKeyPressed").innerHTML = userInput.toUpperCase();

    if(userInput == randomComboArray[currentIndex]){
        if(currentIndex == 0) {
            startTime = Date.now()
            gameBeginMethod()
        }

        document.getElementsByClassName("lastKeyPressed")[0].classList.remove("lastKeyPressedIncorrect")
        document.getElementsByClassName("lastKeyPressed")[0].classList.add("lastKeyPressedCorrect")
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
        document.getElementsByClassName("lastKeyPressed")[0].classList.remove("lastKeyPressedCorrect")
        document.getElementsByClassName("lastKeyPressed")[0].classList.add("lastKeyPressedIncorrect")
        document.getElementById("tauntText").innerHTML = "??"
        document.getElementById(currentIndex.toString()).children[0].classList.add("incorrect")
    }

    document.getElementById("userInput").value=""

}


function removeElement(id) {
    document.getElementById(id.toString()).remove();
}


function gameOverMethod(){
    let totalTimeTakenByUser = endTime - startTime
    console.log(totalTimeTakenByUser)
    document.getElementById("timeTaken").innerHTML = "Total Time Taken: " + totalTimeTakenByUser
}

function gameBeginMethod(){
    document.getElementById("timeTaken").innerHTML = "The Game Has Begun"
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
