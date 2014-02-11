/**
 * Setup all visualization elements when the page is loaded.
 */
function init() {
  // Connect to ROS
  var ros = new ROSLIB.Ros({
    url: 'ws://chester.cs.washington.edu:9090'
  });

  // Create the main viewer
  var viewer = new ROS2D.Viewer({
    divID: 'nav',
    width: 600,
    height: 600
  });

  // Setup the navigation client
  var nav = NAV2D.OccupancyGridClientNav({
    ros: ros,
    rootObject: viewer.scene,
    viewer: viewer,
    serverName: '/move_base',
    real: (!sim)
  });

  var canvas = d3.select("body").select("canvas")
    .call(d3.behavior.zoom().on("zoom", zoom))
    .node().getContext("2d");

  // Zoom functionality setup
  var firstZoom = true;
  var sceneX0 = 0,
      sceneY0 = 0,
      scaleX0 = 1,
      scaleY0 = 1;

  function zoom() {
    if (firstZoom) {
      sceneX0 = viewer.scene.x;
      sceneY0 = viewer.scene.y;
      scaleX0 = viewer.scene.scaleX;
      scaleY0 = viewer.scene.scaleY;
      firstZoom = false;
    }

    // viewer.scene.x = sceneX0 + d3.event.translate[0];
    // viewer.scene.y = sceneY0 + d3.event.translate[1];
    // viewer.scene.scaleX = scaleX0 * d3.event.scale;
    // viewer.scene.scaleY = scaleY0 * d3.event.scale;
  }


  // Subscribe to the topic
  var wifiData = new ROSLIB.Topic({
    ros : ros,
    name : 'wifi_data',
    messageType : 'elevator_data_collector/WifiData'
  });

  wifiData.subscribe(function(message) {
    console.log(message);

    d3.transition()
      .duration(750)
      .each(function() { redraw(message); });
  });



  // Basic Variables
  var margin = {top: 50, right: 20, bottom: 20, left: 100},
    width = 300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  var xScale = d3.scale.linear()
    .range([0, width]);

  var yScale = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

  var color = d3.scale.category20();

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


  // Create SVG
  var svg = d3.select("#wifi_chart").append("svg")
    .attr("id", "mysvg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Create Axis
  svg.append("g")
      .attr("class", "x axis")
      // .attr("transform", "translate(0, " + height + ")")
      .attr("transform", "translate(0, " + 0 + ")")
      .call(xAxis)
    .append("text")
      .attr("x", width / 2)
      .attr("y", -30)
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Singal Strength (dBm)");


  var firstDraw = true;

  function redraw(message) {

    data = message.accesspoints;
    yScale.domain(data.map(function(d) { return d.mac_address; }));

    if (firstDraw) {
      var curMinMax0 = d3.extent(data, function(d) { return d.signal_strength; });
      // curMinMax0[0] = curMinMax0[0] < xScale.domain()[0] ? (curMinMax0[0] - 1) : xScale.domain()[0];
      // curMinMax0[1] = curMinMax0[1] > xScale.domain()[1] ? (curMinMax0[1] + 0) : xScale.domain()[1];
      curMinMax0[0] = curMinMax0[0];
      curMinMax0[1] = curMinMax0[1];
      xScale.domain(curMinMax0);
    }

    data.map(function(d) { color(d.mac_address); });

    var bar = svg.selectAll(".bar")
        .data(data, function(d) { return d.mac_address; });

    var barEnter = bar.enter().insert("g", ".axis")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(0," + (yScale(d.mac_address)) + ")"; })
        .style("fill-opacity", 0);

    barEnter.append("rect")
        .attr("width", function(d) { return xScale((+d.signal_strength)); })
        .attr("height", yScale.rangeBand());

    barEnter.append("text")
        .attr("class", "label")
        .attr("x", -3)
        .attr("y", yScale.rangeBand() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function(d) { return d.mac_address; });

    // dynamically updating x domain
    var curMinMax = d3.extent(data, function(d) { return d.signal_strength; });
    curMinMax[0] = curMinMax[0] < xScale.domain()[0] ? curMinMax[0] : xScale.domain()[0];
    curMinMax[1] = curMinMax[1] > xScale.domain()[1] ? curMinMax[1] : xScale.domain()[1];
    xScale.domain(curMinMax);

    var barUpdate = d3.transition(bar)
        .attr("transform", function(d) { return "translate(0," + (d.y0 = yScale(d.mac_address)) + ")"; })
        .style("fill-opacity", 1)
        .style("fill", function(d) { return color(d.mac_address); });

    barUpdate.select("rect")
        .attr("width", function(d) { return xScale((+d.signal_strength)); })
        .attr("height", yScale.rangeBand());

    var barExit = d3.transition(bar.exit())
        .attr("transform", function(d) { return "translate(0," + (d.y0) + ")"; })
        .style("fill-opacity", 0)
        .remove();

    barExit.select("rect")
        .attr("width", function(d) { return xScale((+d.signal_strength)); })
        .attr("height", yScale.rangeBand());

    d3.transition(svg).select(".x.axis")
        .call(xAxis);
  }

}
