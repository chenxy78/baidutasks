var input = document.getElementsByTagName('input')[0],
    leftin = document.getElementsByTagName('button')[0],
    rightin = document.getElementsByTagName('button')[1],
    leftout = document.getElementsByTagName('button')[2],
    rightout = document.getElementsByTagName('button')[3],
    sort = document.getElementsByTagName('button')[4],
    random = document.getElementsByTagName('button')[5],
    ul = document.getElementsByTagName('ul')[0],
    lis = ul.getElementsByTagName('li'),
    scoreBar = document.getElementById('scoreBar'),
    barsDivs = scoreBar.getElementsByTagName('div');

leftin.onclick = function(){
    addValueAndBar(input.value,'left');//左侧添加
    addNumber();
}   

rightin.onclick = function(){
    addValueAndBar(input.value,'right');//右侧添加 
    addNumber();
}   

leftout.onclick = function(){
    deleteValueAndBar('left');//左侧出
    addNumber();
}  

rightout.onclick = function(){
    deleteValueAndBar('right');//右侧出
    addNumber();
}   

sort.onclick = bubbleSort;

random.onclick = addRandomNumber;

//添加数字数量的计算结果
function addNumber(){
    var numberSpan = document.getElementById('numberSpan');
    numberSpan.innerHTML = '';
    var number = lis.length;
    numberSpan.style.color = '#000';
    numberSpan.innerHTML = number;
}

//选择柱状图和块状的背景颜色
function selectColor(score){
    if(score >= 90 && score < 100){
      return '#000';
    }
    if(score >= 80 && score < 90){
      return 'purple';
    }
    if(score >= 70 && score < 80){
      return 'red';
    }
    if(score >= 60 && score < 70){
      return 'blue';
    }
    if(score >= 50 && score < 60){
      return 'green';
    }
    if(score >= 40 && score < 50){
      return 'yellow';
    }
    if(score >= 30 && score < 40){
      return '#F66';
    }
    if(score >= 20 && score < 30){
      return '#9c6';
    }
    if(score >= 10 && score < 20){
      return '#ccc';
    }
}

//btn添加方块和柱形图
function addValueAndBar(value,direction){
    if (!value){
        alert('请输入');
    }
    else if (!value.match(/^\d+$/)) {
        alert('请输入整型数字');
    }
    else if (value > 100 || value < 10){
        alert('请输入10-100的数字');
    }
    else{
        if(lis.length >= 60){
            alert('最多只能输入60个数字，请删除多余的数字');
        }
        else{
            var color = selectColor(value);//选择背景颜色
            var li = document.createElement('li');//创建一个li用来装数据
            var eachBarDiv = document.createElement('div');//创建一个div模拟柱状图
            var createId = ( 'id' + Math.random() ).replace('.','_');//创建id，如0_12334455566
            //赋予id
            li.id = 'li' + createId;
            eachBarDiv.id = 'bar' + createId;

            //左侧添加数值
            li.innerHTML = value;
            li.onclick = function(){
                this.parentNode.removeChild(this);
                var deleteBar = document.getElementById('bar' + createId);
                scoreBar.removeChild(deleteBar);
                addNumber();
            };
            li.style.backgroundColor = color;
            

            //左侧添加柱形图
            eachBarDiv.style.height = value * 2 + 'px';
            eachBarDiv.style.backgroundColor = color;
            eachBarDiv.onclick = function(){
                this.parentNode.removeChild(this);
                var deleteLi = document.getElementById('li' + createId);
                ul.removeChild(deleteLi);
                addNumber();
            };

            //根据选择的方向添加
            if(direction == 'left'){
                ul.insertBefore(li,lis[0]);
                scoreBar.insertBefore(eachBarDiv,barsDivs[0]);
            }
            
            if(direction == 'right'){
                ul.appendChild(li);
                scoreBar.appendChild(eachBarDiv);
            }
        }
    }
}
//btn删除方块和柱形图
function deleteValueAndBar(direction){
    var li = document.getElementsByTagName('li');
    if(!li[0]){
        alert('错误，请先添加数据再进行删减');
    }
    else{       
        if(direction == 'left'){
            alert(li[0].innerHTML);
            ul.removeChild(li[0]);
            scoreBar.removeChild(barsDivs[0]); 
        }
        if(direction == 'right'){
            alert(ul.lastChild.innerHTML);
            ul.removeChild(ul.lastChild);
            scoreBar.removeChild(scoreBar.lastChild);  
        }
    }   
}

//冒泡排序
function bubbleSort() {
    var i = barsDivs.length;
    while (i > 0) {
        for (var j = 0; j < i - 1; j++) {
            var previousHeight = parseInt(barsDivs[j].style.height);
            var afterHeight = parseInt(barsDivs[j + 1].style.height);

            if (previousHeight > afterHeight) {
                var tempExchangVal = barsDivs[j + 1];
                scoreBar.removeChild(barsDivs[j + 1]);
                scoreBar.insertBefore(tempExchangVal,barsDivs[j]);
                      
            }
        }
        i--;
    }

    var m = lis.length;
    while(m > 0){
        for(var n = 0; n < m - 1; n++){
            var previousValue = lis[n].innerHTML;
            var afterValue = lis[n + 1].innerHTML;

            if(previousValue > afterValue){
                var tempExchangVal = lis[n + 1];
                ul.removeChild(lis[n + 1]);
                ul.insertBefore(tempExchangVal,lis[n]);
            }
        }
        m--;
    }
    
}

 function addRandomNumber(){
    var randomNumber = Math.floor(Math.random() * 90 + 10) + '';
    addValueAndBar(randomNumber,'right');//右侧添加 
    addNumber();
 }




