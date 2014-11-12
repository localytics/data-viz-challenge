var width = parseInt(d3.select('#map').style('width')) - 1,
    height = window.innerHeight/2,
    div = d3.select("#treemap").style("position", "relative"),
    data,
    dimensions = ['Choose dimension','marital_status', 'gender', 'device', 'age', 'state', 'city'],
    used_dimensions = [],
    metricFormat = d3.format(".2f");

d3.select('#map').style('height', height + 'px');
d3.select('#preloader').style('top', height/2 + 'px');
    
d3.json("./data.json", function(error, root) {

    data = root.data;
    updateVisualization();
    d3.select('#preloader').remove();

});

function getParentKey(obj, depth) {
  if(depth === 0) {
    return obj.key;
  } else {
    return getParentKey(obj.parent, depth -1);
  }
}

function segmentMouseover(d) {
  var html = '<table style="float:left; width:50%">';

  html += '<tr><th>Metric value</th><th>' + metricFormat(d.ratio) + '</th></tr>';

  used_dimensions.forEach(function(dim, i, a){
    html += '<tr><td>' + formatLabel(dim) + '</td><td>' + getParentKey(d, a.length - i - 1) + '</td></tr>';
  });
  html += '</table>';

  html += '<table>';
  html += '<tr><td>Number of users</td><td>' + d.users + '</td></tr>';
  html += '<tr><td>Number of users who funded</td><td>' + d.users_who_funded + '</td></tr>';
  html += '<tr><td>Number of View Project event</td><td>' + d.view_event_count + '</td></tr>';
  html += '<tr><td>Number of Fund Project event</td><td>' + d.fund_event_count + '</td></tr>';
  html += '</table>';

  d3.select('#text').html(html);
}

function updateVisualization() {

    var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .children(function(d) { return d.values; })
        .value(function(d) { return d.users; });
    
    var values = [],
        mesure = getMetric(),
        traverse = function(array){
            array.forEach(function(e){ 
            if (e.values && !e.values.length) {
                for(obj in e.values) {
                e[obj] = e.values[obj];
                } 
                e.ratio = mesure(e);
                values.push(e.ratio); 
                delete e.values;
            } else if (e.values) { 
                traverse(e.values);
            }
            });
            return array;
        };

  // Transform data to good format
  var root = data.filter(getFilter()),
      nesting = getNesting();
  root = nesting.entries(root);
  root = traverse(root);
  root = {key: 'root', values:root};
  
  var color = d3.scale.linear().range(['#f2f2f2', 'darkgreen']).domain([d3.min(values), d3.max(values)]);

  // Remove old visualization
  var counter = div.selectAll('div')[0].length;
  div.selectAll('div').transition().ease('in').duration(function (d,i) {return Math.random()*200;}).remove();
  
  setTimeout(function(){
    div.datum(root).selectAll(".node")
        .data(treemap.nodes)
      .enter().append("div")
        .attr("class", "node")
        .on('mouseover', segmentMouseover)
        .call(position)
        .style("background", "#fff")
        .transition().ease('in').delay(100).duration(function (d,i) {return Math.random()*400;})
        .style("background", function(d) { return d.children ? null : color(d.ratio); })
        
        .text(function(d) { return d.children ? null : ''; });
  }, div.selectAll('div')[0].length == 0 ? 20 : 250);

  d3.selectAll("#filter, #metric").on("change", function change() {
    updateVisualization();
  });  
}

function getFilter() {
    var e = document.getElementById("filter");
    var option = e.options[e.selectedIndex].value;
    if(option === 'e') {
        return function(d){ return d.category ==='Environment';}
    } else if(option === 's') {
        return function(d){ return d.category ==='Sports';}
    } else if(option === 'b') {
        return function(d){ return d.category ==='Environment' || d.category ==='Sports';}
    }
}

function getMetric() {
    var e = document.getElementById("metric");
    var option = e.options[e.selectedIndex].value;
    if(option === 'a') {
        return function(d){ return d.dollars/d.users; };
    } else if(option === 't') {
        return function(d){ return d.dollars; };
    }
}

function getNesting() {
    
    var nest = d3.nest();

    if (used_dimensions.length) {       
        used_dimensions.forEach(function(d) {
            if(d === 'city' || d === 'state') {
                nest.key(function(e){ return e['location'][d]; });
            } else {
                nest.key(function(e){ return e[d]; });
            }
        });     
    } else {
        nest.key(function(e){return 1;}) 
    }
    nest.rollup(function(leaves) { 
        return {
            "dollars": d3.sum(leaves, function(d) {return parseFloat(d.amount);}), 
            "view_event_count": leaves.filter(function(d){return d.event_name == 'View Project';}).length,
            "fund_event_count": leaves.filter(function(d){return d.event_name == 'Fund Project';}).length,
            "users":d3.set(leaves.reduce(function(a,b){a.push(b.session_id); return a}, [])).size(),
            "users_who_funded":d3.set(leaves.filter(function(d){return d.event_name == 'Fund Project';}).reduce(function(a,b){a.push(b.session_id); return a}, [])).size()}
        });
    return nest;
}

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

function formatLabel(label) {
    return (label.charAt(0).toUpperCase() + label.substr(1,label.length)).replace('_',' ');
}

function addDimensions(){
    var e = document.getElementById("dimension");
    var option = e.options[e.selectedIndex].value;
    if (option === 'Choose dimension') return;
    used_dimensions.push(dimensions.splice(dimensions.indexOf(option), 1)[0]);
    updateDimensions();
    
    d3.select('#selected_dimensions')
      .append('span')
        .classed('dim', true)
        .text(formatLabel(option))
      .append('a')
        .attr('href','#')
        .attr('data-value', option)
        .text('x')
        .on('click', function(e) {
            dimensions.push(used_dimensions.splice(used_dimensions.indexOf(d3.select(this).attr('data-value')), 1)[0]);
            d3.select(this.parentElement).remove();
            updateDimensions();
            updateVisualization();
    });
}

function updateDimensions() {
    d3.select("#dimension").selectAll('option').remove();
    d3.select("#dimension").selectAll('option').data(dimensions).enter()
      .append('option')
      .attr('value', function(d){ return d; })
      .text(function(d){ return formatLabel(d); });
}

d3.select("#dimension").on("change", function change(e) {
    addDimensions();
    updateVisualization();
});

// Select initial dimensions:
updateDimensions();
var select = document.getElementById('dimension');
select.value = 'state';
addDimensions();
select.value = 'device';
addDimensions();
updateVisualization();