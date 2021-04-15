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

    arr = insertionSort(arr);
});

function generateRandomArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        arr.push(randomNumber);
    }

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

            updateView(arr, currentValue, compareValue, i);

            await customDelay(speed);
        }

        arr[compareValue + 1] = currentValue;
    }

    doneSorting();
    
    return arr;
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

function updateView(arr, currentValue, compareValue, i) {
    visualizationPanel.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num * 4}px`;

        if (index == compareValue) {
            bar.style.background = 'green';
        }

        visualizationPanel.appendChild(bar);
    });
}