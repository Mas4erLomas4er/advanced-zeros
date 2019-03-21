module.exports = function getZerosCount (number, base) {
	const getPrimeFactors = maxNumber => {
		let arr = new Set();
		for ( let i = 2; i < maxNumber + 1; i++ ) {
			for ( let j = 2; j < maxNumber; j++ ) {
				if ( i % j === 0 && i !== j ) {
					arr.delete(i);
					break;
				}
				else arr.add(i);
			}
		}
		if ( maxNumber === 2 ) arr.add(2);
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

	let primeFactorises = primeFactorize(base, getPrimeFactors(base));
	let leastPrimeFactorize = Math.min.apply(this, primeFactorises);
	let leastPrimeFactorizeCount = 0;
	let mostPrimeFactorizeCount = 0;
	let mostPrimeFactorize = Math.max.apply(this, primeFactorises);
	console.log(mostPrimeFactorize);
	console.log(leastPrimeFactorize);
	primeFactorises.forEach(elem => {
		elem === mostPrimeFactorize ? mostPrimeFactorizeCount++ : 0
	});
	if ( leastPrimeFactorize !== mostPrimeFactorize || mostPrimeFactorizeCount < 4 ) {
		primeFactorises.forEach(elem => {
			elem === leastPrimeFactorize ? leastPrimeFactorizeCount++ : 0
		});
	}
	let optimalPrimeFactorizeCount;
	let optimalPrimeFactorize;
	if ( mostPrimeFactorizeCount > leastPrimeFactorizeCount ) {
		optimalPrimeFactorizeCount = mostPrimeFactorizeCount;
		optimalPrimeFactorize = mostPrimeFactorize;
	}
	else {
		optimalPrimeFactorizeCount = leastPrimeFactorizeCount;
		optimalPrimeFactorize = leastPrimeFactorize;
	}
	let sum = 0;
	for ( let i = 1; i < number; i++ ) {
		let multiplication = Math.pow(optimalPrimeFactorize, i);
		if ( multiplication > number ) break;
		// console.log(multiplication);
		sum += Math.floor(number / multiplication);
	}
	return optimalPrimeFactorizeCount>3 ?Math.floor(sum / optimalPrimeFactorizeCount): sum;
};
