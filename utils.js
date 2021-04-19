const colours = {
    BAR_COLOUR: 'blue',
    CURRENT_COLOUR: 'red',
    SWAP_COLOUR: 'orange',
    SORTED_COLOUR: 'green'
};

function updateView(values, elements) {
    elements.visualizationPanelElement.innerHTML = '';

    values.forEach(element => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.textContent = element.value;
        bar.style.background = element.colour;
        bar.style.height = `${element.value}%`;

        elements.visualizationPanelElement.appendChild(bar);
    });
}

function swap(values, i, j) {
    const temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}

function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

function endSort(elements) {
    for (const child of elements.visualizationPanelElement.children) {
        child.style.background = colours.SORTED_COLOUR;
    }

    elements.sortButtonElement.disabled = false;
    elements.generateButtonElement.disabled = false;
}

function highlightSortStatus(sortDetailsElement, currentStatus) {
    Array.from(sortDetailsElement.children).forEach(element => element.style.border = 'none');
    sortDetailsElement.children[currentStatus].style.border = '';
}

export {
    colours,
    updateView,
    swap,
    customDelay,
    endSort,
    highlightSortStatus
};