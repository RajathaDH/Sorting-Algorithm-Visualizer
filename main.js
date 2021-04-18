import bubbleSort from './bubbleSort.js';
import insertionSort from './insertionSort.js';
import selectionSort from './selectionSort.js';

const generateButtonElement = document.querySelector('#generateButton');
const sortButtonElement = document.querySelector('#sortButton');
const visualizationPanelElement = document.querySelector('.visualization-panel');
const sortTypeElement = document.querySelector('#sortType');
const lengthInputElement = document.querySelector('#lengthInput');
const speedInputElement = document.querySelector('#speedInput');
const sortTypeDisplayElement = document.querySelector('#sortTypeDisplay');
const sortDetailsElement = document.querySelector('#sortDetails');

const elements = {
    visualizationPanelElement,
    sortDetailsElement,
    generateButtonElement,
    sortButtonElement
};

let values = [];
let sortType = '';

generateButtonElement.addEventListener('click', () => {
    const length = lengthInputElement.value;

    values = generateRandomValues(length);

    createElements(values);
});

sortButtonElement.addEventListener('click', () => {
    if (sortType == '') return;

    sort(sortType);
});

sortTypeElement.addEventListener('change', e => {
    sortType = e.target.value;

    changeSortDetails(sortType);
});

function generateRandomValues(length) {
    const values = [];

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        values.push(randomNumber);
    }

    return values;
}

function createElements(values) {
    visualizationPanelElement.innerHTML = '';

    values.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = value;
        bar.style.height = `${value}%`;

        visualizationPanelElement.appendChild(bar);
    });
}

function sort(sortType) {
    sortButtonElement.disabled = true;
    generateButtonElement.disabled = true;
    
    const speed = speedInputElement.value;

    if (sortType == 'bubble-sort') {
        bubbleSort(values, speed, elements);
    } else if (sortType == 'insertion-sort') {
        insertionSort(values, speed, elements);
    } else if (sortType == 'selection-sort') {
        selectionSort(values, speed, elements);
    }
}

function changeSortDetails(sortType) {
    if (sortType == 'bubble-sort') {
        sortTypeDisplayElement.textContent = 'Bubble Sort';
        sortDetailsElement.innerHTML = `
            <li>Loop through each element and check if adjacent element is larger</li>
            <li>If adjacent element is larger, swap the two values</li>
            <li>If no values were swapped when looping, sorting has been finished</li>
        `;
    } else if (sortType == 'insertion-sort') {
        sortTypeDisplayElement.textContent = 'Insertion Sort';
        sortDetailsElement.innerHTML = `
            <li>Start at array index 1 (second element) and loop the entire array</li>
            <li>Compare the current element with the previous element</li>
            <li>If current element is smaller than previous element, keep comparing with elements before</li>
            <li>Move the greater elements up by one and put the current element</li>
        `;
    } else if (sortType == 'selection-sort') {
        sortTypeDisplayElement.textContent = 'Selection Sort';
        sortDetailsElement.innerHTML = `
            <li>Loop through each element and find the smallest element or largest depending on sort order</li>
            <li>Swap the element with the current element</li>
        `;
    }
}