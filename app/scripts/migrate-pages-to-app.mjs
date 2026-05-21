import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/pages');
const appDir = path.join(process.cwd(), 'src/app');

const skip = new Set(['_app.js', '_document.js', '404.js']);
const authRoutes = new Set(['sign-in/index.js', 'sign-in/confirm.js', 'editSurvey.js']);

function toAppPath(rel) {
    const withoutExt = rel.replace(/\.js$/, '');
    if (authRoutes.has(rel)) {
        if (rel === 'sign-in/index.js') return '(auth)/sign-in/page.tsx';
        if (rel === 'sign-in/confirm.js') return '(auth)/sign-in/confirm/page.tsx';
        if (rel === 'editSurvey.js') return '(auth)/edit-survey/page.tsx';
        return `(auth)/${withoutExt}/page.tsx`;
    }
    if (withoutExt.endsWith('/index')) {
        return `(dashboard)/${withoutExt.replace(/\/index$/, '')}/page.tsx`;
    }
    return `(dashboard)/${withoutExt}/page.tsx`;
}

function transform(content, rel) {
    let out = content;
    out = out.replace(/import Head from 'next\/head';\n?/g, '');
    out = out.replace(/import Head from "next\/head";\n?/g, '');
    out = out.replace(/<Head>[\s\S]*?<\/Head>\s*/g, '');
    out = out.replace(/\n?Page\.getLayout\s*=\s*\(page\)\s*=>\s*<DashboardLayout>[\s\S]*?<\/DashboardLayout>;\n?/g, '\n');
    out = out.replace(/import \{ DashboardLayout \} from[^\n]+\n/g, '');
    out = out.replace(/from '\.\.\/\.\.\/components\//g, "from 'components/");
    out = out.replace(/from '\.\.\/components\//g, "from 'components/");
    out = out.replace(/from '\.\.\/\.\.\/\.\.\/components\//g, "from 'components/");
    out = out.replace(/from '\.\.\/\.\.\/stores\//g, "from 'stores/");
    out = out.replace(/from '\.\.\/stores\//g, "from 'stores/");
    out = out.replace(/const Page = \(\) =>/g, 'export default function Page()');
    out = out.replace(/export default Page;\n?/g, '');
    if (!out.includes("'use client'")) {
        out = `'use client';\n\n${out}`;
    }
    return out;
}

function walk(dir, base = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const rel = path.join(base, entry.name).replace(/\\/g, '/');
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, rel);
        } else if (entry.name.endsWith('.js') && !skip.has(entry.name) && !skip.has(rel)) {
            const appPath = path.join(appDir, toAppPath(rel));
            fs.mkdirSync(path.dirname(appPath), { recursive: true });
            const content = fs.readFileSync(full, 'utf8');
            fs.writeFileSync(appPath, transform(content, rel));
            console.log(`Migrated ${rel} -> ${toAppPath(rel)}`);
        }
    }
}

walk(pagesDir);
