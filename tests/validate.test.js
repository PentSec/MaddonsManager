const fs = require('fs-extra');
const path = require('path');

const allowedValues = {
    expansions: ['Cataclysm', 'Lichking', 'Pandarian'],
    tags: ['General', 'PvE', 'PvP'],
    roles: ['All', 'DPS', 'TANK', 'HEALER'],
    classes: [
        'All', 'Rogue', 'Warrior', 'Paladin', 'Death Knight',
        'Druid', 'Hunter', 'Mage', 'Monk', 'Priest', 'Shaman', 'Warlock',
    ],
};

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const isValidFileName = (name) => /^[a-zA-Z0-9-_+.]+$/.test(name);

describe('validate json and folder structure', () => {
    const jsonFiles = ['Maddons.json', 'ElvUI.json', 'WeakAuras.json'];
    const baseDir = path.resolve('API');

    jsonFiles.forEach((jsonFile) => {
        test(`validate ${jsonFile}`, () => {
            const jsonPath = path.resolve(baseDir, jsonFile);
            if (!fs.existsSync(jsonPath)) {
                console.log(`${jsonFile} dont exist, skipping...`);
                return;
            }

            const data = readJson(jsonPath);

            const fileNamesSet = new Set();

            data.forEach((entry) => {
                const { title, file_name, expansion, tags, roles, class: classes } = entry;

                if (!file_name) {
                    throw new Error(`the field file_name is required: ${JSON.stringify(entry)}`);
                }

                Object.keys(entry).forEach((key) => {
                    expect(key).toBe(key.toLowerCase());
                });

                if (!isValidFileName(file_name)) {
                    console.log(`The value of the "file_name" field that failed is: "${file_name}". It should contain only letters, numbers, hyphens (-) or underscores (_).`);
                }
                expect(isValidFileName(file_name)).toBe(true);

                if (fileNamesSet.has(file_name)) {
                    throw new Error(` The file_name "${file_name}" is duplicated in the ${jsonFile} file.`);
                }
                fileNamesSet.add(file_name);

                expansion.forEach((value) => expect(allowedValues.expansions).toContain(value));
                tags.forEach((value) => expect(allowedValues.tags).toContain(value));
                roles.forEach((value) => expect(allowedValues.roles).toContain(value));
                classes.forEach((value) => expect(allowedValues.classes).toContain(value));

                let folderPath, expectedFiles;
                if (jsonFile === 'Maddons.json') {
                    folderPath = path.join(baseDir, 'Addons', file_name);
                    expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.zip`];
                } else {
                    const type = jsonFile.replace('.json', '');
                    folderPath = path.join(baseDir, type, file_name);
                    expectedFiles = [`post.md`, `${file_name}.webp`, `${file_name}.txt`];
                }
                const folderExists = fs.existsSync(folderPath);
                if (!folderExists) {
                    console.log(`La carpeta no existe: ${folderPath}`);
                }
                expect(fs.existsSync(folderPath)).toBe(true);

                expectedFiles.forEach((file) => {
                    const filePath = path.join(folderPath, file);
                    const fileExists = fs.existsSync(filePath);
                    if (!fileExists) {
                        console.log(`El archivo no existe: ${filePath}`);
                    }
                    expect(fs.existsSync(filePath)).toBe(true);
                });
            });
        });
    });
});
