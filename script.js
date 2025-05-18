import { elements } from './elements-data.js';

function categoryToClass(category) {
    switch (category.toLowerCase()) {
        case 'alkali-metal':
            return 'alkali-metal';
        case 'alkaline-earth-metal':
            return 'alkaline-earth-metal';
        case 'transition-metal':
            return 'transition-metal';
        case 'post-transition-metal':
            return 'post-transition-metal';
        case 'metalloid':
            return 'metalloid';
        case 'nonmetal':
            return 'nonmetal';
        case 'noble-gas':
            return 'noble-gas';
        case 'lanthanide':
            return 'lanthanide';
        case 'actinide':
            return 'actinide';
        case 'halogen':
            return 'halogen';
        default:
            return 'unknown';
    }
}

const table = document.getElementById('periodic-table');
const details = document.getElementById('element-details');
const backBtn = document.getElementById('back-btn');

function showTable() {
    table.style.display = 'grid';
    details.style.display = 'none';
    details.setAttribute('aria-hidden', 'true');
    table.setAttribute('aria-hidden', 'false');
    table.focus();
}

function showDetails(element) {
    table.style.display = 'none';
    details.style.display = 'flex';
    details.setAttribute('aria-hidden', 'false');
    table.setAttribute('aria-hidden', 'true');

    document.getElementById('detail-symbol').textContent = element.symbol;
    document.getElementById('detail-atomic-number').textContent = `Atomic Number: ${element.atomicNumber}`;
    document.getElementById('detail-mass').textContent = `Atomic Mass: ${element.atomicMass}`;
    document.getElementById('detail-name').textContent = element.name;
    document.getElementById('detail-atomic-num').textContent = element.atomicNumber;
    document.getElementById('detail-atomic-mass').textContent = element.atomicMass;
    document.getElementById('detail-category').textContent = element.category.replace(/-/g, ' ');
    document.getElementById('detail-group').textContent = element.group !== null && element.group !== undefined ? element.group : '—';
    document.getElementById('detail-period').textContent = element.period;
    document.getElementById('detail-phase').textContent = element.phase ? element.phase : 'Unknown';
    document.getElementById('detail-electron-config').textContent = element.electronConfiguration ? element.electronConfiguration : 'Unknown';
    document.getElementById('detail-discovered').textContent = element.discovered ? `${element.discovered}${element.discoveredBy ? ` by ${element.discoveredBy}` : ''}` : 'Unknown';
    document.getElementById('detail-isotopes').textContent = element.isotopes ? element.isotopes : 'Unknown';
    document.getElementById('detail-fact').textContent = element.fact ? element.fact : 'No interesting fact available.';

    details.focus();
}

function buildTable() {
    table.innerHTML = '';
    elements.forEach(el => {
        if (el.x && el.y) {
            const elDiv = document.createElement('div');
            elDiv.className = `element ${categoryToClass(el.category)}`;
            elDiv.tabIndex = 0;
            elDiv.setAttribute('role', 'gridcell');
            elDiv.setAttribute('aria-label', `${el.name}, Atomic number ${el.atomicNumber}, ${el.category.replace(/-/g, ' ')}`);
            elDiv.innerHTML = `
                <div class="atomic-number">${el.atomicNumber}</div>
                <div class="symbol">${el.symbol}</div>
                <div class="name">${el.name}</div>
                <div class="atomic-mass">${el.atomicMass}</div>
            `;
            elDiv.addEventListener('click', () => showDetails(el));
            elDiv.addEventListener('keydown', e => {
                if(e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showDetails(el);
                }
            });
            elDiv.style.gridColumn = el.x;
            elDiv.style.gridRow = el.y;
            table.appendChild(elDiv);
        }
    });
}

backBtn.addEventListener('click', () => {
    showTable();
});

// Legend hover effects
document.querySelectorAll('#legend > div').forEach(legendDiv => {
    const categoryClass = Array.from(legendDiv.classList).find(cls =>
        [
            'alkali-metal', 'alkaline-earth-metal', 'transition-metal',
            'post-transition-metal', 'metalloid', 'nonmetal', 'noble-gas',
            'lanthanide', 'actinide', 'halogen', 'unknown'
        ].includes(cls)
    );
    if (!categoryClass) return;

    function highlightGroup() {
        document.querySelectorAll(`.element.${categoryClass}`).forEach(el => {
            el.classList.add('legend-hover');
        });
    }
    function removeHighlight() {
        document.querySelectorAll(`.element.${categoryClass}`).forEach(el => {
            el.classList.remove('legend-hover');
        });
    }

    legendDiv.addEventListener('mouseenter', highlightGroup);
    legendDiv.addEventListener('mouseleave', removeHighlight);
    legendDiv.addEventListener('mousedown', highlightGroup);
    legendDiv.addEventListener('mouseup', removeHighlight);
    legendDiv.addEventListener('focus', highlightGroup);
    legendDiv.addEventListener('blur', removeHighlight);
    legendDiv.addEventListener('click', () => {
        const firstEl = document.querySelector(`.element.${categoryClass}`);
        if (firstEl) {
            firstEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            firstEl.classList.add('legend-hover');
            setTimeout(() => firstEl.classList.remove('legend-hover'), 1200);
        }
    });
});

// Description page button
const descBtn = document.createElement('button');
descBtn.textContent = "All Elements Description";
descBtn.style.background = "#ffffff";
descBtn.style.border = "none";
descBtn.style.borderRadius = "12px";
descBtn.style.padding = "10px 18px";
descBtn.style.margin = "1rem auto 0 auto";
descBtn.style.fontSize = "1rem";
descBtn.style.fontWeight = "600";
descBtn.style.color = "#121212";
descBtn.style.cursor = "pointer";
descBtn.style.display = "block";
document.querySelector("#app").insertBefore(descBtn, document.getElementById("periodic-table"));

// Description page logic
const descPage = document.getElementById('all-elements-desc');
const descList = document.getElementById('desc-list');
const descBackBtn = document.getElementById('desc-back-btn');

descBtn.addEventListener('click', () => {
    document.getElementById('periodic-table').style.display = 'none';
    document.getElementById('element-details').style.display = 'none';
    descPage.style.display = 'flex';
    descPage.setAttribute('aria-hidden', 'false');
    buildDescList();
});

descBackBtn.addEventListener('click', () => {
    descPage.style.display = 'none';
    document.getElementById('periodic-table').style.display = 'grid';
    document.getElementById('periodic-table').setAttribute('aria-hidden', 'false');
});

function buildDescList() {
    descList.innerHTML = '';
    elements.forEach(el => {
        const elDiv = document.createElement('div');
        elDiv.style.background = "#222b31";
        elDiv.style.borderRadius = "10px";
        elDiv.style.margin = "10px 0";
        elDiv.style.padding = "16px";
        elDiv.style.boxShadow = "0 2px 8px #0006";
        elDiv.innerHTML = `
            <div style="display:flex;align-items:center;gap:18px;">
                <div style="min-width:60px;text-align:center;">
                    <div style="font-size:2rem;font-weight:700;color:#80cbc4;">${el.symbol}</div>
                    <div style="font-size:1rem;color:#b0bec5;">${el.atomicNumber}</div>
                </div>
                <div style="flex-grow:1;">
                    <div style="font-size:1.2rem;font-weight:600;color:#fff;">${el.name}</div>
                    <div style="font-size:0.95rem;color:#b0bec5;">Category: ${el.category.replace(/-/g, ' ')}</div>
                    <div style="font-size:0.95rem;color:#b0bec5;">Atomic Mass: ${el.atomicMass}</div>
                    <div style="font-size:0.95rem;color:#b0bec5;">Discovered: ${el.discovered ? `${el.discovered}${el.discoveredBy ? ` by ${el.discoveredBy}` : ''}` : 'Unknown'}</div>
                    <div style="font-size:0.95rem;color:#b0bec5;">Isotopes: ${el.isotopes || 'Unknown'}</div>
                    <div style="font-size:0.95rem;color:#b0bec5;margin-top:8px;font-style:italic;">${el.fact || ''}</div>
                </div>
            </div>
        `;
        descList.appendChild(elDiv);
    });
}

// Tooltip logic
const tooltip = document.getElementById('element-tooltip');

table.addEventListener('mouseover', function(e) {
    const elDiv = e.target.closest('.element');
    if (!elDiv) return;
    const atomicNumber = elDiv.querySelector('.atomic-number')?.textContent;
    const element = elements.find(e => e.atomicNumber == atomicNumber);
    if (!element) return;

    tooltip.innerHTML = `
        <strong style="font-size:1.1rem;color:#80cbc4;">${element.name} (${element.symbol})</strong><br>
        <span>Atomic Number: ${element.atomicNumber}</span><br>
        <span>Atomic Mass: ${element.atomicMass}</span><br>
        <span>Category: ${element.category.replace(/-/g, ' ')}</span><br>
        <span>Discovered: ${element.discovered ? `${element.discovered}${element.discoveredBy ? ` by ${element.discoveredBy}` : ''}` : 'Unknown'}</span>
    `;
    tooltip.style.display = 'block';
});

table.addEventListener('mousemove', function(e) {
    tooltip.style.left = (e.clientX + 20) + 'px';
    tooltip.style.top = (e.clientY + 10) + 'px';
});

table.addEventListener('mouseout', function(e) {
    if (e.relatedTarget && e.relatedTarget.closest('.element')) return;
    tooltip.style.display = 'none';
});

// Initialize
buildTable();
showTable();