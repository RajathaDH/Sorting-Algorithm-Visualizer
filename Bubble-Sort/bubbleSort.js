const lengthInput = document.getElementById('lengthInput');
const generateButton = document.getElementById('generateButton');
const sortButton = document.getElementById('sortButton');
const visualizationPanel = document.querySelector('.visualization-panel');
const speedInput = document.getElementById('speedInput');

let arr = [];

generateButton.addEventListener('click', () => {
    const length = lengthInput.value;

    arr = generateRandomArray(length);

    updateView(arr);
});

sortButton.addEventListener('click', () => {
    sortButton.disabled = true;

    arr = bubbleSort(arr);
});

function generateRandomArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        arr.push(randomNumber);
    }

    return arr;
}

async function bubbleSort(arr) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 0; i < arr.length; i++) {
        let swapped = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;
            }

            updateView(arr, j, j + 1);

            await customDelay(speed);
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
    for (const child of visualizationPanel.children) {
        child.style.background = 'blue';
    }

    sortButton.disabled = false;
}

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

function updateView(arr, i, j) {
    visualizationPanel.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num * 4}px`;

        if (index == i || index == j) {
            bar.style.background = 'red';
        }

        visualizationPanel.appendChild(bar);
    });
}