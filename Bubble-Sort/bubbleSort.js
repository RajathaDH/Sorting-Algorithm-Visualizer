const lengthInput = document.getElementById('lengthInput');
const generateButton = document.getElementById('generateButton');
const sortButton = document.getElementById('sortButton');

let arr = [];

generateButton.addEventListener('click', () => {
    const length = lengthInput.value;

    arr = generateRandomArray(length);
});

sortButton.addEventListener('click', () => {
    arr = bubbleSort(arr);

    console.log(arr);
});

function generateRandomArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        arr.push(randomNumber);
    }

    return arr;
}

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        if (swapped == false) {
            break;
        }
    }

    return arr;
}

async function main() {
    console.log('start');
    for(let i = 0;i < 10; i++){
        await customDelay(1000);
        console.log('iteration', i);
    }

    console.log('end');
}

main();

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

//console.log(bubbleSort(generateRandomArray(10)));