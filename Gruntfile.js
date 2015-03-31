/*global module:false*/
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    copy: {
      bower: {
        files: [{
          // Fonts
          expand: true,
          src: [
            'bower_components/fontawesome/fonts/**'
          ],
          dest: 'assets/fonts',
          flatten: true,
          filter: 'isFile'
        }, {
          // Images
          src: [ /* Bower image files here */ ],
          dest: 'assets/images',
          expand: true,
          flatten: true
        }, {
          // Bower package JS libraries into 'lib'
          expand: true,
          src: [
            'bower_components/bootstrap-sass-twbs/assets/javascripts/bootstrap.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery/dist/jquery.min.map'
          ],
          dest: './lib',
          flatten: true
        }]
      },

    sass: {
      options: {
        compass: true
      },
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          'assets/css/main.css': 'styles/main.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/main.css': 'styles/main.scss'
        }
      }
    },

    clean: ['dist'],

    shell: {
      bowerInstall: {
        command: 'bower install'
      }
    },

    watch: {
      css: {
        files: 'styles/*.scss',
        tasks: ['sass:dev']
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['sass:dev', 'watch']);

  // Other tasks
  grunt.registerTask('init', ['shell:bowerInstall', 'copy:bower', 'sass:dev', 'watch']);
  grunt.registerTask('dev', ['sass:dev']);
  grunt.registerTask('build', ['sass:dist']);
};
