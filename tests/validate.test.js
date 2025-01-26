const fs = require('fs-extra');
const path = require('path');

const allowedValues = {
    expansions: ['Cataclysm', 'Lichking', 'Pandaria', 'Vanilla', 'TBC'],
    tags: [
        'General',
        'PvE',
        'PvP',
        'All Categories',
        'Achievements',
        'Action Bars',
        'Artwork',
        'Auction & Economy',
        'Audio & Video',
        'Bags & Inventory',
        'Boss Encounters',
        'Buffs & Debuffs',
        'Chat & Communication',
        'Class',
        'Combat',
        'Data Export',
        'Development Tools',
        'Guild',
        'Libraries',
        'Mail',
        'Map & Minimap',
        'Minigames',
        'Miscellaneous',
        'Professions',
        'PvP',
        'Quests & Leveling',
        'Roleplay',
        'Tooltip',
        'Unit Frames',
        'Companions',
    ],
    roles: ['All', 'DPS', 'TANK', 'HEALER'],
    classes: [
        'All',
        'Rogue',
        'Warrior',
        'Paladin',
        'Death Knight',
        'Druid',
        'Hunter',
        'Mage',
        'Monk',
        'Priest',
        'Shaman',
        'Warlock',
    ],
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const isValidFileName = (name) => /^[a-zA-Z0-9-_+. ]+$/.test(name);

describe('validate json and folder structure', () => {
    const baseDirs = ['Addons', 'ElvUI', 'WeakAuras'];
    const basePath = path.resolve('API');

    baseDirs.forEach((dir) => {
        test(`validate JSON files in ${dir}`, () => {
            const dirPath = path.join(basePath, dir);
            if (!fs.existsSync(dirPath)) {
                console.log(`Directory ${dirPath} does not exist, skipping...`);
                return;
            }

            const jsonFiles = fs.readdirSync(dirPath).filter((file) => file.endsWith('.json'));

            jsonFiles.forEach((jsonFile) => {
                const jsonPath = path.join(dirPath, jsonFile);
                const data = readJson(jsonPath);

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

                    tags.forEach((value) => expect(allowedValues.tags).toContain(value));
                    roles.forEach((value) => expect(allowedValues.roles).toContain(value));
                    classes.forEach((value) => expect(allowedValues.classes).toContain(value));

                    // Verify folder and file structure
                    const folderPath = path.join(dirPath, Array.isArray(expansion) ? expansion[0] : expansion, file_name);

                    const folderExists = fs.existsSync(folderPath);
                    if (!folderExists) {
                        console.log(`Folder does not exist: ${folderPath}`);
                    }
                    expect(folderExists).toBe(true);

                    const expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.zip`];
                    expectedFiles.forEach((file) => {
                        const filePath = path.join(folderPath, file);
                        const fileExists = fs.existsSync(filePath);
                        if (!fileExists) {
                            console.log(`File does not exist: ${filePath}`);
                        }
                        expect(fileExists).toBe(true);
                    });
                });
            });
        });
    });
});
