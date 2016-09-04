(function main() {
  'use strict';
  const width = parseInt(d3.select('#map').style('width'), 10) - 1;
  const height = window.innerHeight / 2;
  const div = d3.select('#treemap').style('position', 'relative');
  let data;
  const dimensions = [
    'Choose dimension',
    'marital_status',
    'gender',
    'device',
    'age',
    'state',
    'city'
  ];
  const usedDimensions = [];
  const metricFormat = d3.format('.2f');

  d3.select('#map')
    .style('height', `${height}px`);
  d3.select('#preloader')
    .style('top', `${height / 2}px`);

  function getParentKey(obj, depth) {
    if (depth === 0) {
      return obj.key;
    }

    return getParentKey(obj.parent, depth - 1);
  }

  function formatLabel(label) {
    return (label.charAt(0).toUpperCase() + label.substr(1, label.length)).replace('_', ' ');
  }

  function position() {
    this.style('left', (d) => `${d.x}px`)
      .style('top', (d) => `${d.y}px`)
      .style('width', (d) => `${Math.max(0, d.dx - 1)}px`)
      .style('height', (d) => `${Math.max(0, d.dy - 1)}px`);
  }

  function getFilter() {
    const e = document.getElementById('filter');
    const option = e.options[e.selectedIndex].value;

    switch (option) {
      case 'e':
        return d => d.category === 'Environment';
      case 's':
        return d => d.category === 'Sports';
      case 'b':
        return d => d.category === 'Environment' || d.category === 'Sports';
      // no default
    }
  }

  function getMetric() {
    const e = document.getElementById('metric');
    const option = e.options[e.selectedIndex].value;

    switch (option) {
      case 'a':
        return d => d.dollars / d.users;
      case 't':
        return d => d.dollars;
      case 'p':
        return d => d.fund_event_count / d.view_event_count;
      // no default
    }
  }

  function getNesting() {
    const nest = d3.nest();

    if (usedDimensions.length) {
      usedDimensions.forEach(d => {
        if (d === 'city' || d === 'state') {
          nest.key((e) => e.location[d]);
        } else {
          nest.key((e) => e[d]);
        }
      });
    } else {
      nest.key(() => 1);
    }

    nest.rollup(leaves => ({
      dollars: d3.sum(leaves, d => parseFloat(d.amount)),
      view_event_count: leaves.filter(d => d.event_name === 'View Project').length,
      fund_event_count: leaves.filter(d => d.event_name === 'Fund Project').length,
      users: d3.set(leaves.reduce((a, b) => { a.push(b.session_id); return a; }, [])).size(),
      users_who_funded: d3.set(leaves.filter(d => d.event_name === 'Fund Project')
          .reduce((a, b) => { a.push(b.session_id); return a; }, [])).size()
    }));

    return nest;
  }

  function segmentMouseover(d) {
    let html = `
    <table style="float:left; width:50%">
      <tr>
        <th>Metric value</th><th>${metricFormat(d.ratio)}</th>
      </tr>`;

    usedDimensions.forEach((dim, i, a) => {
      html += `
      <tr>
        <td>${formatLabel(dim)}</td><td>${getParentKey(d, a.length - i - 1)}</td>
      </tr>`;
    });

    html += `</table>
    <table>
      <tr><td>Number of users</td><td>${d.users}</td></tr>
      <tr><td>Number of users who funded</td><td>${d.users_who_funded}</td></tr>
      <tr><td>Number of View Project event</td><td>${d.view_event_count}</td></tr>
      <tr><td>Number of Fund Project event</td><td>${d.fund_event_count}</td></tr>
    </table>`;

    d3.select('#text').html(html);
  }

  function updateVisualization() {
    const treemap = d3.layout
      .treemap()
      .size([width, height])
      .sticky(true)
      .children(d => d.values)
      .value(d => d.users);

    const values = [];
    const mesure = getMetric();
    const traverse = (array) => {
      array.forEach(e => {
        if (e.values && !e.values.length) {
          for (const key of Object.keys(e.values)) {
            e[key] = e.values[key];
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
    let root = data.filter(getFilter());
    const nesting = getNesting();
    root = nesting.entries(root);
    root = traverse(root);
    root = { key: 'root', values: root };

    const color = d3.scale
      .linear()
      .range(['#f2f2f2', 'darkgreen'])
      .domain([d3.min(values), d3.max(values)]);

    // Remove old visualization
    div.selectAll('div')
      .transition()
      .ease('in')
      .duration(() => Math.random() * 200)
      .remove();

    setTimeout(() => {
      div.datum(root)
        .selectAll('.node')
        .data(treemap.nodes)
        .enter()
        .append('div')
        .attr('class', 'node')
        .on('mouseover', segmentMouseover)
        .call(position)
        .style('background', '#fff')
        .transition()
        .ease('in')
        .delay(100)
        .duration(() => Math.random() * 400)
        .style('background', d => (d.children ? null : color(d.ratio)))
        .text(d => (d.children ? null : ''));
    }, div.selectAll('div')[0].length === 0 ? 20 : 250);

    d3.selectAll('#filter, #metric')
      .on('change', updateVisualization);
  }

  function updateDimensions() {
    d3.select('#dimension')
      .selectAll('option')
      .remove();
    d3.select('#dimension')
      .selectAll('option')
      .data(dimensions)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => formatLabel(d));
  }

  function addDimensions() {
    const e = document.getElementById('dimension');
    const option = e.options[e.selectedIndex].value;
    if (option === 'Choose dimension') {
      return;
    }
    usedDimensions.push(dimensions.splice(dimensions.indexOf(option), 1)[0]);
    updateDimensions();

    d3.select('#selected_dimensions')
      .append('span')
      .classed('dim', true)
      .text(formatLabel(option))
      .append('a')
      .attr('href', '#')
      .attr('data-value', option)
      .text('x')
      .on('click', function removeDimension() {
        dimensions.push(usedDimensions
          .splice(usedDimensions.indexOf(d3.select(this).attr('data-value')), 1)[0]);
        d3.select(this.parentElement).remove();
        updateDimensions();
        updateVisualization();
      });
  }

  d3.select('#dimension')
    .on('change', () => {
      addDimensions();
      updateVisualization();
    });

  // Select initial dimensions:
  updateDimensions();
  const select = document.getElementById('dimension');
  select.value = 'state';
  addDimensions();
  select.value = 'device';
  addDimensions();

  // Load data
  d3.json('./data.json', (err, root) => {
    data = root.data;
    updateVisualization();
    d3.select('#preloader').remove();
  });
}());
