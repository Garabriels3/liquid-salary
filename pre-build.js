const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src', 'assets', 'config.json');
const exampleConfigPath = path.join(__dirname, 'src', 'assets', 'config.example.json');

// Faz backup do config.json original
fs.copyFileSync(configPath, configPath + '.bak');

// Copia o config.example.json para config.json
fs.copyFileSync(exampleConfigPath, configPath);

console.log('Configuração de exemplo copiada para build de produção.');
