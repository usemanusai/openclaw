const fs = require('fs');

const packagePath = '/opt/openclaw-new/package.json';
const backupPath = '/opt/openclaw-new/package.json.bak';

try {
    // Read the pristine backup
    const packageData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    // 1. Convert workspaces to a flat array for NPM compatibility
    packageData.workspaces = ["packages/*", "extensions/*", "apps/*", "ui"];

    // 2. Setup Overrides (NPM style)
    if (packageData.pnpm && packageData.pnpm.overrides) {
        packageData.overrides = packageData.pnpm.overrides;
        delete packageData.pnpm;
    }

    if (!packageData.overrides) {
        packageData.overrides = {};
    }

    // 3. Force local tarball overrides for problematic dependencies
    packageData.overrides["@whiskeysockets/libsignal-node"] = "file:/tmp/libsignal-node.tar.gz";
    packageData.overrides["@tloncorp/api"] = "file:/tmp/api-beta.tar.gz";

    // 4. Remove baileys from dependencies to prevent direct fetching
    if (packageData.dependencies) {
        delete packageData.dependencies["@whiskeysockets/baileys"];
    }

    // 5. Save the patched package.json
    fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2));
    console.log('Successfully patched package.json with local overrides.');

    // 6. Fix workspace references in all child package.json files
    const walk = (d) => {
        let r = [];
        try {
            fs.readdirSync(d).forEach(f => {
                let p = d + '/' + f;
                let s = fs.statSync(p);
                if (s.isDirectory()) {
                    if (f !== 'node_modules' && f !== '.git' && f !== '.pnpm-store') {
                        r = r.concat(walk(p));
                    }
                } else if (f === 'package.json') {
                    r.push(p);
                }
            });
        } catch (e) { }
        return r;
    };

    const allPackageJsons = walk('/opt/openclaw-new');
    allPackageJsons.forEach((file) => {
        if (file === packagePath) return; // Skip root
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('workspace:*')) {
            const patched = content.replace(/workspace:\*/g, '*');
            fs.writeFileSync(file, patched);
            console.log(`Patched workspace reference in ${file}`);
        }
    });

} catch (err) {
    console.error('Error patching package.json:', err);
    process.exit(1);
}
