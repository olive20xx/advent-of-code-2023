import fs from 'node:fs'
import readline from 'node:readline'

export async function getLineByLineInput(filename) {
  const input = []

  const fileStream = fs.createReadStream(filename)

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

  return input
}
