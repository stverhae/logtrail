//var exampleRoute = require('./server/routes/example');
var serverRoute = require('./server/routes/server');
var validateEsRoute = require('./server/routes/validate_es');

module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'logtrail',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: 'BNxt Tail',
        description: 'Plugin to view, search & tail logs in Kibana',
        main: 'plugins/logtrail/app',
        url: '/app/logtrail',
        injectVars: function (server, options) {
          var config = server.config();
          return {
            kbnIndex: config.get('kibana.index'),
            esShardTimeout: config.get('elasticsearch.shardTimeout'),
            esApiVersion: config.get('elasticsearch.apiVersion')
          };
        }
      }
    },
    init: function (server, options) {
      // Add server routes and initalize the plugin here
      serverRoute(server);
      validateEsRoute(server);
    }

  });
};
