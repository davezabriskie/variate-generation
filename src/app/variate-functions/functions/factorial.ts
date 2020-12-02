// credit to stack overflow
// https://stackoverflow.com/a/32532131
export function factorial(input: number): number {
  if (input % 1 !== 0 || input < 0){
    return gamma(input + 1);
  }
  else {
      if (input === 0) {
        return 1;
      }
      for (let i = input; --i; ) {
        input *= i;
      }
      return input;
  }
}

function gamma(n: number): number {
  const g = 7;
  const p = [0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  }
  else {
    n--;
    let x = p[0];
    for (let i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    const t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
  }
}
