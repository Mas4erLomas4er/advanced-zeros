module.exports = function getZerosCount ( number, base ) {
	const getPrimeFactors = maxNumber => {
		let arr = new Set();
		for ( let i = 2; i < maxNumber + 1; i++ ) {
			for ( let j = 2; j < maxNumber; j++ ) {
				if ( i % j === 0 && i !== j ) {
					arr.delete( i );
					break;
				}
				else arr.add( i );
			}
		}
		if ( maxNumber === 2 ) arr.add( 2 );
		return Array.from( arr );
	};

	const primeFactorize = ( number, primeFactorsArray ) => {
		let arr = [];
		while ( number > 1 ) {
			primeFactorsArray.some( elem => {
				if ( number % elem === 0 ) {
					number /= elem;
					arr.push( elem );
				}

				return number < elem;
			} );
		}
		return arr;
	};
	let basePrimeFactors = primeFactorize( base, getPrimeFactors( base ) );

	const getArrayWithOriginalElems = array => Array.from( new Set( array ) );

	let originalPrimeFactorsList = getArrayWithOriginalElems( basePrimeFactors );

	const getElemInArrayCount = ( elem, array ) => array.reduce( ( acc, item ) => item === elem ? acc + 1 : acc, 0 );

	const getEachPrimeFactorZeroesCount = ( primeFactor, primeFactorCount ) => {
		let sum = 0;
		for ( let i = 1; i < number; i++ ) {
			let multiplication = Math.pow( primeFactor, i );
			if ( multiplication > number ) break;
			sum += Math.floor( number / multiplication );
		}
		return Math.floor( sum / primeFactorCount );
	};

	let primeFactorsZeroesCountList = originalPrimeFactorsList.reduce( ( acc, item ) => {
		let itemZeroesCount = getEachPrimeFactorZeroesCount(item, getElemInArrayCount(item, basePrimeFactors));
		return acc.concat(itemZeroesCount);
	}, []);

	return Math.min(...primeFactorsZeroesCountList);
};
