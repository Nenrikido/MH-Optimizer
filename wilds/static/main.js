import Autocomplete from './autocomplete.js';

document.addEventListener('DOMContentLoaded', () => {
    Autocomplete.init('#skills-input', {
        items: skillsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        onSelectItem: onSkillSelect
    });

    Autocomplete.init('#sets-input', {
        items: setsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        onSelectItem: onSetSelect
    });

    Autocomplete.init('#weapons-input', {
        items: weaponsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        onSelectItem: onWeaponSelect
    });
});

let skillIndex = 0;
let setIndex = 0;
let weaponIndex = 0;
const skillsInput = document.getElementById('skills-input')
const setsInput = document.getElementById('sets-input')
const weaponsInput = document.getElementById('weapons-input')

const form = document.querySelector('form');
const submitLaunchButton = document.getElementById('submit-launch');

const loader = document.getElementById('loader');
const optimizationResultsContainer = document.getElementById('optimization-results');

//  defaults TESTING
Array.from([
    {'name': "Razor Sharp", 'max_points': 3, 'weight': 10},
    {'name': 'Critical Boost', 'max_points': 5, 'weight': 10},
    {'name': 'Handicraft', 'max_points': 5, 'weight': 5},
    {'name': 'Quick Sheathe', 'max_points': 3, 'weight': 10},
    {'name': 'Agitator', 'max_points': 5, 'weight': 10},
    {'name': 'Maximum Might', 'max_points': 3, 'weight': 8},
    {'name': 'Counterstrike', 'max_points': 3, 'weight': 8},
    {'name': 'Latent Power', 'max_points': 5, 'weight': 8},
    {'name': 'Weakness Exploit', 'max_points': 5, 'weight': 6},
    {'name': 'Adrenaline Rush', 'max_points': 5, 'weight': 8},
    {'name': 'Burst', 'max_points': 1, 'weight': 10}
]).map(e => {
    const idx = skillsData.indexOf(e.name);
    if (idx === -1) return;
    skillsData.splice(idx, 1);
    addBadge('skills-badges', e.name, skillIndex++, 'Max Points', 'Weight', e.max_points, e.weight)
});

Array.from([
    {'set': "Gore Magala\u0027s Tyranny", 'min_pieces': 2},
    {'set': "Rey Dau\u0027s Voltage", 'min_pieces': 2},
    {'set': "Lord\u0027s Soul", 'min_pieces': 3}
]).map(e => {
    const idx = setsData.indexOf(e.set);
    if (idx === -1) return;
    setsData.splice(idx, 1);
    addBadge('sets-badges', e.set, setIndex++, 'Min Pieces', null, e.min_pieces, '')
});

const idx = weaponsData.indexOf('Dimensius');
if (idx > -1) {
    weaponsData.splice(idx, 1);
    addBadge('weapons-badges', 'Dimensius', weaponIndex++, null, null, '', '')
}
// end defaults

function refreshAutocompleteData(input, data) {
    Autocomplete.getInstance(input).setData(data.map(e => ({label: e, value: e})));
    input.value = '';
}

function addBadge(containerId, name, index, label1, label2, default1, default2) {
    const noFirstLabel = label1 === null;
    const noSecondLabel = label2 === null;
    const container = document.getElementById(containerId);
    const badge = document.createElement('span');
    badge.className = 'badge bg-secondary me-2 mb-2 d-flex justify-content-between';
    badge.style.width = '30%';
    badge.innerHTML = `
                <div class="d-flex align-items-center">
                    ${name}
                </div>
                <div class="d-flex justify-content-end align-items-center">
                    <input type="hidden" name="${containerId.split('-')[0]}_name_${index}" value="${name}">
                    <input 
                        class="ms-1 form-control p-1"
                        style="width:3em;height:1.75em" 
                        type="${noFirstLabel ? 'hidden' : 'number'}" 
                        name="${containerId.split('-')[0]}_${noSecondLabel ? 'min' : 'max'}_${index}" 
                        value="${default1}" 
                        title="${label1}">
                    <input 
                        class="ms-1 form-control p-1"
                        style="width:3em;height:1.75em" 
                        type="${noSecondLabel ? 'hidden' : 'number'}"
                        name="${containerId.split('-')[0]}_weight_${index}"
                        value="${default2}"
                        title="${label2}">
                    <button type="button" class="btn-close btn-close-white ms-2" aria-label="Remove"></button>
                </div>
            `;
    container.appendChild(badge);

    badge.querySelector('.btn-close').addEventListener('click', () => {
        badge.remove();
        if (noFirstLabel) {
            weaponsData.push(name);
            refreshAutocompleteData(weaponsInput, weaponsData)
        } else if (noSecondLabel) {
            setsData.push(name);
            refreshAutocompleteData(setsInput, setsData)
        } else {
            skillsData.push(name);
            refreshAutocompleteData(skillsInput, skillsData)
        }
    });
}

function onSkillSelect({value}) {
    const idx = skillsData.indexOf(value);
    if (idx === -1) return;
    skillsData.splice(idx, 1);
    refreshAutocompleteData(skillsInput, skillsData);
    addBadge('skills-badges', value, skillIndex, 'Max Points', 'Weight', 5, 10);
    skillIndex++;
}

function onSetSelect({value}) {
    const idx = setsData.indexOf(value);
    if (idx === -1) return;
    setsData.splice(idx, 1);
    refreshAutocompleteData(setsInput, setsData);
    addBadge('sets-badges', value, setIndex, 'Min Pieces', null, 2, '');
    setIndex++;
}

function onWeaponSelect({value}) {
    const idx = weaponsData.indexOf(value);
    if (idx === -1) return;
    weaponsData.splice(idx, 1);
    refreshAutocompleteData(weaponsInput, weaponsData);
    addBadge('weapons-badges', value, weaponIndex, null, null, '', '');
    weaponIndex++;
}

form.addEventListener('submit', (e) => {
    submitLaunchButton.disabled = true;
    loader.style.display = 'block';
    optimizationResultsContainer.innerHTML = '';


    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(form);
    fetch(runUrl, {
        "method": "POST",
        "body": formData,
    })
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            data.forEach(e => {
                const el = document.createElement('pre');
                el.innerHTML = e;
                optimizationResultsContainer.appendChild(el);
            });
            submitLaunchButton.disabled = false;
        })
})
