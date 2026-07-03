const hangman = document.getElementById('hangman-container')
const randomword = document.getElementById('random-word')
const alphabet = document.getElementById('alphabet')
const wrong = document.getElementById('wrong')
const hangmanimg=document.getElementById('images')
const resbutton=document.getElementById('resgame')

hangman.classList.add('hang')


const usegnuud = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const words = ['pinecone', 'anime', 'game', 'music', 'money'];
let clickedletter = []

  let fail = 0
  function islose(){
    if(fail===7){
        alert('lost')
        const lostel=document.createElement('div')
        lostel.innerHTML='lost'
        hangman.appendChild(lostel)
    }
  }
  function iswin(){
    if(randomword.innerHTML.toLowerCase()===word.toLowerCase()){
        alert('win')
    }
  }
for (let i = 0; i < usegnuud.length; i++) {
    const usegbutton = document.createElement('button')
    usegbutton.innerHTML = usegnuud[i]
    alphabet.appendChild(usegbutton)

  
    usegbutton.addEventListener('click', function () {
        usegbutton.disabled=true
        clickedletter.push(usegnuud[i])
        let displayletter = "";


        if (word.toUpperCase().includes(usegnuud[i]) === false) {
            fail ++
            wrong.innerHTML = `Fail: ${fail}`
            hangmanimg.src= fail +'.jpg'
        }
        islose()

        for (let j = 0; j < word.length; j++) {
            if (clickedletter.includes(word[j].toUpperCase())) {
                displayletter = displayletter + word[j];
                randomword.innerHTML = displayletter;
            } else {
                displayletter = displayletter + '_ ';
                randomword.innerHTML = displayletter;
            }
        }
        console.log(displayletter)
        iswin()
    })
}
const randomnumber = Math.floor(Math.random() * words.length)
const word = words[randomnumber]
if(fail>=6){
    alert("you lose" +word)
    
}

let display = ''
for (let i = 0; i < word.length; i++) {
    display = display + '_ '
} randomword.innerHTML = display

resbutton.addEventListener('click', function(){
    window.location.reload()
})

