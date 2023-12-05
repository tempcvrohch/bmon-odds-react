import eslint from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
    {
        "files": ["**/*.ts"],
        "ignores": ["**/node_modules/*"],
        "rules": eslint.configs.recommended.rules
    },
    {
        "rules": typescriptPlugin.configs["eslint-recommended"].overrides[0].rules
    },
    {
        "plugins": {
            "@typescript-eslint": typescriptPlugin
        },
        "languageOptions": {
            "parser": typescriptParser,
            "parserOptions": {
                "project": "./tsconfig.json"
            }
        },
        "rules": {
            ...typescriptPlugin.configs.recommended.rules
        }
    }
];