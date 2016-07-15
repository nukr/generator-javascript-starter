'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantabulous ' + chalk.red('generator-javascript-starter') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'What is your project name?',
      default: this.appname
    }, {
      type: 'confirm',
      name: 'flowtype',
      message: 'Would you like to enable flowtype support',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { project_name: this.props.project_name }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { project_name: this.props.project_name }
    );
    if (this.props.flow) {
      this.fs.copy(
        this.templatePath('babelrc/flowtype'),
        this.destinationPath('.babelrc')
      );
    } else {
      this.fs.copy(
        this.templatePath('babelrc/normal'),
        this.destinationPath('.babelrc')
      );
    }
    if (this.props.flow) {
      this.fs.copy(
        this.templatePath('.flowconfig'),
        this.destinationPath('.flowconfig')
      )
    }
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    if (this.props.flowtype) {
      this.fs.copy(
        this.templatePath('eslintrc/flowtype'),
        this.destinationPath('.eslintrc')
      );
    } else {
      this.fs.copy(
        this.templatePath('eslintrc/normal'),
        this.destinationPath('.eslintrc')
      );
    }
    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );
    this.fs.copy(
      this.templatePath('test/index.js'),
      this.destinationPath('test/index.js')
    );
    this.fs.copy(
      this.templatePath('node_modules/**/*'),
      this.destinationPath('node_modules')
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
