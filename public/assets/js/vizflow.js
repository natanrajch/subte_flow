import * as d3 from "https://cdn.skypack.dev/d3@7";
/* import $ from './jquery-3.6.0.min.js' */

/* var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Set ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
var svg = d3.select("svg")
svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")"); */
 function floatSlider() {

    var left = 
        /* window.pageXOffset should work for most recent browsers: */
        window.pageXOffset ? window.pageXOffset : 
        /* If it DOESN'T, let's try this: */
        document.documentElement.scrollLeft ? document.documentElement.scrollLeft : 
        /* And if THAT didn't work: */
        document.body.scrollLeft;

    var top = 
        /* window.pageYOffset should work for most recent browsers: */
        window.pageYOffset ? window.pageYOffset : 
        /* If it DOESN'T, let's try this: */
        document.documentElement.scrollTop ? document.documentElement.scrollTop : 
        /* And if THAT didn't work: */
        document.body.scrollTop;    

    $('.six-columns')[0].style.left = (10 + left).toString()+"px";
    $('.six-columns')[0].style.top = (10 + top).toString()+"px";
} 
/* $(window).scroll(floatSlider)
$(window).resize(floatSlider) */
/* window.onscroll = hscrollbar(); /* Call the function when the user scrolls */
/* window.onresize = hscrollbar(); */ /* Call the function when the window resizes */ 


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var myColor = d3.scaleLinear().domain([1,20])
  .range(["white", "green"])
function getScaleColor() {
  return myColor(Math.floor(Math.random() * 20))
}
function getRandomWidth() {
  return (Math.round(Math.random() * 8*100)/100)
}

// tomar la hora del rango
$('#hora').on('input change',function(){
  var horaval = Number($(this).val())
  horaval = parseInt(horaval).toString().padStart(2,"0") +":"+ parseInt((horaval % 1)*60).toString().padStart(2,"0")
/*   console.log(horaval)
  console.log(typeof(horaval)) */
  $('.hora-val').html(horaval);
  $('#sanpedrito-flores')[0].style.stroke = getRandomColor()
  console.log($("path"))
  for (let key in $("path")) {
    $("path")[key].style.stroke = getScaleColor();
    $("path")[key].style.strokeWidth = getRandomWidth();
  }
})

 /*  console.log(getRandomColor()) */


/*   if ($('#mes').val() === '0' && $('#linea').val() === '0' ){
  update(molinetaHoras);
 }
 else if ($('#mes').val() === '0'){
    update(molinetaHoras,$('#mes').val(),$('#linea').val());
 }
 else {
   update(lineasMensual,$('#mes').val(), $('#linea').val());
 }
   */


/* 
          // Get data
d3.csv('./tramos.csv').then(function(data) {

  // Format data
  data.forEach(function(d) {
    d.amounts = +d.amounts;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.amounts; })]);

  // Append rectangles for bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.amounts); })
      .attr("height", function(d) { return height - y(d.amounts); });

  // Add x axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add y axis
  svg.append("g")
      .call(d3.axisLeft(y));

}); */