module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js']
    },
    watch: {
      app: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};