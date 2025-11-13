import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Read the versions file
const versionsPath = join(process.cwd(), 'server/data/versions.ts');
const content = readFileSync(versionsPath, 'utf-8');

// Parse the versionsData array
const arrayStart = content.indexOf('export const versionsData: Version[] = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find versionsData array in file');
  process.exit(1);
}

// Import the actual data
import('../server/data/versions.js').then(({ versionsData }) => {
  console.log(`Loaded ${versionsData.length} versions`);
  
  // Find duplicates by version number
  const versionMap = new Map<string, typeof versionsData>();
  versionsData.forEach((v: any) => {
    if (!versionMap.has(v.version)) {
      versionMap.set(v.version, []);
    }
    versionMap.get(v.version)!.push(v);
  });

  // Report duplicates
  const duplicates = Array.from(versionMap.entries()).filter(([_, versions]) => versions.length > 1);
  
  if (duplicates.length === 0) {
    console.log('\n✅ No duplicates found!');
    console.log(`Total versions: ${versionsData.length}`);
    console.log(`Total features: ${versionsData.reduce((sum: number, v: any) => sum + v.features.length, 0)}`);
    return;
  }
  
  console.log(`\n❌ Found ${duplicates.length} duplicate version numbers:`);
  duplicates.forEach(([version, versions]) => {
    console.log(`  ${version}: ${versions.length} entries`);
    versions.forEach((v: any, i: number) => {
      console.log(`    ${i + 1}. ${v.features.length} features`);
    });
  });
  
  // Check if dry run
  const dryRun = process.argv.includes('--dry-run');
  
  if (dryRun) {
    console.log('\n✅ DRY RUN - No changes made');
    console.log('Run without --dry-run to remove duplicates');
    return;
  }

  // Keep only the version with MORE features for each duplicate
  const deduped: any[] = [];
  versionMap.forEach((versions, versionNum) => {
    if (versions.length === 1) {
      deduped.push(versions[0]);
    } else {
      // Keep the one with more features
      const best = versions.reduce((a: any, b: any) => a.features.length >= b.features.length ? a : b);
      console.log(`\n  ✅ Keeping ${versionNum} with ${best.features.length} features`);
      deduped.push(best);
    }
  });

  console.log(`\n📊 After deduplication: ${deduped.length} versions, ${deduped.reduce((sum: number, v: any) => sum + v.features.length, 0)} features`);

  // Generate the new file content
  const formattedData = JSON.stringify(deduped, null, 2)
    // Remove quotes from keys
    .replace(/"([^"]+)":/g, '$1:');
  
  const newContent = `import type { Version } from '@shared/schema';

export const versionsData: Version[] = ${formattedData};
`;

  writeFileSync(versionsPath, newContent, 'utf-8');
  console.log('\n✅ File updated successfully!');
}).catch(error => {
  console.error('Error loading versions data:', error);
  console.error('\nMake sure to build the server first: npm run build');
  process.exit(1);
});
