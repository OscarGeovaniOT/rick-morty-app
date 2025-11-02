
const fs = require("fs");
const path = require("path");

// Función para crear carpetas y archivos
function createModule(moduleName, folderStructure) {
  const basePath = path.join("src/", "modules", moduleName);
  console.log("here --> ",basePath);
  

  if (fs.existsSync(basePath)) {
    console.error(`El módulo "${moduleName}" ya existe.`);
    return;
  }

  // Crear la carpeta base del módulo
  fs.mkdirSync(basePath, { recursive: true });

  // Crear la estructura de carpetas y archivos
  folderStructure.forEach((folder) => {
    const folderPath = path.join(basePath, folder.name);
    fs.mkdirSync(folderPath, { recursive: true });

    // Crear archivos dentro de la carpeta
    folder.files.forEach((file) => {
      const filePath = path.join(folderPath, file.name);
      fs.writeFileSync(filePath, file.content || "", "utf8");
    });
  });

  console.log(`Módulo "${moduleName}" creado exitosamente en ${basePath}`);
}

// Configuración de la estructura del módulo
const moduleName = process.argv[2]; // Nombre del módulo desde la línea de comandos
if (!moduleName) {
  console.error("Por favor, proporciona un nombre para el módulo.");
  process.exit(1);
}

const folderStructure = [
  {
    name: "components",
    files: [
        // { name: "index.js", content: "// Componentes del módulo" }
        ],
  },
  {
    name: "screens",
    files: [
        // { name: "index.js", content: "// Pantallas del módulo" }
        ],
  },
  {
    name: "hooks",
    files: [
        // { name: "useExample.js", content: "// Hook de ejemplo" }
        ],
  },
  {
    name: "mappers",
    files: [
        // { name: "styles.js", content: "// Estilos del módulo" }        
    ],
  },
  {
    name: "models",
    files: [
        // { name: "styles.js", content: "// Estilos del módulo" }        
    ],
  },
];

createModule(moduleName, folderStructure);

/*
example command
npm run newModule settings
*/