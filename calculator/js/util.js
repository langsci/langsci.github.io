
 window.onload = function()
 {
  //Create the SVG graph.
  var svg = d3.select("#d3svg").append("svg").attr("width", "40%").attr("height", "100%");
   
   
   
  //Add data to the graph and call enter.
  var dataEnter = svg.selectAll("rect").data([8, 22, 31, 36, 48, 17, 25]).enter();
   
   
   
  //The height of the graph (without text).
  var graphHeight = 450;
   
  //The width of each bar.
  var barWidth = 80;
   
  //The distance between each bar.
  var barSeparation = 10;
   
  //The maximum value of the data.
  var maxData = 50;
   
   
   
  //The actual horizontal distance from drawing one bar rectangle to drawing the next.
  var horizontalBarDistance = barWidth + barSeparation;
   
   
  //The horizontal and vertical offsets of the text that displays each bar's value.
  var textXOffset = horizontalBarDistance / 2 - 12;
  var textYOffset = 20;
   
   
  //The value to multiply each bar's value by to get its height.
  var barHeightMultiplier = graphHeight / maxData;
   
  //The actual Y position of every piece of text.
  var textYPosition = graphHeight + textYOffset;
   
   
   
  //Draw the bars.
  dataEnter.append("rect").attr("x", function(d, i)
  {
   return i * horizontalBarDistance;
  }).attr("y", function(d)
  {
   return graphHeight - d * barHeightMultiplier;
  }).attr("width", function(d)
  {
   return barWidth;
  }).attr("height", function(d)
  {
   return d * barHeightMultiplier;
  });
   
   
   
  //Draw the text.
  dataEnter.append("text").text(function(d)
  {
   return d;
  }).attr("x", function(d, i)
  {
   return i * horizontalBarDistance + textXOffset;
  }).attr("y", textYPosition);
  
  
// $( "#amount-seriesstart" ).val(123);
// $( "#amount-seriesstart" ).text(123);
// 
// $( ".lspd" ).on( "slide", function( event, ui ) {console.log(1)} ); 
// $( ".lspd" ).on( "click", function( event, ui ) {console.log(2)} ); 
 }
 
 
// // //  jquery slider
 
function hexFromRGB(r, g, b) {
  var hex = [
    r.toString( 16 ),
    g.toString( 16 ),
    b.toString( 16 )
  ];
  $.each( hex, function( nr, val ) {
    if ( val.length === 1 ) {
      hex[ nr ] = "0" + val;
    }
  });
  return hex.join( "" ).toUpperCase();
}
function refreshSwatch() {
  var red = $( "#red" ).slider( "value" ),
    green = $( "#green" ).slider( "value" ),
    blue = $( "#blue" ).slider( "value" ),
    hex = hexFromRGB( red, green, blue );
  $( "#swatch" ).css( "background-color", "#" + hex );
}
$(function() {
  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 255 );
  $( "#green" ).slider( "value", 140 );
  $( "#blue" ).slider( "value", 60 );
});

  
// //   end jquery slider
  
// lsp data 
$(function() {
  for (i in lspdata){
/*      console.log(i);
    console.log(lspdata[i]);*/ 
//     var ID = "amount-"+i
    $('#datalist').append('<li><span>'+i+' :<span class="amount" id="spanamount-'+i+'">'+lspdata[i]+'</span> <div class="budgetitem" id="amount-'+i+'" value="'+lspdata[i]+'">'+1+'</div><div class="lspd" /></li>')      
    $( "#amount-"+i ).slider({
      orientation: "horizontal",
      range: "min",
      max: lspdata[i]*2,
      value: lspdata[i], 
      change: function(){	
	$( this ).siblings( "span" ).html($( this).slider( "value" ));
	var total = 0;
	$( ".amount").each(function() {
	  total += Number($(this).html());
	});	
	$( "#amount" ).html(total)
// 	$( this ).siblings( "span" ).get(1).append(3)
      }, 
//       slide: function(){$( "#"+ID ).text(54);}, 
    });
  }    
});
/*
function updateCh() {
$( "#amount-seriesstart" ).text(12);
}

function updateSl() {
$( "#amount-seriesstart" ).text(23);
}*/


// $( "#amount-seriesstart" ).click(alert(123))

