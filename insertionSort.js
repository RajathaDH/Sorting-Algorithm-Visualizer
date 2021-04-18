import { customDelay, doneSorting } from './utils.js';

export default async function insertionSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 1; i < values.length; i++) {
        const currentValue = values[i];
        let compareValue = i - 1;

        while (compareValue >= 0 && currentValue < values[compareValue]) {
            values[compareValue + 1] = values[compareValue];
            compareValue--;

            updateView(values, currentValue, compareValue, i, elements);

            await customDelay(delay);
        }

        values[compareValue + 1] = currentValue;
    }

    doneSorting(elements);
    
    return values;
}

function updateView(values, currentValue, compareValue, i, { visualizationPanelElement }) {
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