async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms))}

function isDigit(s) { return s >= '0' && s <= '9' }

function count(arr, count) { return arr.filter(i => i === count).length }

function isLower(arr1, arr2, element) {
    return element.every(char => count(arr1, char) >= count(arr2, char))
}

function isEqual(arr1, arr2) {
    if (arr1.length != arr2.length) { return false }
    return arr1.every((item, index) => arr2[index] == item)
}

function divideEquation(equation) {
    return equation.split('=').map(side => side.split('+'))
}

function lowestCommon(arr) { // 1d arr with numbers
    let most = {}
    let common = 1

    arr.forEach(factors => {
        factors = getPrimeFactors(factors)
        for (let n of factors) {
            if (most[n]) {
                most[n] == most[n] < count(factors, n) ? count(factors, n) : most[n]
            } else {
                most[n] = count(factors, n)
            }
        }
    })

    for (let entry of Object.entries(most)) {
        common *= Math.pow(entry[0], entry[1])
    }
    return common
}

function getPrimeFactors(n) {
    if (n <= 1) { return [n] }
    let factors = []

    while (n != 0 && n % 2 == 0) {
        factors.push(2)
        n = n >> 1
    }
    for (let i = 3; i < Math.sqrt(n); i += 2) {
        while (n % i == 0) {
            factors.push(i)
            n /= i
        }
    }; if (n != 1) {factors.push(n)}
    
    return factors
}

function seperateNumbers(list) {
    let numbers = {}
    list.forEach((_, index) => _.forEach((item, index2) => {
        let digits = []
        let res = []
        let cur = ""
        let curNum = ""
        for (let char of item) {
            if (isDigit(char)) {
                curNum += char
            } else if (char != char.toUpperCase()) {
                cur += char
            } else {
                if (cur != "") {
                    let num = curNum == "" ? 1 : parseInt(curNum)
                    res.push(...Array(num).fill(cur))
                    digits.push(num)
                    curNum = ""
                }
                cur = char
            }
        }
        num = curNum == "" ? 1 : parseInt(curNum)
        digits.push(num)
        res.push(...Array(num).fill(cur))
        list[index][index2] = res
        numbers[res.join().replace(/,/g, '')] = lowestCommon(digits)
    }))
    return [list, numbers]
}

function combineArrays(elements, values) {
    let result = []
    if (elements.length !== values.length) { throw "combineArrays. Not equal lengths" }
    for (let i = 0; i < elements.length; i++) {
        for (let _ = 0; _ < values[i]; _++) {
            result.push(...elements[i])
        }
    }
    return result.sort()
}

async function recursive(combined, values, depth, max, split) {
    
    if (depth == combined.length) { return values }
    let element = combined[depth]
    let rC = [...combined]
    let pC = rC.splice(split)
    let rV = [...values]
    let pV = rV.splice(split)

    if (isEqual(combineArrays(rC, rV), combineArrays(pC, pV))) { return values }
    for (let i = 1; i <= max[element.join('')]; i++) {
        values[depth] = i
        values = await recursive(combined, values, depth+1, max, split)
        rV = [...values]
        pV = rV.splice(split)

        if (depth >= split) { // Product
            if (!isLower(combineArrays(rC, rV), combineArrays(pC, pV), combined[depth])) { break }
        }
        if (isEqual(combineArrays(rC, rV), combineArrays(pC, pV))) { return values }

    }
    values[depth] = 1
    return values
}

function unpackAllParentheses(str) {
    let res = ""
    let stack = []
    let i = 0

    while (i < str.length) {
        if (str[i] == '(') {
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
        } else { res += str[i]; i++ }
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
    }; res += n == "" ? num : n * num
    return res
}

async function calculate(equation) {
    await sleep(10)

    let sT = performance.now()

    let trimmed = equation.replace(/(\r\n|\t|\n|\r| |)/g, "") // Remove whitespaces
    trimmed = trimmed.replace(/^\d+|[+=]\d+/g, match => match.replace(/\d+/g, ""))
    let removePar = unpackAllParentheses(trimmed)

    let divided = divideEquation(removePar) // Divide equation
    let rem = divideEquation(trimmed)

    let numbersSeperated = seperateNumbers(divided)

    let strings = numbersSeperated[0] // Divided without numbers
    let max = numbersSeperated[1] // Object with the strings as key and smallesCommonDenominator as value
    
    let smallestCommon = 4 * lowestCommon(Object.values(max)) // Smallest common denominator of all elements
    
    Object.entries(max).forEach(entry => { // Change numbers value so that there value is smallest common denominator / value
        max[entry[0]] = smallestCommon / entry[1]
    })
    
    // Strings till array av strings

    let combined = [...strings[0]].concat([...strings[1]])

    let output = await recursive(combined, Array(combined.length).fill(1), 0,
    max, strings[0].length)

    let eN = performance.now()

    let i = 0
    rem.forEach((_, index1) => {
        _.forEach((_, index2) => {
        if (output[i] != 1) rem[index1][index2] = `${output[i]}${rem[index1][index2]}`
        i++
    }); rem[index1] = rem[index1].join(' + ')})

    console.log(`The function took ${eN - sT} milliseconds`)
    return output
}

async function stringToCharFrequencyObject(strs) {
    let result = {}
    for (let str of strs) {
        result[str] = {}
        let usedLetters = []
      for (let char of str) {
        if (usedLetters.includes(char)) { continue }
        usedLetters.push(char)
        result[str][char] = count(str, char)
        }
    }
    return result
}

async function testing(equation) { // Already checked equation
    // Fix
    let trimmed = equation.replace(/(\r\n|\t|\n|\r| )/gm, "") // Remove whitespaces
    let rem = trimmed.split('=')
    rem[0] = rem[0].split('+')
    rem[1] = rem[1].split('+')
    let removePar = unpackAllParentheses(trimmed)
    let a = seperateNumbers(divideEquation(removePar))[0]

    //-----------------------------------------------
    let s = performance.now()
    // Idk Just Works I Guess
    let r = a[0] // List of strs
    let p = a[1] // List of strs
    let elements = r.concat(p) // Keep track of all elements when searching

    let combined = await stringToCharFrequencyObject(elements) // Object of all elements, and the amount of each character

    let values = elements.reduce((obj, key) => (obj[key] = null, obj), {}) // Object of all elements, with mole value

    let unique = Array.from(new Set(a[0].concat.apply([], a[0]).concat(a[1].concat.apply([], a[1])))) // Array of all unique characters in all combined

    let n = 1
    while (!Object.values(values).every(x => x != null && x % 1 == 0)) {
        await sleep(1)
        if (performance.now() - s >= 1000) {
            Object.keys(values).forEach(key => values[key] = 1)
            break
        }

        Object.keys(values).forEach(key => values[key] = null) // Reset keys
        values[Object.keys(combined)[0]] = n // Update first element mole in reaction

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
        n++
    }
    let e = performance.now()
    console.log(`The function Testing took ${e - s} milliseconds`)
    return values
}