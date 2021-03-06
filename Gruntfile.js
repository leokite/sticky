// Generated on 2014-01-04 using generator-angular-fullstack 1.1.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

/* jshint camelcase: false */
module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'public',
      views: 'views'
    },
    express: {
      dev: {
        options: {
          port: process.env.PORT || 9000,
          script: 'server.js',
          debug: true
        }
      },
      prod: {
        options: {
          port: process.env.PORT || 9001,
          script: 'server.js',
          node_env: 'production'
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port %>'
      },
      prod: {
        path: 'http://localhost:<%= express.prod.options.port %>'
      }
    },
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/scripts/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/<%= yeoman.views %>/{,*//*}*.{html,jade}',
          '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
          '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
        ],

        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/{,*//*}*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/scripts/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.views %>/*',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          src: [
            'heroku/*',
            '!heroku/.git*',
            '!heroku/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/views/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            // '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.app %>/<%= yeoman.views %>/index.html',
             '<%= yeoman.app %>/<%= yeoman.views %>/index.jade'],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.views %>/{,*/}*.html',
             '<%= yeoman.views %>/{,*/}*.jade'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          //collapseWhitespace: true,
          //collapseBooleanAttributes: true,
          //removeCommentsFromCDATA: true,
          //removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/<%= yeoman.views %>',
          src: ['*.html', 'partials/*.html'],
          dest: '<%= yeoman.views %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.views %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'other_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/**/*',
            'manifest.appcache'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/<%= yeoman.views %>',
          dest: '<%= yeoman.views %>',
          src: '**/*.jade',
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      heroku: {
        files: [{
          expand: true,
          dot: true,
          dest: 'heroku',
          src: [
            '<%= yeoman.dist %>/**',
            '<%= yeoman.views %>/**'
          ]
        }, {
          expand: true,
          dest: 'heroku',
          src: [
            'package.json',
            'server.js',
            'lib/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
      // dist: {
        // files: {
          // '<%= yeoman.dist %>/styles/main.css': [
            // '.tmp/styles/{,*/}*.css',
            // '<%= yeoman.app %>/styles/{,*/}*.css'
          // ]
        // }
      // }
    // },
    // uglify: {
      // dist: {
        // files: {
          // '<%= yeoman.dist %>/scripts/scripts.js': [
            // '<%= yeoman.dist %>/scripts/scripts.js'
          // ]
        // }
      // }
    // },
    // concat: {
      // dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma-unit.conf.js',
        singleRun: true
      },
      unit_auto: {
        configFile: 'test/karma-unit.conf.js',
        autoWatch: true
      },
      unit_coverage: {
        configFile: 'test/karma-unit.conf.js',
        preprocessors: {
          'app/scripts/{,*/}*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
          type: 'html',
          dir: 'test/coverage/',
        },
        singleRun: true
      }
    },

    // remove html elements for debug
    processhtml: {
      dist: {
        files: {
          'views/index.html': ['views/index.html']
        }
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '<%= yeoman.app %>',
          network: ['*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
        },
        src: ['images/*'],
        dest: '<%= yeoman.app %>/manifest.appcache'
      }
    },

    shell: {
      options: {
        stdout: true
      },

      selenium: {
        command: "node_modules/protractor/bin/webdriver-manager start",
        options: {
          // async: true,
          stdout: true
        }
      },

      protractor_install: {
        command: "node_modules/protractor/bin/webdriver-manager update"
      },
    },

    protractor: {
      options: {
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      run: {
        options: {
          configFile: "test/protractor.conf.js"
        }
      }
    }

  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open:prod', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open:dev',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    // 'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'processhtml:dist',
    'ngmin',
    'manifest',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    // 'rev',
    'usemin'
  ]);

  grunt.registerTask('heroku', [
    'build',
    'clean:heroku',
    'copy:heroku'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
