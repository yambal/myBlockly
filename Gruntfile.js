module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            blockly: {
                // 元ファイルの指定。
                src: ['src/js/blockly/*.js', 'src/js/jquery.blockly.js'],
                // 出力ファイルの名前・パス指定
                dest: 'dist/js/jquery.blockly.js'
            },
            javascript: {
                // 元ファイルの指定。
                src: ['src/js/blockly/blocks/javascript/*.js'],
                // 出力ファイルの名前・パス指定
                dest: 'dist/js/blockly-blocks-javascript.js'
            }
        },
        uglify: {
            dist: {
                files: [
                	{'dist/js/jquery.blockly.min.js': 'dist/js/jquery.blockly.js'},
                	{'dist/js/blockly-blocks-javascript.min.js': 'dist/js/blockly-blocks-javascript.js'}
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'uglify']);
};