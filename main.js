const generateButtonElement = document.querySelector('#generateButton');
const sortButtonElement = document.querySelector('#sortButton');
const visualizationPanelElement = document.querySelector('.visualization-panel');
const sortTypeElement = document.querySelector('#sortType');
const lengthInputElement = document.querySelector('#lengthInput');
const speedInputElement = document.querySelector('#speedInput');
const sortTypeDisplayElement = document.querySelector('#sortTypeDisplay');
const bubbleSortDisplayElement = document.querySelector('#bubbleSortDisplay');

let values = [];
let sortType = sortTypeElement.value;

generateButtonElement.addEventListener('click', () => {
    const length = lengthInputElement.value;

    values = generateRandomvaluesay(length);

    updateView(values);
});

sortButtonElement.addEventListener('click', () => {
    sortButtonElement.disabled = true;

    if (sortType == 'bubble-sort') {
        bubbleSort(values);
    } else if (sortType == 'insertion-sort') {
        insertionSort(values);
    } else if (sortType == 'selection-sort') {
        selectionSort(values);
    }
});

sortTypeElement.addEventListener('change', e => {
    sortType = e.target.value;

    if (sortType == 'bubble-sort') {
        sortTypeDisplayElement.textContent = 'Bubble Sort';
    } else if (sortType == 'insertion-sort') {
        sortTypeDisplayElement.textContent = 'Insertion Sort';
    } else if (sortType == 'selection-sort') {
        sortTypeDisplayElement.textContent = 'Selection Sort';
    }
});

function generateRandomvaluesay(length) {
    const values = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        values.push(randomNumber);
    }

    return values;
}

function updateView(values) {
    visualizationPanelElement.innerHTML = '';

    values.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = value;
        bar.style.height = `${value}%`;

        visualizationPanelElement.appendChild(bar);
    });
}

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

function swap(values, i, j) {
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}

function doneSorting() {
    for (const child of visualizationPanelElement.children) {
        child.style.background = 'blue';
    }

    sortButtonElement.disabled = false;
}

async function bubbleSort(values) {
    const delay = Math.floor(1000 / speedInputElement.value);

    for (let i = 0; i < values.length; i++) {
        let swapped = false;

        for (let j = 0; j < values.length - i - 1; j++) {
            Array.from(bubbleSortDisplayElement.children).forEach(element => element.style.border = 'none');

            bubbleSortDisplayElement.children[0].style.border = '';

            updateViewBubble(values, j, j + 1, 'red');
            await customDelay(delay);

            if (values[j] > values[j + 1]) {
                Array.from(bubbleSortDisplayElement.children).forEach(element => element.style.border = 'none');

                bubbleSortDisplayElement.children[1].style.border = '';

                swap(values, j, j + 1);
                swapped = true;
                
                updateViewBubble(values, j, j + 1, 'green');
                await customDelay(delay);
            }
        }

        if (swapped == false) {
            break;
        }
    }

    doneSorting();
    
    return values;
}

function updateViewBubble(values, i, j, colour) {
    visualizationPanelElement.innerHTML = '';

    values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = value;
        bar.style.height = `${value}%`;

        if (index == i || index == j) {
            bar.style.background = colour;
        }

        visualizationPanelElement.appendChild(bar);
    });
}

async function insertionSort(values) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 1; i < values.length; i++) {
        const currentValue = values[i];
        let compareValue = i - 1;

        while (compareValue >= 0 && currentValue < values[compareValue]) {
            values[compareValue + 1] = values[compareValue];
            compareValue--;

            updateViewInsertion(values, currentValue, compareValue, i);

            await customDelay(speed);
        }

        values[compareValue + 1] = currentValue;
    }

    doneSorting();
    
    return values;
}

function updateViewInsertion(values, currentValue, compareValue, i) {
    visualizationPanelElement.innerHTML = '';

    values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = value;
        bar.style.height = `${value}%`;

        if (index == compareValue) {
            bar.style.background = 'green';
        }

        visualizationPanelElement.appendChild(bar);
    });
}

async function selectionSort(values) {
    const speed = Math.floor(1000 / speedInput.value);

    for (let i = 0; i < values.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < values.length; j++) {
            if (values[j] < values[minIndex]) {
                minIndex = j;
            }

            updateViewSelection(values, i, j, minIndex);

            await customDelay(speed);
        }

        if (minIndex != i) {
            const temp = values[i];
            values[i] = values[minIndex];
            values[minIndex] = temp;
        }
    }

    updateViewSelection(values);

    doneSorting();
    
    return values;
}

function updateViewSelection(values, sortedPart, currentValue, minIndex) {
    visualizationPanelElement.innerHTML = '';

    values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = value;
        bar.style.height = `${value}%`;

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