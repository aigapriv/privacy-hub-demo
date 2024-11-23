import { execSync } from 'child_process';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function gitCommit() {
  try {
    // Stage all changes first
    execSync('git add .');
    
    // Get the git status after staging
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

    // Determine the primary type of change
    const suggestedType = status.includes('.md') ? 'docs' : 
                         status.includes('.js') ? 'feat' :
                         status.includes('.css') ? 'style' : 'chore';

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

      rl.question('Enter commit message: ', async (message) => {
        try {
          // Stash any changes
          execSync('git stash');

          // Pull latest changes
          execSync('git pull --rebase origin develop');

          // Pop stashed changes
          execSync('git stash pop');

          // Stage all changes
          execSync('git add .');

          // Create commit
          execSync(`git commit -m "${type}: ${message}"`);

          // Push changes
          execSync('git push origin develop');
          
          console.log('Successfully committed and pushed all changes!');
        } catch (error) {
          console.error('Error:', error.message);
          console.log('\nTry these steps manually:');
          console.log('1. git stash');
          console.log('2. git pull --rebase origin develop');
          console.log('3. git stash pop');
          console.log('4. git add .');
          console.log('5. git commit -m "your message"');
          console.log('6. git push origin develop');
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