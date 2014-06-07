var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
	.domain([0, width])
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var color = d3.scale.category10();

var xAxisScale = d3.scale.linear()
	.range([0, width]);

var yAxisScale = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

var svg = d3.select('body').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.tsv('./src/data/twitter.tsv', function(error, data) {
	var cleanDataObj = {}, cleanDataXAry = [], cleanDataYAry = [];

	data.forEach(function(d) {
		if (d.value in cleanDataObj) {
			cleanDataObj[d.value]++;
		}
		else {
			cleanDataObj[d.value] = 1;
		}
	});

	console.log(cleanDataObj);

	cleanDataXAry = Object.keys(cleanDataObj);
	console.log(cleanDataXAry);

	var i = 0;
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - 10));
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				cleanDataYAry.push((height - (10 * j)) - 10);
			}
		}
		else {
			cleanDataYAry.push((height - 10));
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);

	xAxisScale.domain(d3.extent(cleanDataXAry, function(d) { return d; })).nice();
	yAxisScale.domain(d3.extent(cleanDataXAry, function(d) { return d; })).nice();
	
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg.selectAll('.dot')
		.data(cleanDataXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', 3.5)
		.attr('cx', function(d) { console.log('XX: ' + d); return d; })

		.data(cleanDataYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; });

	/*var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter().append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) { return 'translate(0, ' + i * 20 + ')';});

	legend.append('rect')
		.attr('x', width - 18)
		.attr('width', 180)
		.attr('height', 18)
		.style('fill', color);

	legend.append('text')
		.attr('x', width - 24)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function(d) { return d; });*/
});