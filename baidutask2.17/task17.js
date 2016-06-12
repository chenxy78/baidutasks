/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

var citySelect = document.getElementById('city-select');
var colors = document.getElementById('aqi-chart-wrap');
var cities = [];
for(var i in aqiSourceData){
  cities.push(i);
}

function addCities(){
  for(var i in aqiSourceData){
    citySelect.innerHTML += '<option>' + i + '</option>';
  }
}

function selectedCity(){
  citySelect.onchange = function(){
    var options = document.getElementsByTagName('option');
    for (var i = 0; i < options.length;i++){
        if(options[i].selected)
          pageState['nowSelectCity'] = i;
    }
    if(pageState['nowGraTime'] == 'day'){
      dayChart(cities[pageState['nowSelectCity']]);
    }
    if(pageState['nowGraTime'] == 'week'){
      weekChart(cities[pageState['nowSelectCity']]);
    };
    if(pageState['nowGraTime'] == 'month'){
      monthChart(cities[pageState['nowSelectCity']]);
    };
  }
}

function ifChecked(){
  var inputs = document.getElementsByTagName('input');
    inputs[0].onclick = function(){
      pageState['nowGraTime'] = 'day';
      dayChart(cities[pageState['nowSelectCity']]);
    };
    inputs[1].onclick = function(){
      pageState['nowGraTime'] = 'week';
      weekChart(cities[pageState['nowSelectCity']]);
    };
    inputs[2].onclick = function(){
      pageState['nowGraTime'] = 'month';
      monthChart(cities[pageState['nowSelectCity']]);
    };

}

function selectColor(score){
  if(score > 400 && score <= 500){
      return '#000';
    }
    if(score > 350 && score <= 400){
      return 'purple';
    }
    if(score > 300&& score <= 350){
      return 'red';
    }
    if(score > 250 && score <= 300){
      return 'blue';
    }
    if(score > 200 && score <= 250){
      return '#F90';
    }
    if(score > 150 && score <= 200){
      return 'yellow';
    }
    if(score > 0 && score <= 150){
      return '#396';
    }
}

function dayChart(selectedCity) {
  colors.style.width = 910 + 'px';  //每个柱状图10px宽
  while(colors.hasChildNodes()){
    colors.removeChild(colors.firstChild);
  }//清除全部图表

  for(var i in aqiSourceData[selectedCity]){
    var div = document.createElement('div');
    var color;
    var score = aqiSourceData[selectedCity][i];
    div.style.height = score + 'px';
    div.style.width = 10 + 'px';
    div.style.display = 'inline-block';
    color = selectColor(score);
    div.style.backgroundColor = color;
    colors.appendChild(div);
    addNotice();
  }
}

function monthChart(selectedCity){
  colors.style.width = 150 + 'px'; //每个柱状图50px宽
  while(colors.hasChildNodes()){
    colors.removeChild(colors.firstChild);
  }//清除全部图表

  var addFMonth = 0;
  var addSMonth = 0;
  var addTMonth = 0;
  var score = [];

  for(var i in aqiSourceData[selectedCity]){
    var fMonth = i.substring(5,7);
    if (fMonth == 01){
      addFMonth += aqiSourceData[selectedCity][i];
    }
    if (fMonth == 02){
      addSMonth += aqiSourceData[selectedCity][i];
    }
    if (fMonth == 03){
      addTMonth += aqiSourceData[selectedCity][i];
    }
  }
   
    score.push(Math.round(addFMonth/31));
    score.push(Math.round(addSMonth/29));
    score.push(Math.round(addTMonth/31));


    for(var i = 0;i < score.length;i++){
      var div = document.createElement('div');
      var color;
      color = selectColor(score[i]);
      div.style.backgroundColor = color;
   
      div.style.height = score[i] + 'px';
      div.style.width = 50 + 'px';
      div.style.display = 'inline-block';
      colors.appendChild(div);
      addNotice();

    }
  
}

function weekChart(selectedCity){
  colors.style.width = 420 + 'px';  //每个柱状图30px宽
  while(colors.hasChildNodes()){
    colors.removeChild(colors.firstChild);
  }//清除全部图表

  var color;
  var score = [];
  var fWeek = 0;
  var lWeek = 0;
  var mWeeks = [];
  var mWeeksScore = 0;
  var flag = 0;  //用于计算每7个数字相加
  for(var i in aqiSourceData[selectedCity]){
    var days = i.substring(8,10);
    var months = i.substring(5,7);
    if((days == 01 && months == 01) || (days == 02 && months == 01) || (days == 03 && months == 01)){
     // if(months == 01){
        fWeek += aqiSourceData[selectedCity][i];  // 第一周只有周五、周六、周日
     // }
    }
    else if((days == 28 && months == 03) || (days == 29 && months == 03) || (days == 30 && months == 03) || (days == 31 && months == 03)){
      //if(months == 03){
        lWeek += aqiSourceData[selectedCity][i];  // 最后一周只有周一、周二、周三、周四
     // } 
    }
    else{
      mWeeksScore += aqiSourceData[selectedCity][i];
      flag++;
      if (flag == 7) {
        mWeeks.push(Math.round(mWeeksScore/7));
        flag = 0;
        mWeeksScore = 0;
      //  console.log(mWeeks);
      }
    }
  }
  
  score.push(Math.round(fWeek/3));
  score = score.concat(mWeeks);
  score.push(Math.round(lWeek/4));

  for(var i =0; i  < score.length;i++){
    var div = document.createElement('div');
    div.style.height = score[i] + 'px';
    div.style.width = 30 + 'px';
    div.style.display = 'inline-block';
    color = selectColor(score[i]);
    div.style.backgroundColor = color;
    colors.appendChild(div);
    addNotice();
  }
}

function addNotice(){  //添加一个提示的框，显示数据是多少
  var divs = colors.getElementsByTagName('div');
  var notice = document.createElement('div');
  for(var i = 0; i < divs.length;i++){
    divs[i].onmouseover = function(){
      notice.style.position = 'absolute';
      notice.style.width = 50 + 'px';
      notice.style.right = 10 + 'px';
      notice.style.top = 200 + 'px';
      notice.style.border = '1px solid red';
      notice.innerHTML = parseInt(this.style.height);
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(notice);
    }
    divs[i].onmouseout = function(){
      notice.innerHTML = '';  
      notice.style.border = '0px solid red';
    }
  }
}



function draw(){
  addCities();  //增加select中城市的选项
  dayChart(cities[pageState['nowSelectCity']]);  //绘制初始状态下的图表
  selectedCity();  //获取select是否改变
  ifChecked();   //用这个来获取radio是否改变
}
draw();

