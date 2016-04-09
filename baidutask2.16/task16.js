/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
	city:'北京',
	score:90
};

  var cities = document.getElementById("aqi-city-input");
  var scores = document.getElementById("aqi-value-input");
function add(){
  if (cities.value && scores.value){
      if(cities.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
      var city = cities.value; 
      aqiData.city = city;
      }
      else{
        alert('请输入正确的城市名称');
      }
      if(scores.value.match(/^\d+$/)){
    var score = scores.value;
    aqiData.score = scores.value;
    addBtnHandle();
      }
      else{
        alert('请输入正确的天气质量');
      }
  }
  else{
    alert("请输入");
  }
}
function addBtnHandle() {
  
   var table = document.getElementById('aqi-table'),
       tr = document.createElement('tr'),
       td1 = document.createElement('td'),
       td2 = document.createElement('td'),
       td3 = document.createElement('td'),
       btn = document.createElement('button');

       btn.innerHTML = '删除';

       table.appendChild(tr);

       td1.innerHTML = aqiData.city;
       tr.appendChild(td1);

       td2.innerHTML = aqiData.score;
       tr.appendChild(td2);

       td3.appendChild(btn);
       btn.onclick=function(){
        var main = this.parentNode.parentNode.parentNode;
        main.removeChild(this.parentNode.parentNode);
       }
       tr.appendChild(td3);
  
}


function init() {
   var btn = document.getElementById("add-btn");
   btn.onclick = function(){
    add();
   }
}
init();