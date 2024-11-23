import { execSync } from 'child_process';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the git status output
function getGitStatus() {
  try {
    return execSync('git status --porcelain').toString();
  } catch (error) {
    console.error('Error getting git status:', error.message);
    return '';
  }
}

// Analyze changes to suggest commit type
function suggestCommitType(status) {
  const changes = status.split('\n').filter(Boolean);
  
  // Patterns to match different types of changes
  const patterns = {
    docs: /\.(md|txt|doc|docx)$|documentation|readme/i,
    test: /\.(test|spec)\.[jt]sx?$|tests?\/|__tests__/,
    style: /\.(css|scss|less|styl)$|\.prettierrc|\.eslintrc/,
    feat: /src\/(features|components|pages)\/.*\.[jt]sx?$/,
    fix: /fix|bug|error|issue|crash/i,
    chore: /package(-lock)?\.json$|config|\.gitignore|workflow/,
    refactor: /refactor|restructure|cleanup/i
  };

  // Count matches for each type
  const counts = {
    docs: 0,
    test: 0,
    style: 0,
    feat: 0,
    fix: 0,
    chore: 0,
    refactor: 0
  };

  changes.forEach(change => {
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(change)) {
        counts[type]++;
      }
    }
  });

  // Get the type with the most matches
  const suggestedType = Object.entries(counts)
    .reduce((a, b) => b[1] > a[1] ? b : a)[0];

  return suggestedType || 'feat'; // Default to feat if no matches
}

const commitTypes = {
  feat: 'A new feature',
  fix: 'A bug fix',
  docs: 'Documentation only changes',
  style: 'Changes that do not affect the meaning of the code',
  refactor: 'A code change that neither fixes a bug nor adds a feature',
  test: 'Adding missing tests or correcting existing tests',
  chore: 'Changes to the build process or auxiliary tools'
};

// Get status and suggest type
const status = getGitStatus();
const suggestedType = suggestCommitType(status);

console.log('\nChanged files:');
console.log(status || 'No changes detected');

console.log('\nSuggested commit type:', `${suggestedType}: ${commitTypes[suggestedType]}`);
console.log('\nCommit types:');
Object.entries(commitTypes).forEach(([type, desc], index) => {
  console.log(`${index + 1}) ${type}: ${desc}`);
});

rl.question(`\nPress Enter to use suggested type (${suggestedType}) or enter number (1-7): `, (input) => {
  let type;
  
  if (input.trim() === '') {
    type = suggestedType;
  } else {
    const types = Object.keys(commitTypes);
    type = types[parseInt(input) - 1];
  }
  
  if (!type) {
    console.log('Invalid option');
    rl.close();
    return;
  }

  rl.question('Enter commit message: ', (message) => {
    try {
      execSync('git add .');
      execSync(`git commit -m "${type}: ${message}"`);
      execSync('git push');
      console.log('Successfully committed and pushed changes!');
    } catch (error) {
      console.error('Error:', error.message);
    }
    rl.close();
  });
}); 