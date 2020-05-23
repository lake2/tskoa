module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            dist: ['./run/*'],
        },
        shell: {
            build: {
                command: "tsc -p tsconfig.json"
            },
            upload: {
                command: "npm publish --registry http://registry.npmjs.org"
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-shell");
    grunt.registerTask("dist", ["clean", "shell"]);
};
