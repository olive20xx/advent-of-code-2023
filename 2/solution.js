import { getLineByLineInput } from '../utils/file'

const input = await getLineByLineInput('./2/input.txt')

const games = [null, ...input]

const POSSIBLE = {
  red: 12,
  green: 13,
  blue: 14,
}

let total = 0

games.forEach((game, i) => (total += countGame(game, i)))

function countGame(game, index) {
  if (!game) return 0

  let isValid = true

  game
    .split(': ')[1]
    .split('; ')
    .map((result) =>
      result.split(', ').forEach((r) => {
        const [number, color] = r.split(' ')
        if (number > POSSIBLE[color]) isValid = false
      })
    )

  if (isValid) return index
  return 0
}

console.log(total)
