import { colours, updateView, swap, customDelay, endSort } from './utils.js';

export default async function selectionSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 0; i < values.length; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < values.length; j++) {
            if (values[j].value < values[minIndex].value) {
                minIndex = j;
            }

            changeColour(values, i, j, minIndex);
            updateView(values, elements);
            await customDelay(delay);
        }

        if (minIndex != i) {
            swap(values, i, minIndex);

            values[i].colour = colours.SWAP_COLOUR;
            values[minIndex].colour = colours.SWAP_COLOUR;
            updateView(values, elements);
            await customDelay(delay);
        }
    }

    endSort(elements);
    
    return values;
}

function changeColour(values, sortedPart, currentValue, minIndex) {
    values.forEach((element, index) => {
        if (index < sortedPart) {
            element.colour = colours.SORTED_COLOUR;
        } else if (index == currentValue) {
            element.colour = colours.CURRENT_COLOUR;
        } else if (index == minIndex) {
            element.colour = colours.SWAP_COLOUR;
        } else {
            element.colour = colours.BAR_COLOUR;
        }
    });
}