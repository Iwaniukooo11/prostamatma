/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Game {\n  constructor() {\n    this.rowButton = document.querySelector('.about__row-btn');\n    this.playButtons = document.querySelectorAll('.game__btn-lvl');\n    this.startGameButton = document.querySelector('.game__btnStart');\n    this.MainStatus = document.querySelector('.game__score');\n    this.answersWrap = document.querySelector('.game__answer-wrap');\n    this.XGame = document.querySelector('.game__end-game');\n    this.answerButtons = document.querySelectorAll('.game__answer');\n    this.spanInfo = document.querySelector('.game__exercise');\n    this.alert = document.querySelector('.game__alert');\n    this.gameProgress = document.querySelector('.game__progress');\n    this.gameBlock = document.querySelector('.game__button-wrap--after');\n    this.numOfIterations = 0;\n    this.lvl;\n    this.userScore = 0;\n    this.a;\n    this.b;\n    this.score;\n    window.addEventListener('resize', () => {\n      if (this.answersWrap.classList.contains('ingame')) {\n        this.move(1);\n      }\n    });\n    window.addEventListener('reload', e => this.changeInlineStyle(e, 'overflow', 'hidden'));\n    this.rowButton.addEventListener('click', this.move);\n    this.playButtons.forEach(e => {\n      e.addEventListener('click', this.move);\n    });\n    this.playButtons.forEach(e => {\n      e.addEventListener('click', el => {\n        this.playButtons.forEach(e => {\n          e.classList.remove('on');\n        });\n        el.target.classList.add('on');\n      });\n    });\n    this.answerButtons.forEach(e => {\n      e.addEventListener('click', el => {\n        this.numOfIterations++;\n\n        if (el.target.textContent == this.score) {\n          this.userScore++;\n          this.alert.classList.add('true');\n          this.changeInlineStyle(this.alert, 'animation', 'alert .75s linear both');\n          window.setTimeout(() => {\n            this.alert.classList.remove('true');\n            this.changeInlineStyle(this.alert, 'animation', '');\n          }, 750);\n        } else if (el.target.textContent != this.score) {\n          this.alert.classList.add('false');\n          this.alert.style.animation = 'alert .75s linear both';\n          window.setTimeout(() => {\n            this.alert.classList.remove('false');\n            this.alert.style.animation = '';\n          }, 750);\n        }\n\n        if (this.numOfIterations < 10) this.inGame();else this.endGame(this.userScore);\n      });\n    });\n    this.startGameButton.addEventListener('click', this.inGame.bind(this));\n    this.XGame.addEventListener('click', () => this.endGame(this.userScore));\n  }\n\n  startGame() {\n    this.toggleClass(document.querySelectorAll('.start'), 'start', 'ingame');\n  }\n\n  inGame() {\n    this.changeInlineStyle(this.gameBlock, 'display', 'block');\n    this.changeInlineStyle(document.body, 'overflow', 'hidden');\n    this.startGame();\n    this.move();\n    this.playButtons.forEach(e => {\n      e.addEventListener('click', el => {\n        this.playButtons.forEach(e => {\n          e.classList.remove('on');\n        });\n        el.target.classList.add('on');\n      });\n    });\n    this.playButtons.forEach(e => {\n      if (e.classList.contains('on')) // this.lvl = [...e.classList][0]\n        this.lvl = e.dataset.lvl;\n    });\n    this.arr = this.createExcersiseValues(this.lvl, this.numOfIterations);\n    this.a = this.arr[0];\n    this.b = this.arr[1];\n    this.score = this.createScore(this.lvl, this.numOfIterations, this.a, this.b);\n    this.createAnswers(this.score);\n    this.createSpanInfotextContent(this.lvl, this.numOfIterations, this.a, this.b);\n    this.createShowProgress(this.lvl, this.numOfIterations);\n  }\n\n  endGame(user_Score) {\n    this.toggleClass(document.querySelectorAll('.ingame'), 'ingame', 'start');\n    this.changeInlineStyle(document.body, 'overflow', 'visible');\n    this.changeInlineStyle(this.gameBlock, 'display', 'none');\n    this.MainStatus.innerHTML = `Twoja ilośc punktów: ${user_Score}/10 <br> Zagraj jeszcze raz!`;\n    this.MainStatus.classList.add('end');\n    this.resetScoreAndNumIteration();\n  }\n\n  toggleClass(obj, toRemove, toAdd) {\n    obj.forEach(e => {\n      e.classList.remove(toRemove);\n      e.classList.add(toAdd);\n    });\n  }\n\n  changeInlineStyle(element, property, value) {\n    element.style[property] = value;\n  }\n\n  resetScoreAndNumIteration() {\n    this.userScore = 0;\n    this.numOfIterations = 0;\n  }\n\n  move(x = 500) {\n    const time = x;\n    $('body,html').animate({\n      scrollTop: $('.game__button-wrap').offset().top - window.innerHeight / 4\n    }, time);\n  }\n\n  createExcersiseValues(lvl, numOfIterations) {\n    switch (lvl) {\n      case 'easy':\n        this.a = Math.floor(Math.random() * 50);\n        this.b = Math.floor(Math.random() * 50);\n        break;\n\n      case 'medium':\n        if (numOfIterations < 7) {\n          this.a = Math.floor(Math.random() * 50 + 25);\n          this.b = Math.floor(Math.random() * 50 + 25);\n        } else {\n          this.a = Math.floor(Math.random() * 13 + 5);\n          this.b = Math.floor(Math.random() * 13 + 5);\n        }\n\n        break;\n\n      case 'hard':\n        if (numOfIterations <= 5) {\n          this.a = Math.floor(Math.random() * 50 + 13);\n          this.b = Math.floor(Math.random() * 50 + 13);\n        } else if (numOfIterations <= 7) {\n          this.a = Math.floor(Math.random() * 14 + 12);\n          this.b = Math.floor(Math.random() * 14 + 12);\n        } else {\n          this.a = Math.floor(Math.random() * 5 + 1);\n          this.b = Math.floor(Math.random() * 5 + 1);\n        }\n\n        break;\n    }\n\n    return [this.a, this.b];\n  }\n\n  createScore(lvl, numOfIterations, a, b) {\n    switch (lvl) {\n      case 'easy':\n        if (numOfIterations < 5) this.score = a + b;else this.score = Math.max(a, b) - Math.min(a, b);\n        break;\n\n      case 'medium':\n        if (numOfIterations <= 3) this.score = a + b;else if (numOfIterations <= 6) this.score = Math.max(a, b) - Math.min(a, b);else this.score = a * b;\n        break;\n\n      case 'hard':\n        if (numOfIterations <= 1) this.score = a + b;else if (numOfIterations <= 4) this.score = Math.max(a, b) - Math.min(a, b);else if (numOfIterations <= 7) this.score = a * b;else this.score = a ** b;\n        break;\n    }\n\n    return this.score;\n  }\n\n  createAnswers(score) {\n    let usedIndexOFButtons = '';\n    let randomIndex = Math.floor(Math.random() * 4);\n    this.answerButtons[randomIndex].textContent = score;\n    usedIndexOFButtons += randomIndex;\n    let doubled = false;\n\n    while (usedIndexOFButtons.length != 4) {\n      randomIndex = Math.floor(Math.random() * 4);\n\n      if (usedIndexOFButtons.includes(randomIndex) == false) {\n        let badAnswer = Math.floor(Math.random() * (1.2 * score - 0.8 * score) + 0.8 * score);\n\n        do {\n          doubled = false;\n          this.answerButtons.forEach(e => {\n            if (e.textContent == badAnswer) doubled = true;\n          });\n          if (doubled) badAnswer++;\n        } while (doubled);\n\n        this.answerButtons[randomIndex].textContent = badAnswer;\n        usedIndexOFButtons += randomIndex;\n      }\n    }\n  }\n\n  createSpanInfotextContent(lvl, numOfIterations, a, b) {\n    switch (lvl) {\n      case 'easy':\n        if (numOfIterations < 5) this.spanInfo.textContent = `${a}+${b}=?`;else this.spanInfo.textContent = `${Math.max(a, b)}-${Math.min(a, b)}=?`;\n        break;\n\n      case 'medium':\n        if (numOfIterations <= 3) this.spanInfo.textContent = `${a}+${b}=?`;else if (numOfIterations <= 6) this.spanInfo.textContent = `${Math.max(a, b)}-${Math.min(a, b)}=?`;else this.spanInfo.textContent = `${a}*${b}=?`;\n        break;\n\n      case 'hard':\n        if (numOfIterations <= 1) this.spanInfo.textContent = `${a}+${b}=?`;else if (numOfIterations <= 4) this.spanInfo.textContent = `${Math.max(a, b)}-${Math.min(a, b)}=?`;else if (numOfIterations <= 7) this.spanInfo.textContent = `${a}*${b}=?`;else this.spanInfo.innerHTML = `${a}<sup>${b}</sup>=?`;\n        break;\n    }\n  }\n\n  createShowProgress(lvl, numOfIterations) {\n    switch (lvl) {\n      case 'easy':\n        this.gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Łatwy`;\n        break;\n\n      case 'medium':\n        this.gameProgress.innerHTML = `${numOfIterations * +1}/10<br>Poziom: Średni`;\n        break;\n\n      default:\n        this.gameProgress.innerHTML = `${numOfIterations + 1}/10<br>Poziom: Trudny`;\n    }\n  }\n\n}\n\nconst gameMethod = new Game();\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });