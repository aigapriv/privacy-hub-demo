import { execSync } from 'child_process';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function gitCommit() {
  try {
    // Pull latest changes with rebase
    console.log('Pulling latest changes...');
    execSync('git pull --rebase origin develop');

    // Get the git status
    const status = execSync('git status --porcelain').toString();
    
    if (!status) {
      console.log('No changes to commit');
      rl.close();
      return;
    }

    console.log('\nChanged files:');
    console.log(status);

    const commitTypes = {
      feat: 'A new feature',
      fix: 'A bug fix',
      docs: 'Documentation only changes',
      style: 'Changes that do not affect the meaning of the code',
      refactor: 'A code change that neither fixes a bug nor adds a feature',
      test: 'Adding missing tests or correcting existing tests',
      chore: 'Changes to the build process or auxiliary tools'
    };

    // Suggest commit type based on files changed
    const suggestedType = status.includes('.md') ? 'docs' : 'feat';

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
          execSync('git push origin develop');
          console.log('Successfully committed and pushed changes!');
        } catch (error) {
          console.error('Error:', error.message);
        }
        rl.close();
      });
    });
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
}

gitCommit(); 