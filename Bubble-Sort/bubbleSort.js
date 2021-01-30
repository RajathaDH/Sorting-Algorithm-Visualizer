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
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }

            updateView(arr);

            await customDelay(speed);
        }

        if (swapped == false) {
            break;
        }
    }

    sortButton.disabled = false;
    
    return arr;
}

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

function updateView(arr) {
    visualizationPanel.innerHTML = '';

    arr.forEach(num => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = num;
        bar.style.height = `${num * 4}px`;

        visualizationPanel.appendChild(bar);
    });
}