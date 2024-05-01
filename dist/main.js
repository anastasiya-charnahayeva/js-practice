/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (() => {

    eval("let display = document.querySelector(\".display\");\r\nlet buttons = Array.from(document.querySelectorAll(\".button\"));\r\n\r\nlet firstNum = '';\r\nlet secNum = '';\r\nlet sign = '';\r\n\r\nconst numButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];\r\nconst actions = ['-', '+', '*', '/'];\r\n\r\nconst clearAll = () => {\r\n    firstNum = '';\r\n    secNum = '';\r\n    sign = '';\r\n    display.innerText = '0'; \r\n}\r\n\r\nbuttons.map((button) => {\r\n  button.addEventListener(\"click\", (e) => {    \r\n    display.innerText = '';\r\n    const key = e.target.innerText;\r\n\r\n    if (key == \"AC\")  clearAll();\r\n\r\n    if (numButtons.includes(key)){\r\n        if (secNum === '' && sign === '') {\r\n            firstNum += key;\r\n            display.innerText = firstNum;\r\n        }else {\r\n            secNum += key;\r\n            display.innerText = secNum;\r\n        }\r\n        return;\r\n    }\r\n\r\n    if (actions.includes(key)) {\r\n        sign = key;\r\n        display.innerText = sign;\r\n        return;\r\n    }\r\n    \r\n    if (key === '%') {        \r\n        display.innerText = secNum + '%';\r\n        secNum = (firstNum*secNum*0.01);\r\n    }\r\n\r\n\r\n    if (key === '=') {\r\n        if (secNum === '') secNum = firstNum;\r\n        switch (sign) {\r\n            case '+':\r\n                firstNum = (+firstNum) + (+secNum);\r\n                break;\r\n            case '-':\r\n                firstNum = firstNum - secNum;\r\n                break;\r\n            case '*':\r\n                firstNum = firstNum * secNum;\r\n                break;\r\n            case '/':\r\n                if (secNum == 0) {\r\n                    firstNum = 'Error...';\r\n                    secNum = '';\r\n                    sign = '';\r\n                } else {\r\n                    firstNum = firstNum / secNum;\r\n                }\r\n                break;\r\n        }\r\n        secNum = '';\r\n        sign = '';\r\n        display.innerText = firstNum;\r\n    }\r\n\r\n    if (key === '+/-') { \r\n        const str = firstNum.toString();\r\n        if (str.includes('-')) {\r\n            firstNum = str.replace('-', '');\r\n        } else {\r\n            firstNum = str.replace('', '-');\r\n        }\r\n        display.innerText = firstNum;\r\n    }\r\n\r\n  });\r\n});\r\n\r\n\r\nlet prevTheme = '';\r\n\r\nlet themeToggler = document.querySelector(\".toggle\");\r\nthemeToggler.addEventListener(\"click\", () => {\r\n    applyTheme();\r\n});\r\n\r\nconst applyTheme = () => {\r\n    let themeUrl \r\n    switch (prevTheme) {\r\n        case 'dark':\r\n            prevTheme = 'light';\r\n            themeUrl = `css/theme-${prevTheme}.css`;\r\n            break;\r\n        case 'light':\r\n            prevTheme = 'dark';\r\n            themeUrl = `css/theme-${prevTheme}.css`;\r\n            break;\r\n        default: \r\n            prevTheme = 'dark';\r\n            themeUrl = `css/theme-${prevTheme}.css`;\r\n            break;\r\n    }\r\n    document.querySelector('[title=\"theme\"]').setAttribute('href', themeUrl);\r\n};\r\n\r\n\n\n//# sourceURL=webpack://calculator/./main.js?");

    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval devtool is used.
    /******/ 	var __webpack_exports__ = {};
    /******/ 	__webpack_modules__["./main.js"]();
    /******/ 	
    /******/ })()
    ;