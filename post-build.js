const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'assets', 'config.json');

// Restaura o config.json original
fs.copyFileSync(configPath + '.bak', configPath);
fs.unlinkSync(configPath + '.bak');

console.log('Configuração original restaurada.');
