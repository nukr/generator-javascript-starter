'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  writing: function () {
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js')
    );
  }
});
