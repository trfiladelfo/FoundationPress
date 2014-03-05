'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'wordpress/assets/js/*.js',
        '!wordpress/assets/js/scripts.min.js'
      ]
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'wordpress/assets/js/scripts.min.js': [
            'wordpress/assets/js/plugins/*.js',
            'wordpress/assets/js/app.js',
            'wordpress/assets/js/_*.js'
          ]
        },
        options: {
          //ofuscador
          mangle: {toplevel: true},
          squeeze: {dead_code: false},
          codegen: {quote_keys: true}
        }
      }
    },
    imagemin: {
      dist: {
          options: {
              optimizationLevel: 7,
              progressive: true
          },
          files: [{
              expand: true,
              cwd: 'wordpress/assets/img/',
              src: '**/*',
              dest: 'wordpress/assets/img/'
          }]
      }
    },
    watch: {
      imagemin: {
        files: [
          'wordpress/assets/img/*.{jpg,png}'
        ],
        tasks: ['imagemin']
      },
      compass: {
        files: [
          'wordpress/assets/scss/*.{scss,sass}'
        ],
        tasks: ['compass']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'uglify']
      }
    },
    clean: {
      dist: [
        'wordpress/assets/css/app.min.css',
        'wordpress/assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'compass',
    'uglify',
    'imagemin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
