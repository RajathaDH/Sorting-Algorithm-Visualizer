function insertionSort(arr) {
    //const speed = Math.floor(1000 / speedInput.value);

    for (let i = 1; i < arr.length; i++) {
        const currentValue = arr[i];
        let compareValue = i - 1;

        while (compareValue >= 0 && currentValue < arr[compareValue]) {
            arr[compareValue + 1] = arr[compareValue];
            compareValue--;
        }

        arr[compareValue + 1] = currentValue;
    }
    
    return arr;
}

console.log(insertionSort([3, 5, 2, 6, 1, 8, 5]));