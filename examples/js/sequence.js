"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sutoring = require("../../dist/index");
for (let i = 1; i <= 9; i++) {
    const seq = Sutoring.Sequences.ThueMorseSequence.createIthSequence(i);
    console.log(`${i}-th True-Morse sequence: ${seq}`);
}
for (let i = 1; i <= 9; i++) {
    const seq = Sutoring.Sequences.ThueMorseSequence.create(i * 10);
    console.log(`True-Morse sequence of length ${i * 10}: ${seq}`);
}
for (let i = 1; i <= 9; i++) {
    const seq = Sutoring.Sequences.FibonacciSequence.createIthSequence(i);
    console.log(`${i}-th Fibonacci sequence: ${seq}`);
}
for (let i = 1; i <= 9; i++) {
    const seq = Sutoring.Sequences.FibonacciSequence.create(i * 10);
    console.log(`Fibonacci sequence of length ${i * 10}: ${seq}`);
}
