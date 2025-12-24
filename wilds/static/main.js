import Autocomplete from './autocomplete.js';
import {getStoreData, seedDefaultData, saveCurrentConfiguration, STORES} from './store.js';

let amuletIndex = 0;
document.addEventListener('DOMContentLoaded', async () => {
    Autocomplete.init('#skills-input', {
        items: availableSkillsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        fixed: true,
        onSelectItem: onSkillSelect
    });

    Autocomplete.init('#sets-input', {
        items: availableSetsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        fixed: true,
        onSelectItem: onSetSelect
    });

    Autocomplete.init('#weapons-input', {
        items: availableWeaponsData.map(e => ({label: e, value: e})),
        suggestionsThreshold: 0,
        highlightTyped: true,
        fixed: true,
        onSelectItem: onWeaponSelect
    });
    const saveBtn = document.getElementById('save-configuration');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCurrentConfiguration);
    }

    const amuletBadgeTemplate = document.querySelector('#amulet-badge-template');
    const amuletBadgesContainer = document.querySelector('#amulet-badges');
    document.querySelector('#amulet-add').addEventListener('click', () => {
        const newBadge = amuletBadgeTemplate.cloneNode(true);
        newBadge.id = `amulet-badge-${amuletIndex}`
        newBadge.style.display = 'block';

        amuletBadgesContainer.appendChild(newBadge);

        const slotsValueInput = newBadge.querySelector(`[name='slots_amulet_']`);
        slotsValueInput.name = `slots_amulet_${amuletIndex}`;
        const slotsRemoveButton = newBadge.querySelector(`#slots_remove_amulet_`);
        slotsRemoveButton.id = `slots_remove_amulet_${amuletIndex}`;
        slotsRemoveButton.addEventListener('click', () => {
            slotsValueInput.value = null
        })
        for (const i of [1, 2, 3]) {
            newBadge.querySelector(`input[name='skill_name_${i}_amulet_']`).name = `skill_name_${i}_amulet_${amuletIndex}`;
            const skillValueInput = newBadge.querySelector(`input[name='skill_value_${i}_amulet_']`);
            skillValueInput.name = `skill_value_${i}_amulet_${amuletIndex}`;
            const skillRemoveButton = newBadge.querySelector(`#skill_remove_${i}_amulet_`);
            skillRemoveButton.id = `skill_remove_${i}_amulet_${amuletIndex}`;
            skillRemoveButton.addEventListener('click', () => {
                skillValueInput.value = null
            })
            Autocomplete.init(`#amulet-badge-${amuletIndex} input[name='skill_name_${i}_amulet_${amuletIndex}']`, {
                items: skillsData.map(e => ({label: e, value: e})),
                suggestionsThreshold: 0,
                highlightTyped: true,
                fixed: true,
                clearControl: `#skill_remove_${i}_amulet_${amuletIndex}`
            })
            newBadge.querySelector('.close-amulet-badge').addEventListener('click', () => {
                newBadge.remove();
            });
        }
        amuletIndex++;
    })

    await seedDefaultData();

    (await getStoreData(STORES.skills)).forEach(skill => {
        const idx = availableSkillsData.indexOf(skill.name);
        if (idx === -1) return;
        availableSkillsData.splice(idx, 1);
        refreshAutocompleteData(skillsInput, availableSkillsData);
        addBadge('skills-badges', skill.name, skillIndex++, 'Max Points', 'Weight', skill.max_points, skill.weight)
    });

    (await getStoreData(STORES.sets)).map(set => {
        const idx = availableSetsData.indexOf(set.set);
        if (idx === -1) return;
        availableSetsData.splice(idx, 1);
        refreshAutocompleteData(skillsInput, availableSkillsData);
        addBadge('sets-badges', set.set, setIndex++, 'Min Pieces', null, set.min_pieces, '')
    });

    (await getStoreData(STORES.weapons)).forEach(weapon => {
        const idx = availableWeaponsData.indexOf(weapon.name);
        if (idx > -1) {
            availableWeaponsData.splice(idx, 1);
            refreshAutocompleteData(skillsInput, availableSkillsData);
            addBadge('weapons-badges', weapon.name, weaponIndex++, null, null, '', '')
        }
    });

    const config = (await getStoreData(STORES.config)).pop();
    document.querySelector(`input[name="N"]`).value = config.N;
    document.querySelector(`#include_all_amulets`).checked = config.include_all_amulets;
    document.querySelector(`#transcend`).checked = config.transcend;
    document.querySelector(`#include_gog_sets`).checked = config.include_gog_sets;
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


function refreshAutocompleteData(input, data) {
    Autocomplete.getInstance(input).setData(data.map(e => ({label: e, value: e})));
    input.value = '';
}

function addBadge(containerId, name, index, label1, label2, default1, default2) {
    const noFirstLabel = label1 === null;
    const noSecondLabel = label2 === null;
    const container = document.getElementById(containerId);
    const badge = document.createElement('span');
    badge.id = `${containerId.split('-')[0]}_badge_${index}`;
    badge.className = 'badge bg-secondary d-flex justify-content-between';
    badge.style.minWidth = 'calc(25% - 0.375rem)';
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
            availableWeaponsData.push(name);
            refreshAutocompleteData(weaponsInput, availableWeaponsData)
        } else if (noSecondLabel) {
            availableSetsData.push(name);
            refreshAutocompleteData(setsInput, availableSetsData)
        } else {
            availableSkillsData.push(name);
            refreshAutocompleteData(skillsInput, availableSkillsData)
        }
    });
}

function onSkillSelect({value}) {
    const idx = availableSkillsData.indexOf(value);
    if (idx === -1) return;
    availableSkillsData.splice(idx, 1);
    refreshAutocompleteData(skillsInput, availableSkillsData);
    addBadge('skills-badges', value, skillIndex, 'Max Points', 'Weight', 5, 10);
    skillIndex++;
}

function onSetSelect({value}) {
    const idx = availableSetsData.indexOf(value);
    if (idx === -1) return;
    availableSetsData.splice(idx, 1);
    refreshAutocompleteData(setsInput, availableSetsData);
    addBadge('sets-badges', value, setIndex, 'Min Pieces', null, 2, '');
    setIndex++;
}

function onWeaponSelect({value}) {
    const idx = availableWeaponsData.indexOf(value);
    if (idx === -1) return;
    availableWeaponsData.splice(idx, 1);
    refreshAutocompleteData(weaponsInput, availableWeaponsData);
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
