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
        bubbleSort(arr);
    } else if (sortType == 'insertion-sort') {
        insertionSort(arr);
    } else if (sortType == 'selection-sort') {
        selectionSort(arr);
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

function updateView(arr, i, j, colour) {
    visualizationPanelElement.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num}%`;

        if (index == i || index == j) {
            bar.style.background = colour;
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

async function bubbleSort(arr) {
    const delay = Math.floor(1000 / speedInputElement.value);

    for (let i = 0; i < arr.length; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            updateView(arr, j, j + 1, 'red');
            await customDelay(delay);

            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;
                
                updateView(arr, j, j + 1, 'green');
                await customDelay(delay);
            }
        }

        if (swapped == false) {
            break;
        }
    }

    doneSorting();
    
    return arr;
}

async function insertionSort(arr) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 1; i < arr.length; i++) {
        const currentValue = arr[i];
        let compareValue = i - 1;

        while (compareValue >= 0 && currentValue < arr[compareValue]) {
            arr[compareValue + 1] = arr[compareValue];
            compareValue--;

            updateViewInsertion(arr, currentValue, compareValue, i);

            await customDelay(speed);
        }

        arr[compareValue + 1] = currentValue;
    }

    doneSorting();
    
    return arr;
}

function updateViewInsertion(arr, currentValue, compareValue, i) {
    visualizationPanelElement.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num}%`;

        if (index == compareValue) {
            bar.style.background = 'green';
        }

        visualizationPanelElement.appendChild(bar);
    });
}

async function selectionSort(arr) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            updateViewSelection(arr, i, j, minIndex);

            await customDelay(speed);
        }

        if (minIndex != i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    updateViewSelection(arr);

    doneSorting();
    
    return arr;
}

function updateViewSelection(arr, sortedPart, currentValue, minIndex) {
    visualizationPanelElement.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num}%`;

        if (index < sortedPart) {
            bar.style.background = 'green';
        } else if (index == currentValue) {
            bar.style.background = 'orange';
        } else if (index == minIndex) {
            bar.style.background = 'red';
        }

        visualizationPanelElement.appendChild(bar);
    });
}