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

    arr = selectionSort(arr);
});

function generateRandomArray(length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        arr.push(randomNumber);
    }

    return arr;
}

async function selectionSort(arr) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            updateView(arr, i, j, minIndex);

            await customDelay(speed);
        }

        if (minIndex != i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
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

function updateView(arr, sortedPart, currentValue, minIndex) {
    visualizationPanel.innerHTML = '';

    arr.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num * 4}px`;

        if (index < sortedPart) {
            bar.style.background = 'green';
        } else if (index == currentValue) {
            bar.style.background = 'orange';
        } else if (index == minIndex) {
            bar.style.background = 'red';
        }

        visualizationPanel.appendChild(bar);
    });
}