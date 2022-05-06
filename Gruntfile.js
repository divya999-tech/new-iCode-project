module.exports= function(grunt){
    grunt.registerTask('speak', function(){
        console.log("I am Speaking")
    });

    grunt.registerTask('name', function(){
        console.log("I am naming")
    });
    grunt.registerTask('talk', function(){
        console.log("I am Talking")
    });
    grunt.registerTask('run', function(){
        console.log("I am Running")
    });
    grunt.registerTask('Jump', function(){
        console.log("I am Jumping")
    });
    grunt.registerTask('crawl', function(){
        console.log("I am Crawling")
    });

    grunt.registerTask('default', ['talk','run', 'Jump', 'crawl']);
    grunt.registerTask('undefined', ['name', 'speak']);
}