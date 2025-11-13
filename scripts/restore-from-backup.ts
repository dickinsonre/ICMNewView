import { readFileSync, writeFileSync } from 'fs';

// Read both backup and current files
const backupContent = readFileSync('server/data/versions.ts.backup', 'utf-8');
const currentContent = readFileSync('server/data/versions.ts', 'utf-8');

// Import both datasets
Promise.all([
  import('../server/data/versions.js'),
]).then(([{ versionsData: currentData }]) => {
  // Parse backup using eval (temporary for recovery)
  const backupMatch = backupContent.match(/export const versionsData: Version\[\] = (\[[\s\S]*?\n\]);/);
  if (!backupMatch) {
    console.error('Could not parse backup');
    process.exit(1);
  }
  
  const backupData = eval(backupMatch[1]);
  
  console.log(`Current: ${currentData.length} versions`);
  console.log(`Backup: ${backupData.length} versions`);
  
  // Find missing versions in current that exist in backup
  const currentVersions = new Set(currentData.map((v: any) => v.version));
  const backupVersions = new Map(backupData.map((v: any) => [v.version, v]));
  
  const missing = Array.from(backupVersions.keys()).filter(v => !currentVersions.has(v));
  console.log(`\nMissing versions: ${missing.join(', ')}`);
  
  // Add missing versions with more than 1 feature (exclude placeholders)
  const toRestore: any[] = [];
  missing.forEach(version => {
    const v = backupVersions.get(version);
    if (v && v.features.length > 1) {
      console.log(`  Restoring ${version}: ${v.features.length} features`);
      toRestore.push(v);
    } else {
      console.log(`  Skipping ${version}: only ${v?.features.length || 0} features (placeholder)`);
    }
  });
  
  // Combine and sort
  const combined = [...currentData, ...toRestore];
  console.log(`\nCombined: ${combined.length} versions, ${combined.reduce((sum: number, v: any) => sum + v.features.length, 0)} features`);
  
  // Write to temp file for review
  const formatted = JSON.stringify(combined, null, 2).replace(/"([^"]+)":/g, '$1:');
  const output = `import type { Version } from '@shared/schema';

export const versionsData: Version[] = ${formatted};
`;
  
  writeFileSync('server/data/versions-restored.ts', output);
  console.log('\n✅ Wrote to versions-restored.ts for review');
  console.log('Review the file, then rename it to versions.ts to apply changes');
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
