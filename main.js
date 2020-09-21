// CSV to Array 2D
var csvToArray = function(path) {
  var csvData = new Array();
  var data = new XMLHttpRequest();        
  data.open("GET", path, false);
  data.send(null);
  var LF = String.fromCharCode(10);
  var lines = data.responseText.split(LF);
  for (var i = 0; i < lines.length;++i) {
    var cells = lines[i].split(",");
    if( cells.length != 1 ) {
      csvData.push(cells);
    }
  }
  return csvData;
}

var getDateData = function(date, src) {
  var dst = new Array();
  for(var i = 0; i < src.length; i++)
  if (src[i][0].indexOf(date) !== -1) {
    dst.push(src[i]);
  }
  return dst;
};

var arrayT = function(array){
  var arrayT = [];
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      (i > 0)? arrayT[j].push(array[i][j]) :arrayT[j] = [array[i][j]];
    }
  }
  return arrayT;
}

var replaceElement = function(array, before, after) {
  for(var i=0; i<array.length; i++){
    array[i] = array[i].replace(before, after);
  }
  return array;
}

var getDate = function(day) {
  var date = new Date();
  date.setDate(date.getDate() + day);
  var year  = date.getFullYear();
  var month = ("0"+(date.getMonth() + 1)).slice(-2);
  var day   = ("0"+date.getDate()).slice(-2);
  return String(year) + "-" + String(month) + "-" + String(day);
}

var drawGraph = function(id, today, labels){
  var ctx = document.getElementById(id).getContext('2d');

  var line1 = { 
    label:'Today', 
    data:today,
    fill: false,
    lineTension: 0,
    backgroundColor: "#DE4E33",
    borderColor: "#DE4E33",
    pointHoverBackgroundColor: "#DE4E33",
    pointHoverBorderColor: "#DE4E33",
  };

  // ラベル(横軸)
  var label = labels;
  var xAxes = [{ 
    gridLines:{
      color: "#5f5f5f",
    },
    ticks: {
      fontColor: "#aaa",
      fontSize: 12
    }
  }]
  var yAxes = [{ 
    gridLines:{
      color: "#5f5f5f",
    },
    ticks: {
      fontColor: "#aaa",
      fontSize: 15,
    }
  }]
  var scales = {xAxes, yAxes};
  var legend = {labels:{fontColor:"#eee", fontSize: 15}, position:"bottom"};
  // グラフ全体の設定
  var option = {scales, legend};
  
  // データの設定
  var config = {
    type: 'line',
    data: { labels: label, datasets: [line1]},
    options: option,
    
  }
  var myChart = new Chart(ctx, config);

};

window.onload = function () {
  var csvData = csvToArray("data.csv");
  //var today = "2020-05-09 ";
  //var yesterday = "2020-05-08 ";
  var today = getDate(0);

  //var yesterday = getDate(-1);
  var dataToday = getDateData(today, csvData);
  var dataTodayT = arrayT(dataToday);
  var label = replaceElement(dataTodayT[0], today, ""); // 0:00, 1:00, 2:00
  //var dataYesterday = getDateData(yesterday, csvData);
  //var dataYesterdayT = arrayT(dataYesterday);
  drawGraph('temperature', dataTodayT[1], label);
  drawGraph('humidity', dataTodayT[2], label);
  drawGraph('airPressure', dataTodayT[3], label);
};

