import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
    ...nextVitals,
    globalIgnores(['.next/**', 'node_modules/**', '.cache/**']),
    {
        rules: {
            '@next/next/no-img-element': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-max-props-per-line': ['warn', { maximum: 5 }],
        },
    },
]);

export default eslintConfig;
