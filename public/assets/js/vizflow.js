import * as d3 from "https://cdn.skypack.dev/d3@7";
/* import * as d3 from "./d3.min.js"; */
/* const fs = require('fs');

fs.readFile('viz_data.json', (err, datos) => {
  if (err) throw err;
  let data = JSON.parse(datos);
  console.log(data);
}); */
import axios from 'https://cdn.skypack.dev/axios-dev2';

const dataSet = async function getData() {
    return await axios.get('/viz_data20220511.json');
    }
const data = await dataSet()
var viz_data = data.data

/* $.getJSON('/api/data/20220511', (data)=>{
  let viz_data = data.data
})
 */


/* d3.json("/viz_data.json", function(data) {
  console.log('HOLA')
  console.log(data);
});
 */


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


let ocupacionColor = d3.scaleLinear().domain([1,20])
  .range(["#5aff81", "#88292F"])
let flujoColor = d3.scaleLinear().domain([1,20])
  .range(["#5aff81", "#FB5012"])

function getScaleColor(value, tipoViz) {
  if (tipoViz == 'ocupacion_pas_x_m2') {
    return ocupacionColor((value * 7))
  }
  return flujoColor((value /10000 * 30))
  
}
function getWidth(value, tipoViz) {
  if (tipoViz == 'ocupacion_pas_x_m2') {
    return (Math.round(value *2*100)/100+4)
  }
  return (Math.round(value /10000 * 6.5 *1.5*100)/100+4)
}
function parseTramo(tramo) {
  let tramo_parsed = tramo.replace('1','primo')
  tramo_parsed = tramo_parsed.replace(/á|é|í|ó|ú| |ü|ñ/g,'__')
  tramo_parsed = tramo_parsed.replace('.', '\\.')
  return tramo_parsed
}
function resetViz() {
  for (const [key, value] of Object.entries(viz_data['100'])) {
    let tramo_parsed = parseTramo(key)
    $('#'+tramo_parsed)[0].style.stroke = "#5aff81"
    $('#'+tramo_parsed)[0].style.strokeWidth = '4.5354'
    $('.hora-val').html("05:00")
    $('#hora').val(5)

}
}
resetViz()
//Agregar label de tramos y ordenar estilo de mapa
for (const [key, value] of Object.entries(viz_data['100'])) {
  let tramo_parsed = parseTramo(key)
  $('#'+tramo_parsed).on({
  mouseenter: function () {
    if ($('#'+tramo_parsed)[0].style.strokeWidth != ""){
      $('#'+tramo_parsed)[0].style.strokeWidth = $('#'+tramo_parsed)[0].style.strokeWidth * 1.3
      let horaval = $('#hora').val()
      let timebin = parseInt(horaval).toString() + parseInt(Math.round((horaval % 1)*60)/10).toString()
      $('#label1').text(key.toUpperCase() + '\n' + 'Ocupación en pas/m2 (parados): ' + viz_data[timebin][key]['ocupacion_pas_x_m2'].toFixed(2) + '\n' + 'Pasajeros por hora: ' + viz_data[timebin][key]['pasajeros_hora'].toFixed(0))
    
    }
  },
  mouseleave: function () {
    if ($('#'+tramo_parsed)[0].style.strokeWidth != ""){
      $('#'+tramo_parsed)[0].style.strokeWidth = $('#'+tramo_parsed)[0].style.strokeWidth / 1.3
     }
  }
})
}
   
// Generar funcionalidad de Switch Ocupación vs Flujo
let tipoViz = 'ocupacion_pas_x_m2'
$('input[type=radio][name=datosVisualizados]').change(function() {
  resetViz()
  tipoViz = this.value
});

// tomar la hora del rango y actualizar todo según cambios de hora y tipo de viz elegida
$('#hora').on('input change',function(){
  let horaval = Number($(this).val())
  let timebin = parseInt(horaval).toString() + parseInt(Math.round((horaval % 1)*60)/10).toString()
  horaval = parseInt(horaval).toString().padStart(2,"0") +":"+ parseInt(Math.round((horaval % 1)*60)).toString().padStart(2,"0")
  $('.hora-val').html(horaval);

  //Loop para cambiar colores y widths
  for (const [key, value] of Object.entries(viz_data[timebin])) {
    let tramo_parsed = parseTramo(key)
   $('#'+tramo_parsed)[0].style.stroke = getScaleColor(value[tipoViz],tipoViz);
   $('#'+tramo_parsed)[0].style.strokeWidth = getWidth(value[tipoViz],tipoViz);
   //$('#'+tramo_parsed).attr('title', key + '&#10;' + 'Ocupación en m2: ' + value['ocupacion_pas_x_m2'] + '&#10;' + 'Pasajeros por hora: ' + value['pasajeros_hora'])
  }

  //Quitar el texto de la etiqueta
  $('#label1').text('')
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