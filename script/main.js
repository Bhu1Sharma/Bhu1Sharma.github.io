"use strict";
let imagex = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18],
    steps = 0, refresh = 0, matched = 0, opened = {}, cards = {};
const levelbtn1DOM = document.getElementById("levelbtn"), levelbtn2DOM = document.getElementById("levelbtn"),
    levelbtn3DOM = document.getElementById("levelbtn"), helpDOM = document.getElementById("help"),
    aboutDOM = document.getElementById("about"), screenDOM = document.getElementById("screen"),
    timeRemainingDOM = document.getElementById("timeRemaining"), gameDOM = document.getElementById("game"),
    buttonsDOM = document.getElementById("buttons"), randomize = () => {
        let e;
        for (e = imagex.length - 1; e > 1; e--) {
            let t = Math.floor(Math.random() * e), n = imagex[e];
            imagex[e] = imagex[t], imagex[t] = n
        }
        return imagex.slice(0, 36)
    }, setCards = () => {
        let e;
        for (e = 0; e < 36; e++) {
            let t = {};
            t.id = "btn" + e, t.clicked = !1, t.url = `./img/${imagex[e]}.png`, cards["btn" + e] = t
        }
    }, draw = () => {
        let e = 0, t = "<table cellpadding=0 cellspacing=0><tr>";
        for (let n = 0; n < 6; n++) {
            for (let n = 0; n < 6; n++) t += `<td><div class=buttonX id=btn${e++} onclick = 'drawCard(this.id)'></div></td>`;
            t += "</tr><tr>"
        }
        screenDOM.innerHTML = `${t} </tr></table>`
    }, help = () => {
        buttonsDOM.remove(), screenDOM.style.display = "block";
        screenDOM.innerHTML = "In this game you have to match all pair of fruits in given time to win this game\n    <br/><br/> <a href='http://bhu1sharma.github.io/memory-game/'> Back</a>", gameDOM.appendChild(screenDOM)
    }, about = () => {
        buttonsDOM.remove(), screenDOM.style.display = "block";
        screenDOM.innerHTML = "This game is developed by Bhuwan Sharma <br/>\n            <a href='mailto:bhuwansharma.1996@gmail.com'>Mail me</a> for reporting bugs or any improvement<br/><br/>\n            <a href='http://bhu1sharma.github.io/memory-game/'> Back</a>", gameDOM.appendChild(screenDOM)
    }, reload = () => {
        location.reload()
    }, drawCard = e => {
        let t = cards[e];
        18 === matched ? (document.getElementById(t.id).style.backgroundImage`url(${t.url})`, screenDOM.innerHTML = `YOU WON after ${steps} steps!`, timeRemainingDOM.remove(), clearTimeout(countdownTimer), setTimeout(reload, 3e3)) : !0 === t.clicked || (void 0 === opened ? console.log(t) : t.url === opened.url ? 17 === matched ? (document.getElementById(t.id).style.backgroundImage = `url(${t.url})`, screenDOM.innerHTML = `YOU WON after ${steps} steps!`, timeRemainingDOM.remove(), setTimeout(reload, 3e3)) : (steps++, matched++, document.getElementById(t.id).style.backgroundImage = `url(${t.url})`, cards[t.id].clicked = !0, cards[opened.id].clicked = !0, document.getElementById(t.id).disabled = !0, document.getElementById(opened.id).disabled = !0, opened = {}, refresh = 0) : t.url !== opened.url && 0 !== refresh ? (document.body.style.pointerEvents = "none", document.getElementById(t.id).style.backgroundImage = `url(${t.url})`, setTimeout(() => {
            document.body.style.pointerEvents = "auto", steps++, refresh++, document.getElementById(e).style.backgroundImage = null, document.getElementById(opened.id).style.backgroundImage = null, cards[opened.id].clicked = !1, opened = {}, t.clicked = !1, cards[e] = t, refresh = 0
        }, 500)) : 0 === refresh ? (steps++, refresh++, opened = t, t.clicked = !0, cards[e] = t, opened = t, document.getElementById(e).style.backgroundImage = `url(${t.url})`) : console.log("unchecked"))
    }, timer = e => {
        buttonsDOM.remove(), screenDOM.style.display = "block", draw(), setCards();
        let t = e / 60 - 1, n = 59;
        e < 60 && (t = 0, n = e);
        let d = setInterval(() => {
            n <= 0 && t <= 0 ? (screenDOM.innerHTML = "Time Over!", timeRemainingDOM.remove(), clearTimeout(d), setTimeout(reload, 3e3)) : (null != timeRemainingDOM && (timeRemainingDOM.innerHTML = `<b>${t < 10 ? "0" + t : t}:${n < 10 ? "0" + n : n}</b>`), n-- <= 0 && (n = 59, t--))
        }, 1e3)
    };
imagex = randomize();