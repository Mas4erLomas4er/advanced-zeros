module.exports = function getZerosCount (number, base) {
const getPrimeFactors = maxNumber => {
	let arr = new Set();
	for ( let i = 2; i < maxNumber+1; i++ ) {
		for ( let j = 2; j < maxNumber; j++ ) {
			if ( i % j === 0 && i !== j) {
				arr.delete(i);
				break;
			}
			else arr.add(i);
		}
	}
	if (maxNumber===2) arr.add(2);
	return Array.from(arr);
};

const primeFactorize = (number, primeFactorsArray) => {
	let arr = [];
	while ( number > 1 ) {
		primeFactorsArray.some(elem => {
			if ( number % elem === 0 ) {
				number /= elem;
				arr.push(elem);
			}

			return number < elem;
		});
	}
	console.log(arr);
	return arr;
};

let mostPrimeFactorize = Math.max.apply(this, primeFactorize(base, getPrimeFactors(base)));
// console.log(mostPrimeFactorize);
let sum = 0;
for ( let i = 1; i < number; i++ ) {
	let multiplication = Math.pow(mostPrimeFactorize, i);
	if ( multiplication > number ) break;
	// console.log(multiplication);
	sum += Math.floor(number / multiplication);
}
return sum;
}
