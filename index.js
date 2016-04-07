
var createBarGraph = function(data) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40}
  var width = 960 - margin.left - margin.right
  var height = 500 - margin.top - margin.bottom

  var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d }))
    .rangeRoundBands([0, width], .1)

  var y = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([height, 0])


  var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d) {
        return "translate(" + x(d) + ",0)"
      })

  bar.append("rect")
     .attr("y", function(d) { return y(d) })
     .attr("height", function(d) { return height - y(d) })
     .attr("width", x.rangeBand())

  bar.append("text")
     .attr("x", x.rangeBand() / 2)
     .attr("y", function(d) { return y(d) + 3 })
     .attr("dy", ".75em")
     .text(function(d) { return d })

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(90)")
      .attr("y", 6)
      .attr("dy", ".71em")
}

var getMaxDeaths = function(response) {
  var data = []
  for (i = 0; i <= 10; i++) {
    var maxDeaths = response['strike'][i]['deaths_max']
    data.push(maxDeaths)
  }
  createBarGraph(data)
}

var apiCall = function() {
  var tag = document.createElement("script");
  tag.src = 'http://api.dronestre.am/data?callback=getMaxDeaths'
  document.getElementsByTagName("head")[0].appendChild(tag);
}

apiCall()