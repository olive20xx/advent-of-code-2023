import fs from 'fs'
import readline from 'readline'

const input = []

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt')

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

let total = 0

input.forEach((line) => {
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

console.log(total)
