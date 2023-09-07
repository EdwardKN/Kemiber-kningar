async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms))}

function isDigit(s) { return s >= '0' && s <= '9' }

function count(str, target) {
    let result = 0
    let re = new RegExp(target + "[0-9]*", "g")
    str.replace(re, match => result += parseInt(match.substring(target.length) || 1))
    return result
}

function unpackAllParentheses(str) {
    let res = ""
    let stack = []
    let i = 0

    while (i < str.length) {
        if (str[i] !== '(') { res += str[i]; i++; continue }

        let count = 1
        i++
        stack.push("")
        while (count != 0) {
            if (str[i] == '(') {
                stack.push("")
                count++
            } else if (str[i] == ')') {
                count--
                i++
                if (count == 0) {res += numbersAfter(stack.pop(), str[i]) }
                else { stack[stack.length - 2] += numbersAfter(stack.pop(), str[i]) }
            } else { stack[count - 1] += str[i] }
            i++
        }
    }
    return res
}

function numbersAfter(str, num) {
    let res = ""
    let n = ""

    for (let i = 0; i < str.length; i++) {
        let char = str[i]

        if (isDigit(char)) { n += char; continue }

        if (char == char.toUpperCase() && res != "") {
            res += n == "" ? num : n * num
            res += char
            n = ""
        } else {
            res += char
        }
    }
    if (n === "") { res += num }
    else { res += n * num }
    return res
}

function multipleElementAndNumber(str) {
    let result = ""
    let tempResult = ""
    let n = ""

    for (let char of str) {
        if (isDigit(char)) { n += char; continue }
            result += tempResult.repeat(n || 1)
            tempResult = char
            n = "" 
        }
    result += tempResult.repeat(n || 1)
    return result.split('')
}

function stringToCharFrequencyObject(strs) {
    let result = {}

    for (let str of strs) {
        result[str] = {}

        for (let char of new Set(str)) {
            if (isDigit(char)) { continue }
            result[str][char] = count(str, char)
        }
    }
    return result
}

async function testing(equation) { // Already checked equation
    let s = performance.now()

    console.log(equation)
    let trimmed = equation.replace(/\s/gm, "") // Remove whitespaces
    let splitUp = unpackAllParentheses(trimmed).split('=').map(e => e.split('+')) 

    // Idk Just Works I Guess
    let [r, p] = splitUp
    let elements = r.concat(p) // Keep track of all elements when searching
    let combined = stringToCharFrequencyObject(elements) // Object of all elements, and the amount of each character
    let values = elements.reduce((obj, key) => (obj[key] = null, obj), {}) // Object of all elements, with mole value
    let unique = Array.from(new Set(elements.map(e => e.match(/[A-Z][a-z]?/)[0])))

    let def = Object.keys(values).sort((a, b) => b.length - a.length)[0]
    let n = 1

    while (!Object.values(values).every(val => val !== null && val % 1 == 0)) {
        if (performance.now() - s >= 1000) {
            Object.keys(values).forEach(key => values[key] = 1)
            break
        }

        Object.keys(values).forEach(key => values[key] = null)
        values[def] = n

        for (let i = 0; i < unique.length; i++) {
            let char = unique[i]
            let elsWithChar = elements.filter(x => x.includes(char)) // All elements with char in them
            let none = elsWithChar.filter(x => values[x] == null) // Filter out all elements with no value

            if (none.length !== 1) { continue }
 
            none = none[0]
            let left = r.includes(none) ? 1 : -1 // Reactant or Product 
            let amount = 0

            for (let element of elsWithChar) {
                if (element === none) { continue }
                if (r.includes(element)) {
                    amount -= left * combined[element][char] * values[element]
                } else {
                    amount += left * combined[element][char] * values[element]
                }
            }
            values[none] = amount / combined[none][char]
            i = -1
        }
        n++
    }
    console.log(`The function Testing took ${performance.now() - s} milliseconds`)
    return values
}