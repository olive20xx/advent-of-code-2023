import fs from 'fs'
import readline from 'readline'

const input = []

async function processLineByLine() {
  const fileStream = fs.createReadStream('./1/input.txt')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    input.push(line)
  }
}

await processLineByLine()

// ********** PART 1 **********

function count(array) {
  let total = 0
  array.forEach((line) => {
    let firstDigit
    let secondDigit

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (!firstDigit && +char >= 0) {
        firstDigit = char
        secondDigit = char
      }
      if (+char >= 0) {
        secondDigit = char
      }
    }
    const combined = firstDigit + secondDigit
    total += Number(combined)
  })
  return total
}

console.log('== PART 1 ==')
const total = count(input)
console.log(total)

// ********** PART 2 **********

const REGEXES = [
  null,
  /one/,
  /two/,
  /three/,
  /four/,
  /five/,
  /six/,
  /seven/,
  /eight/,
  /nine/,
]

console.log('== PART 2 ==')
const parsed = input.map(replaceAll)
const total2 = count(parsed)
console.log(total2)

// == HELPERS ==

function replaceAll(str) {
  let done = false
  while (!done) {
    ;[str, done] = replaceEarliestMatch(str)
  }
  return str
}

function replaceEarliestMatch(str) {
  let done = false
  const indexes = {}
  // find earliest match
  REGEXES.forEach((regex, regexI) => {
    if (!regex) return

    const i = str.search(regex)
    if (i !== -1) {
      indexes[regexI] = i
    }
  })

  if (isEmpty(indexes)) {
    done = true
  } else {
    const { digit, index } = getReplacement(indexes)
    str = str.slice(0, index) + digit + str.slice(index + 1)
  }
  return [str, done]
}

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }

  return true
}

function getReplacement(obj) {
  let index = Infinity
  let digit

  for (const key in obj) {
    const val = obj[key]
    if (val < index) {
      index = val
      digit = key
    }
  }

  return { digit, index }
}
