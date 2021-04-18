import { customDelay, doneSorting } from './utils.js';

export default async function bubbleSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 0; i < values.length; i++) {
        let swapped = false;

        for (let j = 0; j < values.length - i - 1; j++) {
            Array.from(elements.sortDetailsElement.children).forEach(element => element.style.border = 'none');
            elements.sortDetailsElement.children[0].style.border = '';

            updateView(values, j, j + 1, 'red', elements);
            await customDelay(delay);

            if (values[j] > values[j + 1]) {
                Array.from(elements.sortDetailsElement.children).forEach(element => element.style.border = 'none');
                elements.sortDetailsElement.children[1].style.border = '';

                swap(values, j, j + 1);
                swapped = true;
                
                updateView(values, j, j + 1, 'green', elements);
                await customDelay(delay);
            }
        }

        if (swapped == false) {
            Array.from(elements.sortDetailsElement.children).forEach(element => element.style.border = 'none');
            elements.sortDetailsElement.children[2].style.border = '';
            break;
        }
    }

    doneSorting(elements);
    
    return values;
}

function swap(values, i, j) {
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}

function updateView(values, i, j, colour, { visualizationPanelElement }) {
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