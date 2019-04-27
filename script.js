class Game {
    constructor() {
        this.rowButton = document.querySelector('button.row')
        this.playButtons = document.querySelectorAll('button.btnG')
        this.startGameButton = document.querySelector('button.btnStart')
        this.MainH3 = document.querySelector('h3.grey')
        this.answersWrap = document.querySelector('div.answer-wrap')
        this.XGame = document.querySelector('div.stop')
        this.answerButtons = document.querySelectorAll('button.answer')
        this.spanInfo = document.querySelector('span.game')
        this.alert = document.querySelector('div.alert')
        this.gameProgress = document.querySelector('div.game-progress')
        this.gameBlock = document.querySelector('.button-wrap-after')
        this.numOfIterations = 0
        this.lvl
        this.userScore = 0
        this.a
        this.b
        this.score
    
        window.addEventListener('resize', () => {
            if (this.answersWrap.classList.contains('ingame')) {
                this.move(1)
            }
        })
        window.addEventListener('reload', e => this.changeInlineStyle(e, 'overflow', 'hidden'))
        this.rowButton.addEventListener('click', this.move)
        this.playButtons.forEach(e => {
            e.addEventListener('click', this.move)
            e.addEventListener('click', e => {
                this.lvl = e.target.classList
            })
        })
        this.playButtons.forEach(e => {
            e.addEventListener('click', el => {
                this.playButtons.forEach(e => {
                    e.classList.remove('on')
                })
                el.target.classList.add('on')
            })
        })
        this.answerButtons.forEach(e => {
            e.addEventListener('click', el => {
                this.numOfIterations++;
                if (el.target.textContent == this.score) {
                    this.userScore++
                    this.alert.classList.add('true')
                    this.changeInlineStyle(this.alert, 'animation', 'alert .75s linear both')
                    window.setTimeout(() => {
                        this.alert.classList.remove('true')
                        this.changeInlineStyle(this.alert, 'animation', '')
                    }, 750)
                } else if (el.target.textContent != this.score) {
                    this.alert.classList.add('false')
                    this.alert.style.animation = 'alert .75s linear both'
                    window.setTimeout(() => {
                        this.alert.classList.remove('false')
                        this.alert.style.animation = ''
                    }, 750)
                }
                if (this.numOfIterations < 10)
                    this.inGame()
                else
                    this.endGame(this.userScore)
            })
        })
        this.startGameButton.addEventListener('click', this.inGame.bind(this))
        this.XGame.addEventListener('click', () => this.endGame(this.userScore))
    }

    startGame() {
        this.toggleClass(document.querySelectorAll('.start'), 'start', 'ingame')
    }
    inGame() {
        this.changeInlineStyle(this.gameBlock, 'display', 'block')
        this.changeInlineStyle(document.body, 'overflow', 'hidden')
        this.startGame()
        this.move()
        this.playButtons.forEach(e => {
            e.addEventListener('click', el => {
                this.playButtons.forEach(e => {
                    e.classList.remove('on')
                })
                el.target.classList.add('on')
            })
        })

        this.playButtons.forEach(e => {
            if (e.classList.contains('on'))
                this.lvl = [...e.classList][0]
        })

        this.arr = this.createExcersiseValues(this.lvl, this.numOfIterations)
        this.a = this.arr[0]
        this.b = this.arr[1]

        this.score = this.createScore(this.lvl, this.numOfIterations, this.a, this.b)
        this.createAnswers(this.score)
        this.createSpanInfotextContent(this.lvl, this.numOfIterations, this.a, this.b)
        this.createShowProgress(this.lvl, this.numOfIterations)
    }
    endGame(user_Score) {
        this.toggleClass(document.querySelectorAll('.ingame'), 'ingame', 'start')
        this.changeInlineStyle(document.body, 'overflow', 'visible')
        this.changeInlineStyle(this.gameBlock, 'display', 'none')
        this.MainH3.innerHTML = `Twoja ilośc punktów: ${user_Score}/10 <br> Zagraj jeszcze raz!`
        this.MainH3.classList.add('end')
        this.resetScoreAndNumIteration()
    }
    toggleClass(obj, toRemove, toAdd) {
        obj.forEach(e => {
            e.classList.remove(toRemove)
            e.classList.add(toAdd)
        })
    }
    changeInlineStyle(element, property, value) {
        element.style[property] = value
    }
    resetScoreAndNumIteration() {
        this.userScore = 0
        this.numOfIterations = 0
    }
    move(x = 500) {
        const time = x
        $('body,html').animate({
            scrollTop: ($('div.wrap-game').offset().top - window.innerHeight / 4)
        }, time)
    }
    createExcersiseValues(lvl, numOfIterations) {
        if (lvl == 'easy') {
            this.a = Math.floor((Math.random() * 50))
            this.b = Math.floor((Math.random() * 50))
        } else if (lvl == 'medium' && numOfIterations < 7) {
            this.a = Math.floor((Math.random() * 50) + 25)
            this.b = Math.floor((Math.random() * 50) + 25)
        } else if (lvl == 'medium' && numOfIterations >= 7) {
            this.a = Math.floor((Math.random() * 13) + 5)
            this.b = Math.floor((Math.random() * 13) + 5)
        } else if (lvl == 'hard' && numOfIterations <= 5) {
            this.a = Math.floor((Math.random() * 50) + 13)
            this.b = Math.floor((Math.random() * 50) + 13)
        } else if (lvl == 'hard' && numOfIterations <= 7) {
            this.a = Math.floor((Math.random() * 14) + 12)
            this.b = Math.floor((Math.random() * 14) + 12)
        } else if (lvl == 'hard' && numOfIterations > 7) {
            this.a = Math.floor((Math.random() * 5) + 1)
            this.b = Math.floor((Math.random() * 5) + 1)
        }
        return [this.a, this.b]
    }
    createScore(lvl, numOfIterations, a, b) {
        if (lvl == 'easy' && numOfIterations < 5)
            this.score = a + b;
        else if (lvl == 'easy' && numOfIterations >= 5)
            this.score = Math.max(a, b) - Math.min(a, b)
        else if (lvl == 'medium' && numOfIterations <= 3) {
            this.score = a + b;
        } else if (lvl == 'medium' && numOfIterations <= 6) {
            this.score = Math.max(a, b) - Math.min(a, b)
        } else if (lvl == 'medium' && numOfIterations >= 7) {
            this.score = a * b;
        } else if (lvl == 'hard' && numOfIterations <= 1) {
            this.score = a + b
        } else if (lvl == 'hard' && numOfIterations <= 4) {
            this.score = Math.max(a, b) - Math.min(a, b)
        } else if (lvl == 'hard' && numOfIterations <= 7) {
            this.score = a * b;
        } else if (lvl == 'hard' && numOfIterations > 7) {
            this.score = a ** b
        }
        return this.score
    }
    createAnswers(score) {
        let usedIndexOFButtons = ""
        let randomIndex = Math.floor((Math.random() * 4))
        this.answerButtons[randomIndex].textContent = score;
        usedIndexOFButtons += randomIndex;
        let doubled = false

        while (usedIndexOFButtons.length != 4) {
            randomIndex = Math.floor((Math.random() * 4))
            if (usedIndexOFButtons.includes(randomIndex) == false) {
                let badAnswer = Math.floor(Math.random() * (1.2 * score - 0.8 * score) + 0.8 * score)
                do {
                    doubled = false
                    this.answerButtons.forEach(e => {
                        if (e.textContent == badAnswer)
                            doubled = true
                    })
                    if (doubled)
                        badAnswer++
                } while (doubled)
                this.answerButtons[randomIndex].textContent = badAnswer
                usedIndexOFButtons += randomIndex;
            }
        }
    }
    createSpanInfotextContent(lvl, numOfIterations, a, b) {
        if (lvl == 'easy' && numOfIterations < 5)
            this.spanInfo.textContent = (`${a}+${b}=?`)
        else if (lvl == 'easy' && numOfIterations >= 5)
            this.spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
        else if (lvl == 'medium' && numOfIterations <= 3)
            this.spanInfo.textContent = (`${a}+${b}=?`)
        else if (lvl == 'medium' && numOfIterations <= 6)
            this.spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
        else if (lvl == 'medium' && numOfIterations >= 7)
            this.spanInfo.textContent = (`${a}*${b}=?`)
        else if (lvl == 'hard' && numOfIterations <= 1) {
            this.spanInfo.textContent = (`${a}+${b}=?`)
        } else if (lvl == 'hard' && numOfIterations <= 4) {
            this.spanInfo.textContent = (`${Math.max(a, b)}-${Math.min(a, b)}=?`)
        } else if (lvl == 'hard' && numOfIterations <= 7) {
            this.spanInfo.textContent = (`${a}*${b}=?`)
        } else if (lvl == 'hard' && numOfIterations > 7) {
            this.spanInfo.innerHTML = (`${a}<sup>${b}</sup>=?`)
        }
    }
    createShowProgress(_lvl, numOfIterations) {
        switch (_lvl) {
            case 'easy':
                this.gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Łatwy`
                break
            case 'medium':
                this.gameProgress.innerHTML = `${numOfIterations* + 1}/10<br>Poziom: Średni`
                break
            default:
                this.gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Trudny`
        }
    }

}
const gameMethod = new Game()