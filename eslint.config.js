import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist', 'vite.config.js', 'eslint.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      perfectionist,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      'perfectionist/sort-imports': [
        2,
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          newlinesBetween: 'always',
          customGroups: {
            value: {
              react: ['^react$', '^react-dom$'],
              libraries: ['^@?\\w'],
              // Универсальные группы для всех слоев FSD
              sharedUiMui: ['^@/shared/ui/mui(?:/.*)?$'],
              sharedUiComponents: ['^@/shared/ui/components(?:/.*)?$'],
              sharedUiIcons: ['^@/shared/ui/icons(?:/.*)?$'],
              sharedUiImages: ['^@/shared/ui/images(?:/.*)?$'],
              sharedLib: ['^@/shared/lib(?:/.*)?$'],
              sharedApi: ['^@/shared/api(?:/.*)?$'],
              sharedTypes: ['^@/shared/types(?:/.*)?$'],
              sharedConstants: ['^@/shared/constants(?:/.*)?$'],
              sharedOther: ['^@/shared(?:/.*)?$'],
              entities: ['^@/entities(?:/.*)?$'],
              features: ['^@/features(?:/.*)?$'],
              widgets: ['^@/widgets(?:/.*)?$'],
              pages: ['^@/pages(?:/.*)?$'],
              app: ['^@/app(?:/.*)?$'],
              local: ['^\\.']
            }
          },
          groups: [
            'react',
            'libraries',
            'sharedUiMui',
            'sharedUiComponents',
            'sharedUiIcons',
            'sharedUiImages',
            'sharedLib',
            'sharedApi',
            'sharedTypes',
            'sharedConstants',
            'sharedOther',
            'entities',
            'features',
            'widgets',
            'pages',
            'app',
            'local'
          ]
        }
      ],
      'sort-imports': [
        2,
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
          memberSyntaxSortOrder: ['multiple', 'single', 'all', 'none']
        }
      ],
      'perfectionist/sort-named-imports': [
        2,
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true
        }
      ]
    }
  }
];
