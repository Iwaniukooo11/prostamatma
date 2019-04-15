const main = document.querySelector('main')
const rowButton = document.querySelector('button.row')
const playButtons = document.querySelectorAll('button.btnG')
const startGameButton = document.querySelector('button.btnStart')
let clicked = false
let numOfIterations = 0
let lvl, userScore = 0
let a, b, score, x, j, used, w, doubled
const MainH3 = document.querySelector('h3.grey')
const answersWrap = document.querySelector('div.answer-wrap')
const XGame = document.querySelector('div.stop')
const answerButtons = document.querySelectorAll('button.answer')
const spanInfo = document.querySelector('span.game')
const alert = document.querySelector('div.alert')
const gameProgress = document.querySelector('div.game-progress')
const gameBlock = document.querySelector('.button-wrap-after')

const move = function () {
    $('body,html').animate({
        scrollTop: $('footer').offset().top - window.innerHeight
    }, 500)
}
const moveBottom = function () {
    $('html,body').animate({
        scrollTop: document.body.scrollHeight
    }, 2000);
}
window.addEventListener('reload', (e) => {
    e.style.overflow = "visible"
})
rowButton.addEventListener('click', move)
playButtons.forEach((e) => {
    e.addEventListener('click', move)
    e.addEventListener('click', (e) => {
        lvl = e.target.classList
    })
})
playButtons.forEach((e) => {
    e.addEventListener('click', (el) => {
        playButtons.forEach((e) => {
            e.classList.remove('on')
        })
        el.target.classList.add('on')
    })
})

const endOfGame = function (uS) {
    MainH3.classList.add('start')
    MainH3.classList.remove('ingame')
    startGameButton.classList.add('start')
    startGameButton.classList.remove('ingame')
    answersWrap.classList.add('start')
    answersWrap.classList.remove('ingame')
    XGame.classList.add('start')
    XGame.classList.remove('ingame')
    spanInfo.classList.remove('ingame')
    spanInfo.classList.add('start')
    gameProgress.classList.remove('ingame')
    gameProgress.classList.add('start')
    userScore = 0
    numOfIterations = 0
    document.body.style.overflow = 'visible'
    MainH3.innerHTML = `Twoja ilośc punktów: ${uS}/10 <br> Zagraj jeszcze raz!`
    MainH3.classList.add('end')
    gameBlock.style.display = 'none'
}

const game = function () {
    gameBlock.style.display = 'block'
    console.log("NumOFIteration:" + numOfIterations)
    console.log('score' + userScore)
    clicked = false
    playButtons.forEach((e) => {
        e.addEventListener('click', (el) => {
            playButtons.forEach((e) => {
                e.classList.remove('on')
            })
            el.target.classList.add('on')
        })
    })
    move()
    document.body.style.overflow = 'hidden'
    window.addEventListener('resize', move)
    playButtons.forEach((e) => {
        if (e.classList.contains('on'))
            lvl = [...e.classList][0]
    })
    MainH3.classList.remove('start')
    MainH3.classList.add('ingame')
    startGameButton.classList.remove('start')
    startGameButton.classList.add('ingame')
    answersWrap.classList.remove('start')
    answersWrap.classList.add('ingame')
    XGame.classList.add('ingame')
    XGame.classList.remove('start')
    spanInfo.classList.add('ingame')
    spanInfo.classList.remove('start')
    gameProgress.classList.add('ingame')
    gameProgress.classList.remove('start')

    used = ""
    if (lvl == 'easy') {
        a = Math.floor((Math.random() * 50))
        b = Math.floor((Math.random() * 50))
    } else if (lvl == 'medium' && numOfIterations < 7) {
        a = Math.floor((Math.random() * 50) + 25)
        b = Math.floor((Math.random() * 50) + 25)
    } else if (lvl == 'medium' && numOfIterations >= 7) {
        a = Math.floor((Math.random() * 13) + 5)
        b = Math.floor((Math.random() * 13) + 5)
    } else if (lvl == 'hard' && numOfIterations <= 5) {
        a = Math.floor((Math.random() * 50) + 13)
        b = Math.floor((Math.random() * 50) + 13)
    } else if (lvl == 'hard' && numOfIterations <= 7) {
        a = Math.floor((Math.random() * 14) + 12)
        b = Math.floor((Math.random() * 14) + 12)
    } else if (lvl == 'hard' && numOfIterations > 7) {
        a = Math.floor((Math.random() * 5) + 1)
        b = Math.floor((Math.random() * 5) + 1)
    }


    if (lvl == 'easy' && numOfIterations < 5)
        score = a + b;
    else if (lvl == 'easy' && numOfIterations >= 5)
        score = Math.max(a, b) - Math.min(a, b)
    else if (lvl == 'medium' && numOfIterations <= 3) {
        score = a + b;
    } else if (lvl == 'medium' && numOfIterations <= 6) {
        score = Math.max(a, b) - Math.min(a, b)
    } else if (lvl == 'medium' && numOfIterations >= 7) {
        score = a * b;
    } else if (lvl == 'hard' && numOfIterations <= 1) {
        score = a + b
    } else if (lvl == 'hard' && numOfIterations <= 4) {
        score = Math.max(a, b) - Math.min(a, b)
    } else if (lvl == 'hard' && numOfIterations <= 7) {
        score = a * b;
    } else if (lvl == 'hard' && numOfIterations > 7) {
        score = a ** b
    }

    x = Math.floor((Math.random() * 4))
    answerButtons[x].textContent = score;
    used += x;
    j = 0;
    while (used.length != 4) {
        x = Math.floor((Math.random() * 4))
        if (used.includes(x) == false && answerButtons[j].textContent != "a") {
            w = Math.floor(Math.random() * (1.2 * score - 0.8 * score) + 0.8 * score)
            do {
                doubled = false
                answerButtons.forEach((e) => {
                    if (e.textContent == w)
                        doubled = true
                })
                if (doubled)
                    w++
            } while (doubled)
            answerButtons[x].textContent = w
            used += x;
        }
        j++
        if (j == 4)
            j = 0
    }
    if (lvl == 'easy' && numOfIterations < 5)
        spanInfo.textContent = (`${a}+${b}=?`)
    else if (lvl == 'easy' && numOfIterations >= 5)
        spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
    else if (lvl == 'medium' && numOfIterations <= 3)
        spanInfo.textContent = (`${a}+${b}=?`)
    else if (lvl == 'medium' && numOfIterations <= 6)
        spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
    else if (lvl == 'medium' && numOfIterations >= 7)
        spanInfo.textContent = (`${a}*${b}=?`)
    else if (lvl == 'hard' && numOfIterations <= 1) {
        spanInfo.textContent = (`${a}+${b}=?`)
    } else if (lvl == 'hard' && numOfIterations <= 4) {
        spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
    } else if (lvl == 'hard' && numOfIterations <= 7) {
        spanInfo.textContent = (`${a}*${b}=?`)
    } else if (lvl == 'hard' && numOfIterations > 7) {
        spanInfo.innerHTML = (`${a}<sup>${b}</sup>=?`)
    }

    switch (lvl) {
        case 'easy':
            gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Łatwy`
            break
        case 'medium':
            gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Średni`
            break
        default:
            gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Trudny`
    }

}

startGameButton.addEventListener('click', game)

answerButtons.forEach((e) => {
    e.addEventListener('click', (el) => {
        clicked = true
        numOfIterations++;
        if (el.target.textContent == score) {
            userScore++
            alert.classList.add('true')
            alert.style.animation = 'alert .75s linear both'
            window.setTimeout(() => {
                alert.classList.remove('true')
                alert.style.animation = ''
            }, 750)

        } else if (el.target.textContent != score) {
            alert.classList.add('false')
            alert.style.animation = 'alert .75s linear both'
            window.setTimeout(() => {
                alert.classList.remove('false')
                alert.style.animation = ''
            }, 750)
        }
        if (numOfIterations < 10)
            game()
        else {
            endOfGame(userScore)
        }

    })
})

XGame.addEventListener('click', () => {
    endOfGame(userScore)
})