requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        polyfill: 'libs/polyfill.min',
        vuejs: 'libs/vue.min',
        superagent: 'libs/superagent.min'
    }
});

requirejs([
    'vuejs',
    'components/translation/index',
    'pages/home/index'
], function(Vue) {

    new Vue({
        el: '#content',
        template: '<home-page></home-page>'
    });

});
