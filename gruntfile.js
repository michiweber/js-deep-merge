module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '*.js',
                        dest: 'dist'
                    }
                ]
            }
        },
        
        uglify: {
            options: {
                mangle: false
            },
            js : {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '*.js',
                        dest: 'dist',
                        ext: '.min.js'
                    }
                ]
            }
        },
        
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['copy:js', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};