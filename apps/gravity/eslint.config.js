// apps/gravity/eslint.config.js
import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));
const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig([
  // Respect .gitignore
  includeIgnoreFile(gitignorePath),

  // Base JS + TS + Svelte + Prettier configs
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],

  // Our app-specific settings
  {
    files: ['**/*.{js,ts,svelte}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,               // ✅ fixes the original tsconfigRootDir error
        extraFileExtensions: ['.svelte'],
        svelteConfig,                  // let the Svelte plugin know about svelte.config.js
        // ❌ removed projectService: true
        // If you ever want type-aware linting, we can re-enable this and configure it properly.
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // Recommended by typescript-eslint for TS projects
      'no-undef': 'off'
    }
  }
]);


