async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms))}

function isDigit(s) { return s >= '0' && s <= '9' }

function count(arr, count) { return arr.filter(i => i === count).length }

function isEqual(arr1, arr2) {
    if (arr1.length != arr2.length) { return false }
    return arr1.every((item, index) => arr2[index] == item)
}

function deepCopy(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        res.push([])
        for (let j = 0; j < arr[i].length; j++) {
            res[i].push(arr[i][j])
        }
    }
    return res
}

function lowestCommon(arr) {
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
    if (n == 1) { return [1] }
    let factors = []

    while (n % 2 == 0) {
        factors.push(2)
        n = n >> 1
    }
    for (let i = 3; i < Math.sqrt(n); i += 2) {
        while (n % i == 0) {
            factors.push(i)
            n /= i
        }
    }
    if (n != 1) { factors.push(n) }
    
    return factors
}

function divideEquation(equation) {
    equation = equation.split("=")
    equation[0] = equation[0].split('+')
    equation[1] = equation[1].split('+')
    return equation
}

function seperateNumbers(list) {
    let numbers = {}
    list.forEach((_, index) => _.forEach((item, index2) => {
        let digits = []
        let res = ""
        let cur = ""
        let curNum = ""
        for (let char of item) {

            if (isDigit(char)) {
                curNum += char
            } else if (char != char.toUpperCase()) {
                cur += char
            } else {
                let num = curNum == "" ? 1 : parseInt(curNum)
                res += cur.repeat(num) // Uppercase
                digits.push(num)
                curNum = ""
                cur = char
            }
        }
        num = curNum == "" ? 1 : parseInt(curNum)
        digits.push(num)
        res += cur.repeat(num)
        list[index][index2] = res
        numbers[res] = lowestCommon(digits)
    }))

    return [list, numbers]
}

async function bruteForce(strings, amountOfEach) { // Object form
    let combined = [...strings[0]].concat([...strings[1]]) // Combine

    values = await recursive(combined, Array(combined.length).fill(1), 0, amountOfEach,
    strings[0].length)
    return values
}

function sortObj(obj) {
    let temp = ""
    Object.entries(obj).forEach(entry => {
        temp += entry[0].repeat(entry[1])
    })
    return temp.split('').sort()
}

function isLower(string1, string2, element) {
    for (let char of element) {
        if (count(string1, char) < count(string2, char)) {
            return false
        }
    }
    return true
}

function oneTooTwo(keys, values, split) {
    if (keys.length !== values.length) { throw "oneTooTwo"}
    let a = {}
    let b = {}
    for (let i = 0; i < keys.length; i++) {
        if (i < split) {
            a[keys[i]] = values[i]
        } else { b[keys[i]] = values[i] }
    }
    return [a, b]
}

function arrToObj(keys, values) {
    if (keys.length != values.length) { throw "arrToObj" }
    let temp = {}
    for (let i = 0; i < keys.length; i++) {
        temp[keys[i]] = values[i]
    }
    return temp
}







//array["key"] = value


async function recursive(combined, values, depth, max, split) {
    if (depth == combined.length) { return values }
    let element = combined[depth]
    let res = oneTooTwo(combined, values, split)
    let r = res[0]
    let p = res[1]


    if (isEqual(sortObj(r), sortObj(p))) { return values }

    for (let i = 1; i <= max[element]; i++) {

        values[depth] = i
        values = await recursive(combined, values, depth+1, max, split)
        res = oneTooTwo(combined, values, split)
        r = res[0]
        p = res[1]
        if (depth >= split) { // Product
            if (!isLower(sortObj(r), sortObj(p), combined[depth])) { break }
        }
        if (isEqual(sortObj(r), sortObj(p))) { return values }

    }
    values[depth] = 1
    return values
}
// Paranthasese
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
                    if (count == 0) {res += stack.pop().repeat(str[i]) }
                    else { stack[stack.length - 2] += stack.pop().repeat(str[i]) }
                } else { stack[count - 1] += str[i] }
                i++
            }
        } else { res += str[i]; i++ }
    }
    return res
}

function validateEquation(eq) {
    let t = eq.split('')
    if (count(t, '(') != count(t, ')')) { return false }

    let lastP = ""
    let check = false
    let prev = ""
    for (let char of eq) {
        if (char == '(') { lastP == '(' }

        
        if (isDigit(char) && ['+', '=', ''].includes(prev)) { return false }   
        if (char == char.toLowerCase() && (prev == prev.toLowerCase() || prev == '')) { return false } 
        if (char == ')') {
            if (lastP == '(') { lastP = ""; check = true } else { return false }
        }
        prev = char
    }
}
//let test = "AgNO3+BaCl2=AgCl+Ba(NO3)2"
//console.log(validateEquation(test))


async function calculate(equation) {
    await sleep(10)

    let sT = performance.now()

    let trimmed = equation.replace(/(\r\n|\t|\n|\r| )/gm, "") // Remove whitespaces

    let divided = divideEquation(trimmed) // Divide equation
    
    let numbersSeperated = seperateNumbers( deepCopy(divided) ) //
    console.log()
    let strings = numbersSeperated[0] // Divided without numbers
    let numbers = numbersSeperated[1] // Object with the strings as key and smallesCommonDenominator as value

    let smallest = 2 * lowestCommon(Object.values(numbers)) // Smallest common denominator of all elements
    
    Object.entries(numbers).forEach(entry => { // Change numbers value so that there value is smallest common denominator / value
        numbers[entry[0]] = smallest / entry[1]
    })

    let output = await bruteForce(strings, numbers) // Bruteforce

    let eN = performance.now()

    let i = 0
    divided.forEach((_, index1) => {
        _.forEach((_, index2) => {
        if (output[i] != 1) divided[index1][index2] = `${output[i]}${divided[index1][index2]}`
        i++
    }); divided[index1] = divided[index1].join(' + ')})

    console.log(`The function took ${eN - sT} milliseconds`)
    return output
}
// Fix small letters

