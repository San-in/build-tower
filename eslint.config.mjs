import { defineConfig } from 'eslint-define-config';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import pluginImport from 'eslint-plugin-import';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['.expo/**/*', '**/*.d.ts', 'node_modules/**/*'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-native': pluginReactNative,
      import: pluginImport,
      '@typescript-eslint': pluginTypescript,
      'react-hooks': pluginReactHooks,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/export': 'error',
      'consistent-return': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'react-hooks/exhaustive-deps': 'warn',  
      'object-shorthand': 'error',  
      'react/jsx-sort-props': ['error', { 'shorthandFirst': true, 'ignoreCase': false }],  
      'react-native/no-unused-styles': 'error',  
      'react-native/split-platform-components': 'error',  
      'react-native/no-inline-styles': 'error',  
      'react-native/sort-styles': [
        'error',
        'asc',
        {
          'ignoreClassNames': false,
          'ignoreStyleProperties': false,
        },
      ],  
      '@typescript-eslint/ban-tslint-comment': 'error',  
      '@typescript-eslint/no-explicit-any': 'error',  
      '@typescript-eslint/no-empty-interface': 'error',  
      'no-duplicate-imports': 'error',  
      'import/no-unassigned-import': ['error', { 'allow': ['react-native-gesture-handler'] }],  
      '@typescript-eslint/explicit-member-accessibility': 'error',  
      'prefer-arrow-callback': ['error', { 'allowNamedFunctions': true }],  
      '@typescript-eslint/typedef': [
        'error',
        {
          'arrayDestructuring': false,
          'arrowParameter': false,
          'memberVariableDeclaration': true,
          'objectDestructuring': false,
          'parameter': true,
          'propertyDeclaration': false,
          'variableDeclaration': false,
          'variableDeclarationIgnoreFunction': false,
        },
      ],
      'curly': 'error',
      'no-new-func': 'error',
      'no-cond-assign': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      'no-empty-function': 'off',  
      'no-template-curly-in-string': 'error',  
      '@typescript-eslint/no-misused-new': 'error',  
      'no-return-await': 'error',  
      'no-sparse-arrays': 'error',  
      'dot-notation': 'error',  
      'no-throw-literal': 'error',  
      'no-unused-expressions': 'off',  
      '@typescript-eslint/no-unused-expressions': ['error'],  
      'no-unused-vars': 'off',  
      'no-unneeded-ternary': 'error',  
      'prefer-object-spread': 'error',  
      'default-case': 'error',  
      'eqeqeq': 'error',  
      'no-useless-constructor': 'off',  
      '@typescript-eslint/no-useless-constructor': ['error'],  
      'eol-last': ['error', 'always'],  
      'react/prop-types': 'off',  
      'indent': 'off',  
      '@typescript-eslint/indent': 'off',  
      'import/no-duplicates': 'error',  
      '@typescript-eslint/array-type': ['error', { 'default': 'generic' }],  
      'arrow-body-style': ['error', 'as-needed'],
      'max-len': [
        'error',
        { 'code': 140, 'ignoreUrls': true, 'ignorePattern': '^import\\s.+\\sfrom\\s.+;$' },
      ],  
      '@typescript-eslint/member-ordering': ['error'],  
      'no-nested-ternary': 'error',  
      'import/no-named-as-default': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'import/order': 'off'
    },
  },
]);

