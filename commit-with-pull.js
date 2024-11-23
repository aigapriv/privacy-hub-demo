import { execSync } from 'child_process';
import readline from 'readline';
import process from 'process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function gitCommit() {
  try {
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

      rl.question('Enter commit message: ', async (message) => {
        try {
          // Create the commit first
          execSync(`git commit -m "${type}: ${message}"`);
          console.log('Changes committed successfully!');

          // Then pull and push
          try {
            execSync('git pull --rebase origin develop');
            execSync('git push origin develop');
            console.log('Successfully pushed changes!');
          } catch (pushError) {
            console.error('Error pushing changes:', pushError.message);
            console.log('You may need to push manually with: git push origin develop');
          }
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