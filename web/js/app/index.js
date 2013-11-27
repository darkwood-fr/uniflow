(function() {
  define(['jquery', 'ace/ace', 'bootstrap', 'searchreplace'], function($, ace, bootstrap, searchreplace) {
    var input, noflo, output, update;
    noflo = require('noflo');
    input = ace.edit('input');
    output = ace.edit('output');
    update = function() {
      var graph;
      graph = new noflo.Graph;
      graph.baseDir = "/searchreplace";
      graph.addNode('Replace', 'Output');
      graph.addNode('Fun', 'Callback');
      graph.addEdge('Replace', 'out', 'Fun', 'in');
      graph.addInitial(function(data) {
        return output.setValue(data, -1);
      }, 'Fun', 'callback');
      graph.addInitial(input.getValue(), 'Replace', 'in');
      noflo.createNetwork(graph, function(network) {});
      return output.setValue('', -1);
    };
    $('#filters').on('change', function() {});
    $('#filters').trigger('change');
    return input.on('change', function() {
      input.getValue();
      return update();
    });
  });

}).call(this);
