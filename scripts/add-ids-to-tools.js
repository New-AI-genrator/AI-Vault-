const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Read the tools file
const toolsPath = path.join(__dirname, '../data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

// Extract the tools array
const toolsMatch = content.match(/export const tools = (\[.*?\]);/s);
if (!toolsMatch) {
  console.error('Could not find tools array in the file');
  process.exit(1);
}

// Parse the tools array
let tools;
try {
  // Remove the export const tools = part and the semicolon
  const toolsStr = toolsMatch[1].trim();
  // Use eval to parse the array (be careful with this in production)
  tools = eval(`(${toolsStr})`);
} catch (error) {
  console.error('Error parsing tools array:', error);
  process.exit(1);
}

// Add IDs to tools that don't have them
const updatedTools = tools.map(tool => ({
  id: uuidv4(),
  ...tool
}));

// Generate the new content
const newContent = `// This file is auto-generated. Do not edit manually.
import { v4 as uuidv4 } from 'uuid';

export const tools = ${JSON.stringify(updatedTools, null, 2)};`;

// Write the updated content back to the file
fs.writeFileSync(toolsPath, newContent, 'utf8');

console.log('Successfully added IDs to all tools!');
