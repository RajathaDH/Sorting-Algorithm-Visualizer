function customDelay(delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });

    return promise;
}

function doneSorting(elements) {
    for (const child of elements.visualizationPanelElement.children) {
        child.style.background = 'blue';
    }

    elements.sortButtonElement.disabled = false;
    elements.generateButtonElement.disabled = false;
}

export {
    customDelay,
    doneSorting
}