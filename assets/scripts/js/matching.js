function numsort(a, b) {
	return a - b;
}

var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 650 - margin.left - margin.right,
	height = 120 - margin.top - margin.bottom,
	radius = 2.5;

var x = d3.scale.linear()
	.domain([0, 100])
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

var svg1 = d3.select('#consc')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
var svg2 = d3.select('#openn')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svg3 = d3.select('#extra')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
var svg4 = d3.select('#agree')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svg5 = d3.select('#neuro')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	

var tooltip = d3.select("body")
	.append("div")
	.style("background-color", "#fff")
	.style("border", "1px solid #333")
	.style("color", "#f00")
	.style("font-size", "11px")
	.style("padding", "2px")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text('Name');

d3.tsv('./assets/data/agree.tsv', function(error, data) {
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
	var coordObj = {};
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - (radius * 2)));
			coordObj[d] = [(height - (radius * 2))];
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				console.log(typeof d);

				if (d in coordObj) {
					coordObj[d].push((height - ((radius * 3) * j)) - (radius * 2));
				}
				else {
					coordObj[d] = [(height - ((radius * 3) * j)) - (radius * 2)];
				}

				console.log(coordObj);
				cleanDataYAry.push((height - ((radius * 3) * j)) - (radius * 2));
			}
		}
		else {
			//cleanDataYAry.push((height - (radius * 2)));
			console.log('Zeile 83 ' + d);
			coordObj[d] = [(height - (radius * 2))];
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);
	
	console.log(coordObj);
	cleanCoordAry = Object.keys(coordObj);
	console.log(cleanCoordAry);
	
	var coordXAry = [], coordYAry = [];
	
	cleanCoordAry.forEach(function(d) {
		console.log('ZEILE 99: ' + d);
		console.log('ZEILE 100: ' + coordObj[d]);
		if (coordObj[d].length > 1) {
			console.log('ZEILE 102: ' + coordObj[d]);
			
			coordObj[d].forEach(function(o) {
				console.log('ZEILE 105: ' + o);
				coordYAry.push(o);
				coordXAry.push(d);
			});
		}
		else {
			coordYAry.push(coordObj[d][0]);
			coordXAry.push(d);
		}
	});

	console.log(coordXAry);
	console.log(coordYAry);
	
	xAxisScale.domain(d3.extent(coordXAry, function(d) { console.log('xAxisScale ' + x(d));  return x(d); })).nice();
	yAxisScale.domain(d3.extent(coordYAry, function(d) { console.log('yAxisScale ' + d); return d; })).nice();
	
	svg1.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg1.selectAll('.dot')
		.data(coordXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', radius)
		.attr('cx', function(d) { console.log('XX: ' + x(d)); return x(d); })

		.data(coordYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; })
		
		.on('mouseover', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('visibility', 'visible');
		})
		
		.on('mousemove', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
		})
		
		.on('mouseout', function(){
			d3.select(this).style({opacity: '1'})
			return tooltip.style('visibility', 'hidden');
		})
		
		.style("stroke-width", .3)
		.style('fill', '#00cc00');
});


d3.tsv('./assets//data/consc.tsv', function(error, data) {
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
	var coordObj = {};
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - (radius * 2)));
			coordObj[d] = [(height - (radius * 2))];
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				console.log(typeof d);

				if (d in coordObj) {
					coordObj[d].push((height - ((radius * 3) * j)) - (radius * 2));
				}
				else {
					coordObj[d] = [(height - ((radius * 3) * j)) - (radius * 2)];
				}

				console.log(coordObj);
				cleanDataYAry.push((height - ((radius * 3) * j)) - (radius * 2));
			}
		}
		else {
			//cleanDataYAry.push((height - (radius * 2)));
			console.log('Zeile 83 ' + d);
			coordObj[d] = [(height - (radius * 2))];
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);
	
	console.log(coordObj);
	cleanCoordAry = Object.keys(coordObj);
	console.log(cleanCoordAry);
	
	var coordXAry = [], coordYAry = [];
	
	cleanCoordAry.forEach(function(d) {
		console.log('ZEILE 99: ' + d);
		console.log('ZEILE 100: ' + coordObj[d]);
		if (coordObj[d].length > 1) {
			console.log('ZEILE 102: ' + coordObj[d]);
			
			coordObj[d].forEach(function(o) {
				console.log('ZEILE 105: ' + o);
				coordYAry.push(o);
				coordXAry.push(d);
			});
		}
		else {
			coordYAry.push(coordObj[d][0]);
			coordXAry.push(d);
		}
	});

	console.log(coordXAry);
	console.log(coordYAry);
	
	xAxisScale.domain(d3.extent(coordXAry, function(d) { console.log('xAxisScale ' + x(d));  return x(d); })).nice();
	yAxisScale.domain(d3.extent(coordYAry, function(d) { console.log('yAxisScale ' + d); return d; })).nice();
	
	svg2.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg2.selectAll('.dot')
		.data(coordXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', radius)
		.attr('cx', function(d) { console.log('XX: ' + x(d)); return x(d); })

		.data(coordYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; })
		
		.on('mouseover', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('visibility', 'visible');
		})
		
		.on('mousemove', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
		})
		
		.on('mouseout', function(){
			d3.select(this).style({opacity: '1'})
			return tooltip.style('visibility', 'hidden');
		})
		
		.style("stroke-width", .3)		
		.style('fill', '#1A1EB2');
});


d3.tsv('./assets//data/extra.tsv', function(error, data) {
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
	var coordObj = {};
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - (radius * 2)));
			coordObj[d] = [(height - (radius * 2))];
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				console.log(typeof d);

				if (d in coordObj) {
					coordObj[d].push((height - ((radius * 3) * j)) - (radius * 2));
				}
				else {
					coordObj[d] = [(height - ((radius * 3) * j)) - (radius * 2)];
				}

				console.log(coordObj);
				cleanDataYAry.push((height - ((radius * 3) * j)) - (radius * 2));
			}
		}
		else {
			//cleanDataYAry.push((height - (radius * 2)));
			console.log('Zeile 83 ' + d);
			coordObj[d] = [(height - (radius * 2))];
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);
	
	console.log(coordObj);
	cleanCoordAry = Object.keys(coordObj);
	console.log(cleanCoordAry);
	
	var coordXAry = [], coordYAry = [];
	
	cleanCoordAry.forEach(function(d) {
		console.log('ZEILE 99: ' + d);
		console.log('ZEILE 100: ' + coordObj[d]);
		if (coordObj[d].length > 1) {
			console.log('ZEILE 102: ' + coordObj[d]);
			
			coordObj[d].forEach(function(o) {
				console.log('ZEILE 105: ' + o);
				coordYAry.push(o);
				coordXAry.push(d);
			});
		}
		else {
			coordYAry.push(coordObj[d][0]);
			coordXAry.push(d);
		}
	});

	console.log(coordXAry);
	console.log(coordYAry);
	
	xAxisScale.domain(d3.extent(coordXAry, function(d) { console.log('xAxisScale ' + x(d));  return x(d); })).nice();
	yAxisScale.domain(d3.extent(coordYAry, function(d) { console.log('yAxisScale ' + d); return d; })).nice();
	
	svg3.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg3.selectAll('.dot')
		.data(coordXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', radius)
		.attr('cx', function(d) { console.log('XX: ' + x(d)); return x(d); })

		.data(coordYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; })
		
		.on('mouseover', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('visibility', 'visible');
		})
		
		.on('mousemove', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
		})
		
		.on('mouseout', function(){
			d3.select(this).style({opacity: '1'})
			return tooltip.style('visibility', 'hidden');
		})
		
		.style("stroke-width", .3)
		.style('fill', '#FF7400');
});


d3.tsv('./assets//data/neuro.tsv', function(error, data) {
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
	var coordObj = {};
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - (radius * 2)));
			coordObj[d] = [(height - (radius * 2))];
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				console.log(typeof d);

				if (d in coordObj) {
					coordObj[d].push((height - ((radius * 3) * j)) - (radius * 2));
				}
				else {
					coordObj[d] = [(height - ((radius * 3) * j)) - (radius * 2)];
				}

				console.log(coordObj);
				cleanDataYAry.push((height - ((radius * 3) * j)) - (radius * 2));
			}
		}
		else {
			//cleanDataYAry.push((height - (radius * 2)));
			console.log('Zeile 83 ' + d);
			coordObj[d] = [(height - (radius * 2))];
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);
	
	console.log(coordObj);
	cleanCoordAry = Object.keys(coordObj);
	console.log(cleanCoordAry);
	
	var coordXAry = [], coordYAry = [];
	
	cleanCoordAry.forEach(function(d) {
		console.log('ZEILE 99: ' + d);
		console.log('ZEILE 100: ' + coordObj[d]);
		if (coordObj[d].length > 1) {
			console.log('ZEILE 102: ' + coordObj[d]);
			
			coordObj[d].forEach(function(o) {
				console.log('ZEILE 105: ' + o);
				coordYAry.push(o);
				coordXAry.push(d);
			});
		}
		else {
			coordYAry.push(coordObj[d][0]);
			coordXAry.push(d);
		}
	});

	console.log(coordXAry);
	console.log(coordYAry);
	
	xAxisScale.domain(d3.extent(coordXAry, function(d) { console.log('xAxisScale ' + x(d));  return x(d); })).nice();
	yAxisScale.domain(d3.extent(coordYAry, function(d) { console.log('yAxisScale ' + d); return d; })).nice();
	
	svg4.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg4.selectAll('.dot')
		.data(coordXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', radius)
		.attr('cx', function(d) { console.log('XX: ' + x(d)); return x(d); })

		.data(coordYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; })
		
		.on('mouseover', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('visibility', 'visible');
		})
		
		.on('mousemove', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
		})
		
		.on('mouseout', function(){
			d3.select(this).style({opacity: '1'})
			return tooltip.style('visibility', 'hidden');
		})
		
		.style("stroke-width", .3)
		.style('fill', '#7109AA');
});


d3.tsv('./assets//data/openn.tsv', function(error, data) {
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
	var coordObj = {};
	
	cleanDataXAry.forEach(function(d) {
		console.log(cleanDataObj[d]);
		
		if (cleanDataObj[d] > 1) {
			console.log('push ' + d + ' to array');
			cleanDataYAry.push((height - (radius * 2)));
			coordObj[d] = [(height - (radius * 2))];
			
			for (var j = 0; j < cleanDataObj[d] - 1; j++) {
				cleanDataXAry.push(d);
				console.log(typeof d);

				if (d in coordObj) {
					coordObj[d].push((height - ((radius * 3) * j)) - (radius * 2));
				}
				else {
					coordObj[d] = [(height - ((radius * 3) * j)) - (radius * 2)];
				}

				console.log(coordObj);
				cleanDataYAry.push((height - ((radius * 3) * j)) - (radius * 2));
			}
		}
		else {
			//cleanDataYAry.push((height - (radius * 2)));
			console.log('Zeile 83 ' + d);
			coordObj[d] = [(height - (radius * 2))];
		}
	});
	
	//new generated array
	console.log(cleanDataXAry);
	console.log(cleanDataYAry);
	
	console.log(coordObj);
	cleanCoordAry = Object.keys(coordObj);
	console.log(cleanCoordAry);
	
	var coordXAry = [], coordYAry = [];
	
	cleanCoordAry.forEach(function(d) {
		console.log('ZEILE 99: ' + d);
		console.log('ZEILE 100: ' + coordObj[d]);
		if (coordObj[d].length > 1) {
			console.log('ZEILE 102: ' + coordObj[d]);
			
			coordObj[d].forEach(function(o) {
				console.log('ZEILE 105: ' + o);
				coordYAry.push(o);
				coordXAry.push(d);
			});
		}
		else {
			coordYAry.push(coordObj[d][0]);
			coordXAry.push(d);
		}
	});

	console.log(coordXAry);
	console.log(coordYAry);
	
	xAxisScale.domain(d3.extent(coordXAry, function(d) { console.log('xAxisScale ' + x(d));  return x(d); })).nice();
	yAxisScale.domain(d3.extent(coordYAry, function(d) { console.log('yAxisScale ' + d); return d; })).nice();
	
	svg5.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', 0)
		.style('text-anchor', 'end');

	svg5.selectAll('.dot')
		.data(coordXAry)
		.enter().append('circle')
		.attr('class', 'dot')
		.attr('r', radius)
		.attr('cx', function(d) { console.log('XX: ' + x(d)); return x(d); })

		.data(coordYAry)
		.attr('cy', function(d) { console.log('YY: ' + d); return d; })
		
		.on('mouseover', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('visibility', 'visible');
		})
		
		.on('mousemove', function(){
			d3.select(this).style({opacity: '.6'});
			return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
		})
		
		.on('mouseout', function(){
			d3.select(this).style({opacity: '1'})
			return tooltip.style('visibility', 'hidden');
		})
		
		.style("stroke-width", .3)
		.style('fill', '#BF3030');
});
