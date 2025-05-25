#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]
if (!componentName) {
  console.error('❌ Please provide a component name.')
  process.exit(1)
}

const uiDir = path.resolve(__dirname, '../src/components/ui')
const componentDir = path.join(uiDir, componentName)
const indexPath = path.join(uiDir, 'index.ts')

if (fs.existsSync(componentDir)) {
  console.error(`❌ Component "${componentName}" already exists in ui/`)
  process.exit(1)
}

fs.mkdirSync(componentDir)

fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  `import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './${componentName}.styles';
import { ${componentName}Props } from './${componentName}.types';

const ${componentName}: FC<${componentName}Props> = () => (
  <View style={styles.container}>
    <Text>${componentName}</Text>
  </View>
);

export default ${componentName};
`
)

fs.writeFileSync(
  path.join(componentDir, `${componentName}.types.ts`),
  `export type ${componentName}Props = {};\n`
)

fs.writeFileSync(
  path.join(componentDir, `${componentName}.styles.ts`),
  `import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
});
`
)

fs.writeFileSync(
  path.join(componentDir, `index.ts`),
  `export { default as ${componentName} } from './${componentName}';\n`
)

const exportLine = `export * from "./${componentName}";\n`
const indexContent = fs.existsSync(indexPath)
  ? fs.readFileSync(indexPath, 'utf8')
  : ''

if (!indexContent.includes(exportLine.trim())) {
  fs.appendFileSync(indexPath, exportLine)
  console.log(`📦 Added export to ui/index.ts`)
} else {
  console.log(`ℹ️ Export already exists in ui/index.ts`)
}

console.log(
  `✅ Component "${componentName}" created successfully in src/components/ui/`
)
