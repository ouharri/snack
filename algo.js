function find3Numbers(A, arr_size, sum)
{
	let l, r;

	let beforeSort = A;

	A.sort((a,b) => a-b);
    
    //console.log(A)

	for (let i = 0; i < arr_size - 2; i++) {

		l = i + 1;

		r = arr_size - 1;
		while (l < r) {
			if (A[i] + A[l] + A[r] == sum)
			{
/* 			console.log("Triplet is " + A[i] + ", "
				+ A[l] + ", " + A[r]);  */
                console.log(beforeSort.indexOf(A[i]))
                console.log(beforeSort.indexOf(A[l]))
                console.log(beforeSort.indexOf(A[r]))
				return true;
			}
			else if (A[i] + A[l] + A[r] < sum)
				l++;
			else // A[i] + A[l] + A[r] > sum
				r--;
		}
	}

	
	return false;
}



	let A = [ 1,2,3,54,8 ];
	let sum = 11;
	let arr_size = A.length;

	find3Numbers(A, arr_size, sum);



