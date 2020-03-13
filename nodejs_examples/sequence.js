const sutoring = require("../dist/index");


for (let i = 1; i <= 9; i++) {
    const seq = sutoring.ThueMorseSequence.createIthSequence(i);
    console.log(`${i}-th True-Morse sequence: ${seq}`)
}

for (let i = 1; i <= 9; i++) {
    const seq = sutoring.ThueMorseSequence.create(i * 10);
    console.log(`True-Morse sequence of length ${i*10}: ${seq}`)
}

for (let i = 1; i <= 9; i++) {
    const seq = sutoring.FibonacciSequence.createIthSequence(i);
    console.log(`${i}-th Fibonacci sequence: ${seq}`)
}

for (let i = 1; i <= 9; i++) {
    const seq = sutoring.FibonacciSequence.create(i * 10);
    console.log(`Fibonacci sequence of length ${i*10}: ${seq}`)
}