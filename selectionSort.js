import { customDelay, doneSorting } from './utils.js';

export default async function selectionSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 0; i < values.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < values.length; j++) {
            if (values[j] < values[minIndex]) {
                minIndex = j;
            }

            updateView(values, i, j, minIndex, elements);

            await customDelay(delay);
        }

        if (minIndex != i) {
            const temp = values[i];
            values[i] = values[minIndex];
            values[minIndex] = temp;
        }
    }

    updateView(values, null, null, null, elements);

    doneSorting(elements);
    
    return values;
}

function updateView(values, sortedPart, currentValue, minIndex, { visualizationPanelElement }) {
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