const generateButtonElement = document.querySelector('#generateButton');
const sortButtonElement = document.querySelector('#sortButton');
const visualizationPanelElement = document.querySelector('.visualization-panel');
const sortTypeElement = document.querySelector('#sortType');
const lengthInputElement = document.querySelector('#lengthInput');
const speedInputElement = document.querySelector('#speedInput');

let arr = [];

generateButtonElement.addEventListener('click', () => {
    const length = lengthInputElement.value;

    arr = generateRandomArray(length);

    updateView(arr);
});

sortButtonElement.addEventListener('click', () => {
    const sortType = sortTypeElement.value;

    sortButtonElement.disabled = true;

    if (sortType == 'bubble-sort') {
        arr = bubbleSort(arr);
    }
});

function generateRandomArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        arr.push(randomNumber);
    }

    return arr;
}

function updateView(arr, i, j) {
    visualizationPanelElement.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num * 4}px`;

        if (index == i || index == j) {
            bar.style.background = 'red';
        }

        visualizationPanelElement.appendChild(bar);
    });
}

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

async function bubbleSort(arr) {
    const delay = Math.floor(1000 / speedInputElement.value);

    for (let i = 0; i < arr.length; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                updateView(arr, j, j + 1);
                await customDelay(delay);
                swap(arr, j, j + 1);
                swapped = true;
            }

            updateView(arr, j, j + 1);

            await customDelay(delay);
        }

        if (swapped == false) {
            break;
        }
    }

    doneSorting();
    
    return arr;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function doneSorting() {
    for (const child of visualizationPanelElement.children) {
        child.style.background = 'blue';
    }

    sortButtonElement.disabled = false;
}