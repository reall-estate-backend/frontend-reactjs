import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: ['dist'], // Ignore le dossier dist
    },
    {
        files: ['**/*.{js,jsx}'], // Appliquer ESLint aux fichiers JS/JSX
        languageOptions: {
            ecmaVersion: 2020, // Support des fonctionnalités modernes de JavaScript
            sourceType: 'module', // Support des modules ECMAScript
            globals: globals.browser, // Ajoute les globales des navigateurs
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules, // Règles recommandées pour React Hooks
            'react-refresh/only-export-components': [
                'warn', // Avertit si des composants non exportés correctement
                { allowConstantExport: true },
            ],
        },
    },
];
