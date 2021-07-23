import './style.css'

//utility function to select dom elements
const $ = (selector) => {
    const isString = typeof selector === 'string'
    if (!isString) throw new Error(`Trying to select a ${typeof selector}`)
    return document.querySelector(selector)
}

//define a sentence to typewrite
const sentence = 'This is a typewritting animation proof of concept . . .'

//split each word into an array
const wordsList = sentence.split(' ')

//global variables
let wordIndex = 0
let letterIndex = 0
let currentWord = ''
let slicedWord = ''


/** 
 * type() recursively calls itself until it finishes adding each letter to the DOM element that 
 * beholds the displayed word.
 * Whenever it hits the last character it calls the erase() function which does exacly the oposite
 * of type() but with the same logic. 
 * erase() recursively calls itself, deleting a character from the string in each iteration until 
 * it has no characters to delete. Whenever the function finishes deleting all the letters and 
 * isEraseFinished the function calls type() instead of itself.
 * 
 * And the cycle repeats.. =D
*/
const type = () => {
    if (wordIndex === wordsList.length) {
        wordIndex = 0
    }

    setCurrentWord()
    writeOneLetter()

    if (hasTypingFinished()) {
        setTimeout(erase, currentWord.length * 120)
    } else {
        setTimeout(type, 100)
    }
}

const erase = () => {
    if (wordIndex === wordsList.length) {
        wordIndex = 0
    }

    setCurrentWord()
    eraseOneLetter()

    if (hasEraseFinished()) {
        nextWord()
        resetLetterIndex()
        setTimeout(type, 100)
    } else {
        setTimeout(erase, 50)
    }
}

const writeOneLetter = () => {
    slicedWord = currentWord.slice(0, letterIndex++)
    $('.highlight-word').textContent = slicedWord.toUpperCase()
}

const eraseOneLetter = () => {
    slicedWord = currentWord.slice(0, letterIndex--)
    $('.highlight-word').textContent = slicedWord.toUpperCase()
}

const hasEraseFinished = () => slicedWord.length === 0

const hasTypingFinished = () => slicedWord.length === currentWord.length

const nextWord = () => wordIndex++

const resetLetterIndex = () => letterIndex = 0

const setCurrentWord = () => currentWord = wordsList[wordIndex]

type()