import { getLineByLineInput } from '../utils/file'

const input = await getLineByLineInput('./2/input.txt')

const games = [null, ...input]

// ********** PART 1 **********
console.log('== PART 1 ==')

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

// ********** PART 2 **********
console.log('== PART 2 ==')
const total2 = input
  .map((game, index) => getPower(countMinCubes(game, index)))
  .reduce((ac, cv) => ac + cv)
console.log(total2)

function getPower(count) {
  return Object.values(count).reduce((t, c) => t * c)
}

function countMinCubes(game, index) {
  if (!game) return 0

  const counts = {
    red: 0,
    green: 0,
    blue: 0,
  }

  game
    .split(': ')[1]
    .split('; ')
    .map((result) =>
      result.split(', ').forEach((r) => {
        const [number, color] = r.split(' ')
        if (number > counts[color]) counts[color] = +number
      })
    )

  return counts
}
