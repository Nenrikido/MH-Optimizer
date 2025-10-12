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
});

let skillIndex = 0;
let setIndex = 0;
const skillsInput = document.getElementById('skills-input')
const setsInput = document.getElementById('sets-input')


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

function refreshAutocompleteData(input, data) {
    Autocomplete.getInstance(input).setData(data.map(e => ({label: e, value: e})));
    input.value = '';
}

function addBadge(containerId, name, index, label1, label2, default1, default2) {
    const isSet = label2 === null;
    const container = document.getElementById(containerId);
    const badge = document.createElement('span');
    badge.className = 'badge bg-primary me-2 mb-2';
    badge.innerHTML = `
                ${name}
                <input type="hidden" name="${containerId.split('-')[0]}_name_${index}" value="${name}">
                <input type="number" name="${containerId.split('-')[0]}_${isSet ? 'min' : 'max'}_${index}" value="${default1}" placeholder="${label1}" size="4">
                <input type="${isSet ? 'hidden' : 'number'}" name="${containerId.split('-')[0]}_weight_${index}" value="${default2}" placeholder="${label2}" size="4">
                <button type="button" class="btn-close btn-close-white ms-2" aria-label="Remove"></button>
            `;
    container.appendChild(badge);

    badge.querySelector('.btn-close').addEventListener('click', () => {
        badge.remove();
        if (isSet) {
            setsData.push(name);
            refreshAutocompleteData(setsInput, setsData)
        } else {
            skillsData.push(name);
            refreshAutocompleteData(skillsInput, skillsData)
        }
    });
}

function onSkillSelect({ value }) {
    const idx = skillsData.indexOf(value);
    if (idx === -1) return;
    skillsData.splice(idx, 1);
    refreshAutocompleteData(skillsInput, skillsData);
    addBadge('skills-badges', value, skillIndex, 'Max Points', 'Weight', 5, 10);
    skillIndex++;
}

function onSetSelect({ value }) {
    const idx = setsData.indexOf(value);
    if (idx === -1) return;
    setsData.splice(idx, 1);
    refreshAutocompleteData(setsInput, setsData);
    addBadge('sets-badges', value, setIndex, 'Min Pieces', null, 2, '');
    setIndex++;
}
