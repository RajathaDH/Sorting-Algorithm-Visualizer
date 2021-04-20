import { colours, updateView, customDelay, endSort, highlightSortStatus } from './utils.js';

export default async function insertionSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 1; i < values.length; i++) {
        const currentValue = values[i];
        let compareIndex = i - 1;

        elements.sortInfoElement.textContent = `Current Value: ${currentValue.value}`;
        currentValue.colour = colours.CURRENT_COLOUR;
        highlightSortStatus(elements.sortDetailsElement, 1);
        updateView(values, elements);
        await customDelay(delay);

        while (compareIndex >= 0 && currentValue.value < values[compareIndex].value) {
            values[compareIndex + 1].colour = colours.SWAP_COLOUR;
            highlightSortStatus(elements.sortDetailsElement, 2);
            updateView(values, elements);
            await customDelay(delay);

            values[compareIndex + 1] = values[compareIndex];
            compareIndex--;

            changeColours(values, compareIndex, i);
            updateView(values, elements);
            await customDelay(delay);
        }

        values[compareIndex + 1] = currentValue;

        elements.sortInfoElement.textContent = '';
        highlightSortStatus(elements.sortDetailsElement, 3);
        updateView(values, elements);
        await customDelay(delay);
    }

    highlightSortStatus(elements.sortDetailsElement, 4);
    endSort(elements);
    
    return values;
}

function changeColours(values, compareIndex, i) {
    values.forEach((element, index) => {
        if (index < i) {
            element.colour = colours.SORTED_COLOUR;
        } else if (index == compareIndex) {
            element.colour = colours.SWAP_COLOUR;
        } else {
            element.colour = colours.BAR_COLOUR;
        }
    });
}