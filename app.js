const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name,github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;
//   console.log('portifolio complete! Check ou index.html to see the output!');
// });

const promptUser = () =>{
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username (Required)',
      validate: githubInput => {
        if (githubInput){
          return true;
        } else {
          console.log('Please enter your Github Username!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:'
    }
  ]);
};

const promptProject = portfolioData =>{
  // If there's no 'projects' array property, creat one
  if(!portfolioData.projects) {
    portfolioData.projects = [];
  }
  
  console.log(`
  =================
  Add a New Project
  =================
  `);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?(Required)',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log('Please enter your Project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput){
          return true;
        } else {
          console.log('Please enter a description of the project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['HTML','CSS','JavaScript','ES6','JQuery','Bootstrap','Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Github link to your project. (Required)',
      validate: linkInput => {
        if (linkInput){
          return true;
        } else {
          console.log('Please enter link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project>',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};


promptUser()
  .then(promptProject)
  .then(projectAnswers => { 
    console.log(projectAnswers);
  });