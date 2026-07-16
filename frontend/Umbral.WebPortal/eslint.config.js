const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'umbral',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'umbral',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '[A-Z]',
            match: true,
          },
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'method',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'property',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase'],
        },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/typedef': [
        'error',
        {
          memberVariableDeclaration: true,
          propertyDeclaration: false,
          parameter: true,
          variableDeclaration: false,
          arrowParameter: false,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/valid-aria': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
    },
  },
);
