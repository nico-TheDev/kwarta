import fs from 'fs';
import path from 'path';

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name === 'page.tsx') fixFile(full);
    }
}

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    content = content.replace(/import Head from[^\n]+\n/g, '');
    content = content.replace(/\nPage\.getLayout[\s\S]*?(?=\n\n|\n$)/g, '');
    content = content.replace(/\nexport default Page\n?/g, '');
    content = content.replace(/from '\.\.\/__mocks__/g, "from '__mocks__/");
    content = content.replace(/from '\.\.\/\.\.\/__mocks__/g, "from '__mocks__/");

    // export default function Page() { <>  -> add return
    content = content.replace(
        /export default function Page\(\) \{\s*\n(\s*)<>(?!\s*return)/,
        'export default function Page() {\n$1return (\n$1<>'
    );

    // Trailing ); from arrow component -> );
    if (/\n\)\s*;?\s*\n\s*\n/.test(content) && !content.trimEnd().endsWith('}')) {
        content = content.replace(/\n\)\s*;?\s*$/, '\n    );\n}');
    } else if (content.match(/export default function Page\(\) \{[\s\S]*\n\)\s*$/)) {
        content = content.replace(/\n\)\s*$/, '\n    );\n}');
    }

    // Remove orphan layout fragments
    content = content.replace(/\n\s*<DashboardLayout>[\s\S]*?<\/DashboardLayout>\s*\n\)\s*;?\s*/g, '\n');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
}

walk(path.join(process.cwd(), 'src/app'));
