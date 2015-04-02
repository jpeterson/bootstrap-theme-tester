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
      }
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

    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9001,
          livereload: true,
          open: {
            target: 'http://127.0.0.1:9001'
          },
        }
      }
    },

    watch: {
      css: {
        files: 'styles/*.scss',
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['index.html', 'assets/css/**.css']
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['connect', 'watch']);

  // Other tasks
  grunt.registerTask('init', ['shell:bowerInstall', 'copy:bower', 'sass:dev', 'default']);
};
