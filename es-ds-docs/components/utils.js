// utils/loadFile.js
export async function loadFile(filePath) {
    try {
      const module = await import(`${filePath}.vue?raw`);
      return module;
    } catch (error) {
      console.error('Error loading file:', error);
      return null;
    }
  }
