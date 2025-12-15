import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

// ✅ anchor TypeScript resolution to THIS app directory
const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: { 'no-undef': 'off' }
  },

  // ✅ Type-aware Svelte/TS parsing without monorepo ambiguity
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    ignores: ['eslint.config.js', 'svelte.config.js'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
        projectService: true,            // ✅ re-enable
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  },

  // Optional: don’t type-check tool configs even if projectService is on
  {
    files: ['**/vite.config.ts', '**/*.config.{ts,js}', '**/svelte.config.*'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir,
        projectService: false
      }
    }
  }
);
