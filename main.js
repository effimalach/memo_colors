const colors = ['#ff0000', '#ffff00', '#ff8800',
    '#00ff00', '#ff00ff', '#00ffff',
    '#0000ff', '#000000', '#ffffff',
    '#ce00ff', '#14930a', '#0af89d'];

// const cardsLi = document.querySelectorAll(".card");
// var savedCardsColors = []

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => p.querySelectorAll(s);
const globVarcardsBox = $('.cards-box');
const globPicker = $('.picker');

const random = (max,min=0)=>Math.round (Math.random()*(max-min))+min;
let firstTime = true;
let globVarCardsNum = 3;
let timeToMemorize = 2000;
let randomColors = [];
let cards; //nodelist of html div elements of the cards
let currentCardIndex =  0;

//document.getElementsByClassName("card1")[0].style.border = '4px solid red';
//cards[0].style.border = '4px solid red';


function startMemoryGame(){
    if (firstTime===true){
        firstTime= false;
        cards = createCards(globVarCardsNum,globVarcardsBox,$$);
        createAndColorPickerBoxs(colors,globPicker);  
    }
    currentCardIndex =  0;
    randomColors = pickAndSaveRandomColors(colors,globVarCardsNum);
    paintCards(cards,randomColors);
    setTimeout(hideCards,timeToMemorize,cards,setFocusedCard);
};


function createCards(cardsNum,cardsBox,qsa){
      for (let i = 0; i < cardsNum; i++) {
            cardsBox.innerHTML += `<div class ="card"></div>`;
        //   const card = document.createElement('div');
        //   card.className = 'card';
        //   cardsBox.appendChild(card)    
      }
      return qsa('.card');
  };
function createAndColorPickerBoxs(colorsArr,picker) {
    for (var color of colors) { 
         picker.innerHTML += `<div class="picker-box" 
                                   style="background-color:${color}"
                                   data-hex="${color}"
                                   hexa="${color}"> </div>`;

    //     const pickerBox = document.createElement("div");
    //     pickerBox.className = 'picker-box';
    //     pickerBox.style.background = color;
    //   //pickerBox.hexa=color;
    //     pickerBox.dataset.hexa=color;
    //     picker.appendChild(pickerBox);   
        
    }
    picker.addEventListener('click',onUserGuessedColor);
};
function pickAndSaveRandomColors(colorsArrOrigin,cardsNum) {
    const colorsArrCopy = colorsArrOrigin.concat(); // = [...colorsArrOrigin]
    const randomColors = [];
     for (let i=0; i<cardsNum;i++) {
        const color = colorsArrCopy[ random (colorsArrCopy.length-1) ]; 
        randomColors.push(color);
        colorsArrCopy.splice(colorsArrCopy.indexOf(color),1);
    }
    //#region alternative loop
    //  while (randomColors.length < cardsNum ) {
    //      const color = colorsArr[random(colorsArr.length)];
    //      if (randomColors.includes(color)===false) {
    //          randomColors.push(color);
    //      }
    //  }
//#endregion
    console.log('randomColors:',randomColors) ;
    return randomColors;
};  
function paintCards(cards,randColors){
for (const [i,card] of cards.entries()) {
    card.style.background = randColors[i];
  }
};
function hideCards(cards,callBack){
cards.forEach(card => {card.style.backgroundColor = '#ffffff';});
callBack(null,cards,0);
}
function setFocusedCard(previousCard,cards,i){    
    if (previousCard) previousCard.classList.remove('marked-card');
        cards[i].classList.add('marked-card');
    
};
function onUserGuessedColor(event) {
    //  console.log('inline style bg:',event.target.style.backgroundColor);
    //  console.log('attribute:',event.target.getAttribute('hexa'));
    ////console.log('js prop hexa:',event.target.hexa);
      console.log('dataset:',event.target.dataset.hex);
      console.log(randomColors);
      const pickedColor= event.target.dataset.hex;
      const currentColor = randomColors[currentCardIndex];
      if(pickedColor !== currentColor){
          notifyFailWin(false);
      } else if (currentCardIndex === globVarCardsNum - 1){
        colorCurrectCard(cards[currentCardIndex],currentColor)
        setTimeout(()=>{notifyFailWin(true);},16);
      }else {
          colorCurrectCard(cards[currentCardIndex],currentColor)
          currentCardIndex++;
          const previousCard = cards[currentCardIndex-1]
          setFocusedCard(previousCard,cards,currentCardIndex)
       }
};
function colorCurrectCard(card,color){
    card.style.backgroundColor = color;
};
function notifyFailWin(winמer) {
    let msg = winמer === true ? 'you win, ':'you lost, ';
    msg += 'play again?';
    const playAgain = confirm(msg);
    if (playAgain===true){
        cards[currentCardIndex].classList.remove('marked-card');
        startMemoryGame()
    }else{
        window.location.href = 'https://www.ynet.co.il'
    }

}



startMemoryGame();







