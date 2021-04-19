import { colours, updateView, swap, customDelay, endSort, highlightSortStatus } from './utils.js';

export default async function bubbleSort(values, speed, elements) {
    const delay = Math.floor(1000 / speed);

    for (let i = 0; i < values.length; i++) {
        let swapped = false;

        for (let j = 0; j < values.length - i - 1; j++) {
            changeColour(values, 0, values.length - i, colours.BAR_COLOUR);
            highlightSortStatus(elements.sortDetailsElement, 0);
            values[j].colour = colours.CURRENT_COLOUR;
            values[j + 1].colour = colours.CURRENT_COLOUR;

            updateView(values, elements);
            await customDelay(delay);

            if (values[j].value > values[j + 1].value) {
                swap(values, j, j + 1);
                swapped = true;
                
                values[j].colour = colours.SWAP_COLOUR;
                values[j + 1].colour = colours.SWAP_COLOUR;
                highlightSortStatus(elements.sortDetailsElement, 1);

                updateView(values, elements);
                await customDelay(delay);
            }
        }

        changeColour(values, values.length - 1 - i, values.length, colours.SORTED_COLOUR);

        if (swapped == false) {
            changeColour(values, 0, values.length, colours.SORTED_COLOUR);
            highlightSortStatus(elements.sortDetailsElement, 2);
            break;
        }
    }

    endSort(elements);
    
    return values;
}

function changeColour(values, startIndex, endIndex, colour) {
    for (let i = startIndex; i < endIndex; i++) {
        values[i].colour = colour;
    }
}