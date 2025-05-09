function createBolasGrid(containerId, totalBolas = 20, rows = 5, cols = 7) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const totalSlots = rows * cols;
    const emptySlots = new Set();
    const colors = ['red', 'yellow', 'blue', 'green'];
    const svgPaths = Array.from({length: 7}, (_, i) => `assets/data/icons/metrobus_icons/${i+1}.svg`);
    const emptySlotsCount = Math.ceil(totalSlots * 0.35); 

    const minEmptySlots = Math.ceil(totalSlots * 0.1);
    while (emptySlots.size < emptySlotsCount) {
        emptySlots.add(Math.floor(Math.random() * totalSlots));
    }
    

    

    const ballsWithIcons = Math.floor(totalBolas / 2); 
    const colorCount = Math.ceil(totalBolas / colors.length);
    
    let colorPool = [];
    for (let i = 0; i < colorCount; i++) {
        colorPool.push(...colors);
    }
    colorPool = colorPool.slice(0, totalBolas).sort(() => Math.random() - 0.5);

    const iconPositions = new Set();
    const nonEmptyPositions = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const position = row * cols + col;
            if (!emptySlots.has(position)) {
                nonEmptyPositions.push(position);
            }
        }
    }

    nonEmptyPositions.sort(() => Math.random() - 0.5);
    const selectedForIcons = nonEmptyPositions.slice(0, ballsWithIcons);

    let colorIndex = 0;
    let svgIndex = 0;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const position = row * cols + col;
            if (!emptySlots.has(position)) {
                const bola = document.createElement('div');
                bola.className = 'bola';
                
                bola.style.backgroundColor = `var(--${colorPool[colorIndex++]})`;
                
                if (selectedForIcons.includes(position)) {
                    const svg = document.createElement('img');
                    svg.src = svgPaths[svgIndex % svgPaths.length];
                    svg.className = 'bola-icon';
                    bola.appendChild(svg);
                    svgIndex++;
                }
                
                container.appendChild(bola);
            } else {
                const empty = document.createElement('div');
                empty.className = 'empty-slot';
                container.appendChild(empty);
            }
        }
        if (row < rows - 1) container.appendChild(document.createComment('row'));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const containers = [
        { id: 'bolas-container1', rows: 5, cols: 7, totalBolas: 20 },
        { id: 'bolas-container2', rows: 5, cols: 5, totalBolas: 20 },
        { id: 'bolas-container3', rows: 3, cols: 5, totalBolas: 15 },
        { id: 'bolas-container4', rows: 7, cols: 7, totalBolas: 30 },
        { id: 'bolas-container5', rows: 3, cols: 5, totalBolas: 15 },
    ];

    containers.forEach(({ id, rows, cols, totalBolas }) => {
        createBolasGrid(id, totalBolas, rows, cols);
    });
});
