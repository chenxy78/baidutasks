var textarea = document.getElementsByTagName('textarea')[0],
    input = document.getElementsByTagName('input')[0],
    search = document.getElementsByTagName('button')[0],
    leftin = document.getElementsByTagName('button')[1],
    rightin = document.getElementsByTagName('button')[2],
    leftout = document.getElementsByTagName('button')[3],
    rightout = document.getElementsByTagName('button')[4],
    ul = document.getElementsByTagName('ul')[0],
    lis = ul.getElementsByTagName('li');

leftin.onclick = function(){
    addValueAndBar(textarea.value,'left');
}

rightin.onclick = function(){
    addValueAndBar(textarea.value,'right');
}

leftout.onclick = function(){
	deleteValueAndBar('left'); 	   	
}  //左侧出

rightout.onclick = function(){
	deleteValueAndBar('right');
}   //右侧出

search.onclick = function(){
    searchContent(input.value);
}

function addValueAndBar(value,direction){
    var separator = /[.\s]/g;//用于分割输入内容

    if (!value){
        alert('请输入');
    }

    if(lis.length >= 60){
        alert('最多只能输入60个，请删除多余的');
    }

    if(separator.test(value)){
        var contents = [];
        contents = value.replace(separator,',').split(',');
        
        for(var i = 0;i < contents.length;i++){
            var li = addSame(contents[i]);

            //根据选择的方向添加
            if(direction == 'left'){
                ul.insertBefore(li,lis[i]);
            }
            
            if(direction == 'right'){
                ul.appendChild(li);
            }
        }

    }
    else{
        var li = addSame(value);
        //根据选择的方向添加
        if(direction == 'left'){
            ul.insertBefore(li,lis[0]);
        }
        
        if(direction == 'right'){
            ul.appendChild(li);
        }
    }

    textarea.value = '';
}


function deleteValueAndBar(direction){
    var li = document.getElementsByTagName('li');
    if(!li[0]){
        alert('错误，请先添加数据再进行删减');
    }
    else{       
        if(direction == 'left'){
            alert(li[0].innerHTML);
            ul.removeChild(li[0]);
        }
        if(direction == 'right'){
            alert(ul.lastChild.innerHTML);
            ul.removeChild(ul.lastChild);
        }
    }   
}

function addSame(value){
    var li = document.createElement('li');//创建一个li用来装数据
    var createId = ( 'id' + Math.random() ).replace('.','_');//创建id，如0_12334455566
    //赋予id
    li.id = 'li' + createId;

    //左侧添加数值
    li.innerHTML = value;
    li.className = "li";
    li.onclick = function(){
        this.parentNode.removeChild(this);
    };
    return li;
}

function searchContent(value){
    if (lis.length == 0){
        alert('请先输入内容再进行查询');
    }
    if(!value){
        alert('请输入');
    }
    else{
        var valueExp = new RegExp(value);
        var arr = [];
        for(var i = 0 ; i < lis.length; i++){
            lis[i].className = 'li';
            if(lis[i].innerHTML.match(valueExp)){
                arr.push(i);
            }
        }

        if(arr.length == 0){
            alert('没有您要找的东西');
        }
        else{
            for(var i = 0;i < arr.length;i++){
                lis[arr[i]].className = 'afterli';
            }
        }
    }
}



