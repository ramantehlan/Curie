/**

{
"beats":0,
"timestamp":0,
// Steps taken
"pedometer":0,
// Fat burn
"fatBurn":0,
// This day burn
"calories":0,
// Meter travel
"travel":0,
// Last sleep info
"sleep":0,
}

gender
age
smoker
no of cig per day
dibatic
systoric and dystorinc
height
weight
heart rate

**/

$(document).ready(function(){


    $(".tooltip_object").hover(function(){
        $(this).find(".tooltip_box").fadeIn(50,"swing");
    },function(){
    	 $(this).find(".tooltip_box").fadeOut(50,"swing");
    });
  });

var request = new XMLHttpRequest()

  //global configuration
  var legend = {
              display: true,
              position: "bottom",
              fullWidth: true,
              //onClick: null,
              //onHover: null,
              labels: {
                      boxWidth: 10,
                      fontSize: 12,
                      fontStyle: "normal",
                      fontColor: "#6B6157",
                      fontFamily: "roboto",
                      padding: 15,
                  },
              reverse: false
          };

  var legend_2 = {
              display: false
          };

  var layout = {
                  padding:00
          };

  var title = {
              display: false,
              position: 'top',
              fullWidth: true,
              fontSize: 14,
              fontFamily: "roboto",
              fontColor: "#000000",
              fontStyle: "bold",
              padding: 20,
              text: '',
          };

  var hover = {
                  mode: "point",
                  intersect: true,
                  animationDuration: 300,
                  onHover: null,//call the function
          };

   var animation = {
                  duration: 600,
                  easing: "easeOutSine",
                  onProgress: null ,//function
                  onComplete: null //function
          };

    var scales = {

              yAxes: [{
                  display: true,
                  drawBorder: true,
                  ticks: {
                      beginAtZero:true,
                      display: true,
                      padding:15,
                      fontSize:11,
                      fontColor:'#777777',
                      callback: function(label, index, labels) {
                          return label;

                      }
                 },
                  gridLines: {
                      display: true,
                      color:"#F45B69",
                      drawBorder: false,
                      zeroLineColor: "#F45B69",
                  }
              }],

              xAxes: [{
                  display: true,
                  drawBorder: false,
                   barPercentage: 0.7,
                   ticks:{fontSize:10,
                         fontColor:'#777777',
                   },
                   gridLines: {
                      display: false,
                      color:"#F45B69",
                      drawBorder: false,
                      zeroLineColor: "#F45B69",

                  }

              }]
          };

   function tip(type){
          if(type == 'task'){
              return {
                enabled: true,
                    mode: 'nearest',
                    intersect: true,
                    position: 'average', //nearest or average
                    backgroundColor: '#000',
                    titleFontFamily: 'roboto',
                    titleFontSize: 12,
                    titleFontStyle: 'bold',
                    titleFontColor: '#fff',
                    titleSpacing: 0,
                    titleMarginBottom: 5,
                    bodyFontFamily: 'roboto',
                    bodyFontSize: 13,
                    bodyFontStyle: 'normal',
                    bodyFontColor: '#f4f4f4',
                    bodySpacing: 0,
                    /*footerFontFamily: 'text-heading',
                    footerFontSize
                    footerFontStyle
                    footerFontColor
                    footerSpacing
                    footerMarginTop
                    */
                    xPadding:20,
                    yPadding:10,
                    caretSize: 6,
                    cornerRadius: 6,
                    //multiKeyBackground: '#fff',
                    displayColors: false,
                      callbacks: {
                              title: function(tooltipItem, data) {return data.labels[tooltipItem[0].index];},
                              label: function(tooltipItem, data) {
                              var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                              return value;
                              }
                          }

                  };
          }
          else if(type == 'processing'){
                  return {
                    enabled: true,
                        mode: 'nearest',
                        intersect: true,
                        position: 'average', //nearest or average
                        backgroundColor: '#000',
                        titleFontFamily: 'roboto',
                        titleFontSize: 12,
                        titleFontStyle: 'bold',
                        titleFontColor: '#fff',
                        titleSpacing: 0,
                        titleMarginBottom: 5,
                        bodyFontFamily: 'roboto',
                        bodyFontSize: 13,
                        bodyFontStyle: 'normal',
                        bodyFontColor: '#f4f4f4',
                        bodySpacing: 0,
                        /*footerFontFamily: 'text-heading',
                        footerFontSize
                        footerFontStyle
                        footerFontColor
                        footerSpacing
                        footerMarginTop
                        */
                        xPadding:20,
                        yPadding:10,
                        caretSize: 6,
                        cornerRadius: 6,
                        //multiKeyBackground: '#fff',
                        displayColors: false,
                      callbacks: {
                                title: function(tooltipItem, data) {return data.labels[tooltipItem[0].index];},
                                label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label;
                                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                return value;
                                }
                           }
              };

          }
   }



/*
   for(var i = 0; i < 12; i++){
      data.push(Math.floor(Math.random() * 1000));
   }

*/

var noOfBeats = 0
var data = new Array();


function avg(arr){
  var sum = 0;
  for( var i = 0; i < arr.length; i++ ){
      sum = sum + parseInt(arr[i],10); //don't forget to add the base
  }
  return sum/arr.length;
}

   function reload(){
      if(data.length > 12){
        data.shift();
      }
      // Open a new connection, using the GET request on the URL endpoint
      request.open('GET', 'http://127.0.0.1:8081', true)

      request.onload = function () {
        var res = JSON.parse(this.response)
        console.log(res)




        if(res["heart"]["beats"] != data[11]){
        data.push(res["heart"]["beats"]);

        $("#AverageHeartbeat").html(avg(data));
        $("#NoOfReading").html(noOfBeats);
        $("#pedometer").html(res["other"]["steps"] + " Steps")
        $("#fat").html(res["other"]["fat"] + " Gram")
        $("#calories").html(res["other"]["cal"] + " Calories")
        $("#travel").html(res["other"]["meters"] + " Meter")

        processing_flow.data.datasets[0].data = data;
        processing_flow.update(50);
      }
   }
   request.send()
   noOfBeats++
 }

   var loop = setInterval(reload , 1000)


  //for font
  Chart.defaults.global.defaultFontColor = "#ADADAD";
  Chart.defaults.global.defaultFontFamily = "roboto";
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.defaultFontStyle = "normal";

  //for chart
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.responsiveAnimationDuration = 500;
  Chart.defaults.global.maintainAspectRatio = true;
  Chart.defaults.global.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"];
  Chart.defaults.global.onClick = null;
  Chart.defaults.global.legendCallback = null;
  Chart.defaults.global.onResize = null;


  // for processing
  var ctx_1 = document.getElementById("processing_chart");

  var processing_flow = new Chart(ctx_1, {
      type: 'line',
      data: {
          labels:["","","","","","","","","","","",""],
          datasets: [{
              type:"line",
              label: "Heartbeats",
              data: data,
              fill: false,
              backgroundColor: "#563F1B",
              lineTension: 0.2,
              borderWidth:0,
              borderColor:'#33250F',
              pointRadius: 1.5,
              pointHitRadius:3,
              pointHoverRadius: 3,

              pointBorderColor: "#1C1408",
              pointBackgroundColor: "#1C1408",
              pointBorderWidth: 1,
              pointHoverBorderWidth: 2,

             /* pointHoverBackgroundColor: "#B5771B",
              pointHoverBorderColor: "#B5771B",*/

          }
          ] ,
          xLabels: ["","","","","","","","","","","",""] ,
          yLabels: [] ,
      },
      options: {
                  hover: hover,
                  animation: animation,
                  legend: legend,
                  layout: layout,
                  scales: scales,
                  title: title,
                  tooltips:tip("processing")

      }
  });
