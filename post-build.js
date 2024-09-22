const fs = require('fs');
const path = require('path');

const srcConfigPath = path.join(__dirname, 'src', 'assets', 'config.json');

// Restaura o config.json original em src
if (fs.existsSync(srcConfigPath + '.bak')) {
  fs.copyFileSync(srcConfigPath + '.bak', srcConfigPath);
  fs.unlinkSync(srcConfigPath + '.bak');
}

console.log('Configuração original restaurada.');
