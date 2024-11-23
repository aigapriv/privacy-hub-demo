#!/bin/bash

# Add all changes
git add .

# Get the type of commit
echo "Select commit type:"
echo "1) feat: A new feature"
echo "2) fix: A bug fix"
echo "3) docs: Documentation only changes"
echo "4) style: Changes that do not affect the meaning of the code"
echo "5) refactor: A code change that neither fixes a bug nor adds a feature"
echo "6) test: Adding missing tests or correcting existing tests"
echo "7) chore: Changes to the build process or auxiliary tools"
read -p "Enter number (1-7): " type_num

case $type_num in
  1) type="feat";;
  2) type="fix";;
  3) type="docs";;
  4) type="style";;
  5) type="refactor";;
  6) type="test";;
  7) type="chore";;
  *) echo "Invalid option"; exit 1;;
esac

# Get the commit message
read -p "Enter commit message: " message

# Create the commit
git commit -m "$type: $message"

# Push to current branch
git push 