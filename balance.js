async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms))}

function isDigit(s) { return s >= '0' && s <= '9' }

function count(arr, count) { return arr.filter(i => i === count).length }

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

async function stringToCharFrequencyObject(strs) {
    let result = {}
    for (let str of strs) {
        result[str] = {}

        for (let char of new Set(str)) {
            result[str][char] = count(str, char)
        }
    }
    return result
}

async function testing(equation) { // Already checked equation
    
    // Fix
    let trimmed = equation.replace(/(\r\n|\t|\n|\r| )/gm, "") // Remove whitespaces
    let removePar = unpackAllParentheses(trimmed)

    let a = removePar.split('=').map(e => e.split('+').map(e => multipleElementAndNumber(e)))
    console.log(a)
    //-----------------------------------------------
    let s = performance.now()
    // Idk Just Works I Guess
    let r = a[0] // List of strs
    let p = a[1] // List of strs
    let elements = r.concat(p) // Keep track of all elements when searching
    let combined = await stringToCharFrequencyObject(elements) // Object of all elements, and the amount of each character
    let values = elements.reduce((obj, key) => (obj[key] = null, obj), {}) // Object of all elements, with mole value
    let unique = Array.from(new Set(r.concat.apply([], r).concat(p.concat.apply([], p)))) // Array of all unique characters in all combined
    let n = 1
    let def = Object.keys(values).sort((a, b) => b.length - a.length)[0]

    while (!Object.values(values).every(x => x != null && x % 1 == 0)) {
        //await sleep(1)
        //if (performance.now() - s >= 1000) {
        //    Object.keys(values).forEach(key => values[key] = 1)
        //    break
        //}
        Object.keys(values).forEach(key => values[key] = null) // Reset keys
        values[def] = n // Update first element mole in reaction

        // Check characters
        let i = 0
        while (i < unique.length) {
            let char = unique[i]

            let elsWithLet = elements.filter(x => x.includes(char)) // All elements with char in them
            let none = elsWithLet.filter(x => values[x] == null) // Filter out all elements with no value

            if (none.length === 1) {
                none = none[0]
                elsWithLet = elsWithLet.filter(x => x != none)
                let left = r.includes(none) ? 1 : -1 // Reactant or Product 
                none = none.join(',')
                let amount = 0
                for (let element of elsWithLet) {
                    if (r.includes(element)) {
                        amount -= left * combined[element][char] * values[element]
                    } else {
                        amount += left * combined[element][char] * values[element]
                    }
                }
                values[none] = amount / combined[none][char]
                i = 0
            } else { i++ }
        }
        console.log(Object.values(values))
        n++
    }

    console.log(`The function Testing took ${performance.now() - s} milliseconds`)
    console.log(values)
    return values
}