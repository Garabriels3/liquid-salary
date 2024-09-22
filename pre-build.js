const fs = require('fs');
const path = require('path');

const srcConfigPath = path.join(__dirname, 'src', 'assets', 'config.json');
const docsConfigPath = path.join(__dirname, 'docs', 'assets', 'config.json');
const exampleConfigPath = path.join(__dirname, 'src', 'assets', 'config.example.json');

// Faz backup do config.json original em src
if (fs.existsSync(srcConfigPath)) {
  fs.copyFileSync(srcConfigPath, srcConfigPath + '.bak');
}

// Copia o config.example.json para config.json em src e docs
fs.copyFileSync(exampleConfigPath, srcConfigPath);
fs.copyFileSync(exampleConfigPath, docsConfigPath);

console.log('Configuração de exemplo copiada para build de produção.');
