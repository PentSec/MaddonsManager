const fs = require('fs-extra');
const path = require('path');

const allowedValues = {
    expansions: ['Cataclysm', 'Lichking', 'Pandarian', 'Vanilla', 'TBC'],
    tags: [
        'General',
        'PvE', 
        'PvP', 
        "All Categories",
        "Achievements",
        "Action Bars",
        "Artwork",
        "Auction & Economy",
        "Audio & Video",
        "Bags & Inventory",
        "Boss Encounters",
        "Buffs & Debuffs",
        "Chat & Communication",
        "Class",
        "Combat",
        "Data Export",
        "Development Tools",
        "Guild",
        "Libraries",
        "Mail",
        "Map & Minimap",
        "Minigames",
        "Miscellaneous",
        "Professions",
        "PvP",
        "Quests & Leveling",
        "Roleplay",
        "Tooltip",
        "Unit Frames"],
    roles: ['All', 'DPS', 'TANK', 'HEALER',],
    classes: [
        'All', 'Rogue', 'Warrior', 'Paladin', 'Death Knight',
        'Druid', 'Hunter', 'Mage', 'Monk', 'Priest', 'Shaman', 'Warlock',
    ],
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const isValidFileName = (name) => /^[a-zA-Z0-9-_+. ]+$/.test(name);

describe('validate json and folder structure', () => {
    const jsonFiles = ['Maddons.json', 'ElvUI.json', 'WeakAuras.json'];
    const baseDir = path.resolve('API');

    jsonFiles.forEach((jsonFile) => {
        test(`validate ${jsonFile}`, () => {
            const jsonPath = path.resolve(baseDir, jsonFile);
            if (!fs.existsSync(jsonPath)) {
                console.log(`${jsonFile} does not exist, skipping...`);
                return;
            }

            const data = readJson(jsonPath);

            const fileNamesByExpansion = {};

            data.forEach((entry) => {
                const { title, file_name, expansion, tags, roles, class: classes } = entry;

                if (!file_name) {
                    throw new Error(`The field file_name is required: ${JSON.stringify(entry)}`);
                }

                Object.keys(entry).forEach((key) => {
                    expect(key).toBe(key.toLowerCase());
                });

                if (!isValidFileName(file_name)) {
                    console.log(`Invalid "file_name" value: "${file_name}". Allowed characters are letters, numbers, hyphens (-), underscores (_), and spaces.`);
                }
                expect(isValidFileName(file_name)).toBe(true);

                if (!Array.isArray(expansion)) {
                    if (!allowedValues.expansions.includes(expansion)) {
                        throw new Error(`Invalid expansion "${expansion}" in ${JSON.stringify(entry)}`);
                    }
                } else {
                    expansion.forEach((value) => {
                        expect(allowedValues.expansions).toContain(value);
                    });
                }

                if (!fileNamesByExpansion[expansion]) {
                    fileNamesByExpansion[expansion] = new Set();
                }
                if (fileNamesByExpansion[expansion].has(file_name)) {
                    throw new Error(`The file_name "${file_name}" is duplicated in the expansion "${expansion}" in the ${jsonFile} file.`);
                }
                fileNamesByExpansion[expansion].add(file_name);

                tags.forEach((value) => expect(allowedValues.tags).toContain(value));
                roles.forEach((value) => expect(allowedValues.roles).toContain(value));
                classes.forEach((value) => expect(allowedValues.classes).toContain(value));

                // Define folder path based on the JSON file being validated
                let folderPath;
                let expectedFiles;
                if (jsonFile === 'Maddons.json') {
                    folderPath = path.join(baseDir, 'Addons', Array.isArray(expansion) ? expansion[0] : expansion, file_name);
                    expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.zip`];
                } else if (jsonFile === 'ElvUI.json') {
                    folderPath = path.join(baseDir, 'ElvUI', Array.isArray(expansion) ? expansion[0] : expansion, file_name);
                    expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.txt`];
                } else if (jsonFile === 'WeakAuras.json') {
                    folderPath = path.join(baseDir, 'WeakAuras', Array.isArray(expansion) ? expansion[0] : expansion, file_name);
                    expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.txt`];
                }

                const folderExists = fs.existsSync(folderPath);
                if (!folderExists) {
                    console.log(`Folder does not exist: ${folderPath}`);
                }
                expect(fs.existsSync(folderPath)).toBe(true);

                expectedFiles.forEach((file) => {
                    const filePath = path.join(folderPath, file);
                    const fileExists = fs.existsSync(filePath);
                    if (!fileExists) {
                        console.log(`File does not exist: ${filePath}`);
                    }
                    expect(fs.existsSync(filePath)).toBe(true);
                });
            });
        });
    });
});
