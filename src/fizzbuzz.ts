import { readFileSync } from 'fs';

const input = readFileSync('/dev/stdin', 'utf8');

const max = Number(input);

if (Number.isNaN(max)) {
    process.exit(1);
}

let message = '';
for (let num = 1; num <= max; num++) {
    switch (true) {
        case num % 5 === 0:
            message += 'Fizz';
            break;
        case num % 3 === 0:
            message += 'Buzz';
            break;
        default:
            message += num.toString();
    }
}

console.log(message);
