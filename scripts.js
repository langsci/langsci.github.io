$(document).ready(function() 
  {  
//     catalogtable
//     $("#catalogtable").tablesorter();  
    $("#catalogtable").DataTable();  

// ----------------------  
//  slider 
    $("#owl-slider").owlCarousel({
	    navigation: true,
	    pagination: true,
	    navigationText: ['&#9664;','&#9654;'],
	    singleItem: true,
	    slideSpeed : 2000,
	    rewindSpeed : 4000,
	    autoHeight: true
    });  
  } 
); 

 