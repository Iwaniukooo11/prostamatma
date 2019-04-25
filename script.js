const rowButton = document.querySelector('button.row')
const playButtons = document.querySelectorAll('button.btnG')
const startGameButton = document.querySelector('button.btnStart')
const MainH3 = document.querySelector('h3.grey')
const answersWrap = document.querySelector('div.answer-wrap')
const XGame = document.querySelector('div.stop')
const answerButtons = document.querySelectorAll('button.answer')
const spanInfo = document.querySelector('span.game')
const alert = document.querySelector('div.alert')
const gameProgress = document.querySelector('div.game-progress')
const gameBlock = document.querySelector('.button-wrap-after')
let numOfIterations = 0
let lvl, userScore = 0
let a, b, score

class Game {
    startGame() {
        document.querySelectorAll('.start').forEach(e => {
            e.classList.remove('start')
            e.classList.add('ingame')
        })
    }
    inGame() {
        gameBlock.style.display = 'block'
        gameMetods.startGame()
        gameMetods.move()

        playButtons.forEach((e) => {
            e.addEventListener('click', el => {
                playButtons.forEach(e => {
                    e.classList.remove('on')
                })
                el.target.classList.add('on')
            })
        })

        document.body.style.overflow = 'hidden'
        playButtons.forEach((e) => {
            if (e.classList.contains('on'))
                lvl = [...e.classList][0]
        })

        const arr = gameMetods.createAB(lvl, numOfIterations)
        a = arr[0]
        b = arr[1]

        score = gameMetods.createScore(lvl, numOfIterations)
        gameMetods.createAnswers(score)
        gameMetods.createSpanInfotextContent(lvl, numOfIterations)
        gameMetods.createShowProgress(lvl, numOfIterations)
    }
    endGame(userScore) {
        document.querySelectorAll('.ingame').forEach(e => {
            e.classList.remove('ingame')
            e.classList.add('start')
        })
        userScore = 0
        numOfIterations = 0
        document.body.style.overflow = 'visible'
        MainH3.innerHTML = `Twoja ilośc punktów: ${userScore}/10 <br> Zagraj jeszcze raz!`
        MainH3.classList.add('end')
        gameBlock.style.display = 'none'
    }
    move(x = 500) {
        const time = x
        $('body,html').animate({
            scrollTop: ($('div.wrap-game').offset().top - window.innerHeight / 4)
        }, time)
    }
    createAB(lvl, numOfIterations) {
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
        return [a, b]
    }
    createScore(lvl, numOfIterations) {
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
        return score
    }
    createAnswers(score) {
        let usedIndexOFButtons = ""
        let randomIndex = Math.floor((Math.random() * 4))
        answerButtons[randomIndex].textContent = score;
        usedIndexOFButtons += randomIndex;
        let j = 0;
        let doubled = false

        while (usedIndexOFButtons.length != 4) {
            randomIndex = Math.floor((Math.random() * 4))
            if (usedIndexOFButtons.includes(randomIndex) == false && answerButtons[j].textContent != "a") {
                let badAnswer = Math.floor(Math.random() * (1.2 * score - 0.8 * score) + 0.8 * score)
                do {
                    doubled = false
                    answerButtons.forEach(e => {
                        if (e.textContent == badAnswer)
                            doubled = true
                    })
                    if (doubled)
                        badAnswer++
                } while (doubled)
                answerButtons[randomIndex].textContent = badAnswer
                usedIndexOFButtons += randomIndex;
            }
            j++
            if (j == 4)
                j = 0
        }
    }
    createSpanInfotextContent(lvl, numOfIterations) {
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
    }
    createShowProgress(lvl, numOfIterations) {
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
}
const gameMetods = new Game()

window.addEventListener('resize', () => {
    if (answersWrap.classList.contains('ingame')) {
        move(1)
    }
})
window.addEventListener('reload', (e) => {
    e.style.overflow = "visible"
})

rowButton.addEventListener('click', gameMetods.move)

playButtons.forEach((e) => {
    e.addEventListener('click', gameMetods.move)
    e.addEventListener('click', e => {
        lvl = e.target.classList
    })
})
playButtons.forEach(e => {
    e.addEventListener('click', el => {
        playButtons.forEach(e => {
            e.classList.remove('on')
        })
        el.target.classList.add('on')
    })
})
answerButtons.forEach(e => {
    e.addEventListener('click', el => {
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
            gameMetods.inGame()
        else
            gameMetods.endGame(userScore)
    })
})

startGameButton.addEventListener('click', gameMetods.inGame)

XGame.addEventListener('click', () => {
    gameMetods.endGame(userScore)
})