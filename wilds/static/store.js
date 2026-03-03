const DB_NAME = 'MHOptiDB';
const DB_VERSION = 1;
export const STORES = {
    skills: 'skills',
    sets: 'sets',
    weapons: 'weapons',
    amulets: 'amulets',
    config: 'config'
};

const DEFAULT_DATA = {
    config: {
        N: 5,
        include_all_amulets: true,
        transcend: false,
        include_gog_sets: false
    },
    skills: [
        {"name": "Master's Touch", "max_points": 1, "weight": 30},
        {"name": "Critical Boost", "max_points": 5, "weight": 10},
        {"name": "Counterstrike", "max_points": 3, "weight": 10},
        {"name": "Antivirus", "max_points": 3, "weight": 8},
        {"name": "Adrenaline Rush", "max_points": 5, "weight": 6},
        {"name": "Weakness Exploit", "max_points": 5, "weight": 10},
        {"name": "Divine Blessing", "max_points": 3, "weight": 5},
        {"name": "Constitution", "max_points": 5, "weight": 5},
        {"name": "Burst", "max_points": 1, "weight": 10},
        {"name": "Maximum Might", "max_points": 3, "weight": 10},
        {"name": "Quick Sheathe", "max_points": 3, "weight": 10},
        {"name": "Agitator", "max_points": 5, "weight": 10},
    ],
    sets: [
        {'name': "Gore Magala\u0027s Tyranny", 'min_pieces': 2},
        {'name': "Fulgur Anjanath's Will", 'min_pieces': 2},
        {'name': "Lord\u0027s Soul", 'min_pieces': 3}
    ],
    weapons: ["Headsman's Hamus"]
};


export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            Object.values(STORES).forEach(store => {
                if (!db.objectStoreNames.contains(store)) {
                    db.createObjectStore(store, {keyPath: 'id', autoIncrement: true});
                }
            });
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getStoreData(storeName) {
    const db = await initDB();
    return new Promise((resolve) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

export async function saveToStore(storeName, data) {
    const db = await initDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.add(data);
}

export async function clearStore(storeName) {
    const db = await initDB();
    const transaction = db.transaction(storeName, 'readwrite');
    transaction.objectStore(storeName).clear();
}

export async function seedDefaultData() {
    for (const [key, values] of Object.entries(DEFAULT_DATA)) {
        const existing = await getStoreData(STORES[key]);
        if (existing.length === 0) {
            if (key === 'config')
                await saveToStore(STORES[key], values)
            else {
                for (const val of values) {
                    await saveToStore(STORES[key], typeof val === 'string' ? {name: val} : val);
                }
            }
        }
    }
}

export async function saveCurrentConfiguration() {
    await Promise.all([
        clearStore(STORES.skills),
        clearStore(STORES.sets),
        clearStore(STORES.weapons),
        clearStore(STORES.amulets),
        clearStore(STORES.config)
    ]);

    const skillBadges = document.querySelectorAll('#skills-badges .badge');
    for (const badge of skillBadges) {
        const name = badge.innerText.trim();
        const idx = badge.id.split('_').pop();
        const maxPoints = document.querySelector(`input[name="skills_max_${idx}"]`).value;
        const weight = document.querySelector(`input[name="skills_weight_${idx}"]`).value;
        await saveToStore(STORES.skills, {name, max_points: parseInt(maxPoints), weight: parseInt(weight)});
    }

    const setBadges = document.querySelectorAll('#sets-badges .badge');
    for (const badge of setBadges) {
        const name = badge.innerText.trim();
        const idx = badge.id.split('_').pop();
        const minPieces = document.querySelector(`input[name="sets_min_${idx}"]`).value;
        await saveToStore(STORES.sets, {name, min_pieces: parseInt(minPieces)});
    }

    const weaponBadges = document.querySelectorAll('#weapons-badges .badge');
    for (const badge of weaponBadges) {
        const name = badge.innerText.trim();
        await saveToStore(STORES.weapons, {name});
    }


    const amuletContainers = document.querySelectorAll('#amulet-badges > div');
    for (const container of amuletContainers) {
        const idx = container.id.replace('amulet_badge_', '');
        const slots = container.querySelector(`select[name="slots_amulet_${idx}"]`).value;
        const skills = {};
        for (let i = 1; i <= 3; i++) {
            const sName = container.querySelector(`input[name="skill_name_${i}_amulet_${idx}"]`).value;
            const sVal = container.querySelector(`input[name="skill_value_${i}_amulet_${idx}"]`).value;
            if (sName) skills[sName] = parseInt(sVal);
        }
        await saveToStore(STORES.amulets, {slots, skills});
    }

    await saveToStore(STORES.config, {
        N: document.querySelector(`input[name="N"]`).value,
        include_all_amulets: document.querySelector(`#include_all_amulets`).checked,
        transcend: document.querySelector(`#transcend`).checked,
        include_gog_sets: document.querySelector(`#include_gog_sets`).checked
    })

    alert("Configuration saved locally!");
}

