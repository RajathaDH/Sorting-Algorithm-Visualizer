import { colours, updateView, customDelay, endSort } from './utils.js';

export default async function insertionSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 1; i < values.length; i++) {
        const currentValue = values[i];
        let compareIndex = i - 1;

        updateView(values, elements);
        await customDelay(delay);

        while (compareIndex >= 0 && currentValue.value < values[compareIndex].value) {
            values[compareIndex + 1] = values[compareIndex];
            compareIndex--;

            changeColours(values, currentValue, compareIndex, i);
            elements.sortInfoElement.textContent = currentValue.value ? `Current Value: ${currentValue.value}` : '';
            updateView(values, elements);
            await customDelay(delay);
        }

        values[compareIndex + 1] = currentValue;

        elements.sortInfoElement.textContent = '';
        updateView(values, elements);
        await customDelay(delay);
    }

    endSort(elements);
    
    return values;
}

function changeColours(values, currentValue, compareIndex, i) {
    values.forEach((element, index) => {
        if (index == compareIndex) {
            element.colour = colours.SWAP_COLOUR;
        } else if (index == currentValue) {
            element.colour = colours.CURRENT_COLOUR;
        } else {
            element.colour = colours.BAR_COLOUR;
        }
    });
}