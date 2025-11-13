import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Read the versions file
const versionsPath = join(process.cwd(), 'server/data/versions.ts');
const content = readFileSync(versionsPath, 'utf-8');

// Parse the versionsData array using a simple approach
// Extract the array content between 'export const versionsData: Version[] = [' and the final '];'
const arrayStart = content.indexOf('export const versionsData: Version[] = [');
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find versionsData array in file');
  process.exit(1);
}

// Import the actual data
import('../server/data/versions.js').then(({ versionsData }) => {
  console.log(`Loaded ${versionsData.length} versions`);
  
  // Sort by releaseDate descending (newest first)
  const sorted = [...versionsData].sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    
    // Check for invalid dates
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.warn(`Invalid date found: ${a.version} (${a.releaseDate}) or ${b.version} (${b.releaseDate})`);
    }
    
    // Descending order (newest first)
    if (dateB.getTime() !== dateA.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // If dates are equal, sort by version string
    return b.version.localeCompare(a.version);
  });
  
  console.log('\n📅 Sorted order (first 10):');
  sorted.slice(0, 10).forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.version} (${v.releaseDate}) - ${v.features.length} features`);
  });
  
  console.log('\n📅 Sorted order (last 10):');
  sorted.slice(-10).forEach((v, i) => {
    console.log(`  ${sorted.length - 10 + i + 1}. ${v.version} (${v.releaseDate}) - ${v.features.length} features`);
  });
  
  // Check if dry run
  const dryRun = process.argv.includes('--dry-run');
  
  if (dryRun) {
    console.log('\n✅ DRY RUN - No changes made');
    console.log(`Total versions: ${sorted.length}`);
    console.log(`Total features: ${sorted.reduce((sum, v) => sum + v.features.length, 0)}`);
    return;
  }
  
  // Generate the new file content
  const header = content.substring(0, arrayStart);
  const footer = content.substring(arrayEnd + 2);
  
  const formattedData = JSON.stringify(sorted, null, 2)
    // Remove quotes from keys
    .replace(/"([^"]+)":/g, '$1:')
    // Fix the Type[] = structure
    .replace(/\[/, 'Version[] = [');
  
  const newContent = `import type { Version } from '@shared/schema';

export const versionsData: ${formattedData};
`;
  
  writeFileSync(versionsPath, newContent, 'utf-8');
  
  console.log('\n✅ File updated successfully!');
  console.log(`Total versions: ${sorted.length}`);
  console.log(`Total features: ${sorted.reduce((sum, v) => sum + v.features.length, 0)}`);
}).catch(error => {
  console.error('Error loading versions data:', error);
  console.error('\nTrying alternative approach with TypeScript compilation...');
  
  // Alternative: Use tsx to compile and run
  console.log('Please run: tsx scripts/sort-versions.ts --dry-run');
  process.exit(1);
});
