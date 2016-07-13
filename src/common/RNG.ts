// RNG(random number generator)
// LCG(linear congruential generator) 线性同余法
export class RNG {
    // LCG using GCC's constants
    m = 0x80000000; // 2**31;
    a = 1103515245;
    c = 12345;
    state: number;

    constructor(seed = 0) {
        this.state = seed;
    }

    nextInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    nextFloat() {
        // returns in range [0,1]
        return this.nextInt() / (this.m - 1);
    }

    random() {
        // returns in range [0,1)
        return this.nextInt() / this.m;
    }

    nextRange(start: number, end: number) {
        // returns in range [start, end): including start, excluding end
        // can't modulu nextInt because of weak randomness in lower bits
        let rangeSize = end - start;
        let randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }

    choice(array) {
        return array[this.nextRange(0, array.length)];
    }

}

// var rng = new RNG(20);
// for (var i = 0; i < 10; i++)
//   console.log(rng.nextRange(10,50));
//
// var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// for (var i = 0; i < 10; i++)
//   console.log(rng.choice(digits));
