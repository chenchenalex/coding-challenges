var findMedianSortedArrays = function (nums1, nums2) {
  const fullLength = nums1.length + nums2.length;
  const halfLength = Math.floor((fullLength + 1) / 2);
  let lmin = 0;
  let lmax = nums1.length;

  if (fullLength === 1) {
    return nums1[0] || nums2[0];
  }

  // set median number as split point
  let lsplit = Math.floor((lmax + lmin + 1) / 2);
  // split point for num2 is halfLength - lsplit
  let rsplit = halfLength - lsplit;

  let lsmaller = nums1.slice(0, lsplit).length
    ? nums1.slice(0, lsplit)
    : [-1 * Infinity];

  let lbigger = nums1.slice(lsplit).length ? nums1.slice(lsplit) : [Infinity];

  let rsmaller = nums2.slice(0, rsplit).length
    ? nums2.slice(0, rsplit)
    : [-1 * Infinity];

  let rbigger = nums2.slice(rsplit).length ? nums2.slice(rsplit) : [Infinity];

  while (true) {
    if (
      lsmaller[lsmaller.length - 1] <= rbigger[0] &&
      rsmaller[rsmaller.length - 1] <= lbigger[0]
    ) {
      break;
    } else if (lsmaller[lsmaller.length - 1] > rbigger[0]) {
      lmax = lsplit - 1;
    } else {
      lmin = lsplit;
    }

    lsplit = Math.floor((lmin + lmax + 1) / 2);

    rsplit = halfLength - lsplit;

    lsmaller = nums1.slice(0, lsplit).length
      ? nums1.slice(0, lsplit)
      : [-1 * Infinity];

    lbigger = nums1.slice(lsplit).length ? nums1.slice(lsplit) : [Infinity];

    rsmaller = nums2.slice(0, rsplit).length
      ? nums2.slice(0, rsplit)
      : [-1 * Infinity];

    rbigger = nums2.slice(rsplit).length ? nums2.slice(rsplit) : [Infinity];
  }

  console.table({
    num1: [lsmaller, lbigger],
    num2: [rsmaller, rbigger],
  });

  if (fullLength % 2 === 0) {
    return (
      (Math.max(lsmaller[lsmaller.length - 1], rsmaller[rsmaller.length - 1]) +
        Math.min(rbigger[0], lbigger[0])) /
      2
    );
  } else {
    return Math.max(
      lsmaller[lsmaller.length - 1],
      rsmaller[rsmaller.length - 1],
    );
  }
};

// console.log(findMedianSortedArrays([2, 3, 4], [1]));
// console.log(findMedianSortedArrays([1, 2, 3, 4], [5]));
console.log(findMedianSortedArrays([2, 3, 4, 5, 6], [1]));
// console.log(findMedianSortedArrays([1, 2, 3], [6]));
