/*
CREATED BY: BHUWAN SHARMA
*/
'use strict';
let imagex = [
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  14,
  14,
  15,
  15,
  16,
  16,
  17,
  17,
  18,
  18
]; 
let steps = 0, refresh = 0,matched = 0;
let opened = {};
let cards = {};

// DOM elements init
const levelbtn1DOM = document.getElementById('levelbtn');
const levelbtn2DOM = document.getElementById('levelbtn');
const levelbtn3DOM = document.getElementById('levelbtn');
const helpDOM = document.getElementById('help');
const aboutDOM = document.getElementById('about');
const screenDOM = document.getElementById('screen');
const timeRemainingDOM = document.getElementById('timeRemaining');
const gameDOM = document.getElementById('game');
const buttonsDOM = document.getElementById('buttons');
// randomize method
const randomize =()=>
{
  let i;
  for ( i= imagex.length - 1; i > 1; i--)
  {
    let r = Math.floor(Math.random() * i);
    let t = imagex[i];
    imagex[i] = imagex[r];
    imagex[r] = t;
  }
  return imagex.slice(0, 36);
}

// set card method
const setCards = ()=>
{
  let i;
  for ( i = 0; i < 36; i++)
  {
    let card = {};
    card['id'] = 'btn' + i;
    card['clicked'] = false;
    card['url'] = `./img/${imagex[i]}.png`;
    cards['btn' + i] = card;
  }
}

// draw method
const draw = ()=>
{
  let x = 0;
  let q = `<table cellpadding=0 cellspacing=0><tr>`;
  for (let i = 0; i < 6; i++)
  {
    for (let j = 0; j < 6; j++)
    {
      q +=`<td><div class=buttonX id=btn${x++} onclick = 'drawCard(this.id)'></div></td>`;
    }
    q += `</tr><tr>`;
  }
  screenDOM.innerHTML = `${q} </tr></table>`;
}

const help = ()=>
{
  buttonsDOM.remove();
 screenDOM.style.display = 'block';
  let q = `In this game you have to match all pair of fruits in given time to win this game
    <br/><br/> <a href='http://bhu1sharma.github.io'> Back</a>`;
  screenDOM.innerHTML = q;
  gameDOM.appendChild(screenDOM);
}
const about = ()=>
{
  buttonsDOM.remove();
 screenDOM.style.display = 'block';
  let q = `This game is developed by Bhuwan Sharma <br/>
            <a href='mailto:bhuwansharma.1996@gmail.com'>Mail me</a> for reporting bugs or any improvement<br/><br/>
            <a href='http://bhu1sharma.github.io> Back</a>`;
  screenDOM.innerHTML = q;
  gameDOM.appendChild(screenDOM);
}
const reload = ()=>
{
  location.reload();
}

const drawCard = (id)=> 
{
  let card = cards[id];
  if (matched === 18)  
  {
    document.getElementById(card.id).style.backgroundImage `url(${card.url})`;
    screenDOM.innerHTML = `YOU WON after ${steps} steps!`;
    timeRemainingDOM.remove();
    clearTimeout(countdownTimer);
    setTimeout(reload,3000);
  }
  else if (card.clicked === true) 
  {
  }
  else if (opened === undefined) 
  {
    console.log(card);
  }
  else if (card.url === opened.url)  
  {
    if (matched === 17) 
    {
    document.getElementById(card.id).style.backgroundImage= `url(${card.url})`;
    screenDOM.innerHTML = `YOU WON after ${steps} steps!`;
    timeRemainingDOM.remove();
    setTimeout(reload,3000);
    }
    else 
    {
      steps++;
      matched++;
      document.getElementById(card.id).style.backgroundImage= `url(${card.url})`;
      cards[card.id].clicked = true;
      cards[opened.id].clicked = true;
      document.getElementById(card.id).disabled = true;
      document.getElementById(opened.id).disabled = true;
      opened = {};
      refresh = 0;
    }
  }
  else if (card.url !== opened.url && refresh !== 0) 
  {
    document.body.style.pointerEvents = 'none';
    document.getElementById(card.id).style.backgroundImage= `url(${card.url})`;

    setTimeout(()=>
    {
      document.body.style.pointerEvents = 'auto';
      steps++;
      refresh++;
    document.getElementById(id).style.backgroundImage=null;
    document.getElementById(opened.id).style.backgroundImage=null;
      cards[opened.id].clicked = false;
      opened ={};
      card.clicked = false;
      cards[id] = card;
      refresh=0;
    },500);
  }
  else if (refresh === 0)
  {
    steps++;
    refresh++;
    opened = card;
    card.clicked = true;
    cards[id] = card;
    opened = card;
    document.getElementById(id).style.backgroundImage=`url(${card.url})`;
  }
  else 
  {
    console.log('unchecked'); 
  }
}


// TIMER method
const timer = (ms)=>
 { 
  buttonsDOM.remove();
  screenDOM.style.display = 'block';
  draw(); 
  setCards();
  let min = (ms/60)-1;
  let sec = 59;
  if(ms<60){min = 0;sec = ms}
  let countdownTimer = setInterval(()=>
  {
    if (sec <= 0 && min<=0)
    {
      screenDOM.innerHTML = 'Time Over!';
      timeRemainingDOM.remove();
      clearTimeout(countdownTimer);
      setTimeout(reload,3000);
    }
    else
    {
      if(timeRemainingDOM!=null)
              timeRemainingDOM.innerHTML =`<b>${((min<10)?'0'+min:min)}:${((sec<10)?'0'+sec:sec)}</b>`;  //Printing time in MM:SS formatt
      if(sec--<=0)
      {
        sec = 59;
        min--;
      }
    }
  }, 1000);
}


imagex = randomize(); 
