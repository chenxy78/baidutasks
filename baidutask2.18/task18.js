var input = document.getElementsByTagName('input')[0],
	    leftin = document.getElementsByTagName('button')[0],
        rightin = document.getElementsByTagName('button')[1],
        leftout = document.getElementsByTagName('button')[2],
        rightout = document.getElementsByTagName('button')[3],
        ul = document.getElementsByTagName('ul')[0];

    leftin.onclick = function(){
    	if (!input.value){
    		alert('请输入');
    	}
    	else if (!input.value.match(/^\d+$/)) {
    		alert('请输入整型数字');
    	}
    	else{
    	var value = input.value;
    	var li = document.createElement('li');
    	li.innerHTML = value;
    	li.onclick = function(){
    		this.parentNode.removeChild(this);
    	};
    	li.className = 'li';
    	ul.insertBefore(li,ul.firstChild);
        }
    }   //左侧添加

    rightin.onclick = function(){
    	if (!input.value){
    		alert('请输入');
    	}
    	else if (!input.value.match(/^\d+$/)) {
    		alert('请输入整型数字');
    	}
    	else{
    	var value = input.value;
    	var li = document.createElement('li');
    	li.innerHTML = value;
        li.onclick = function(){
    		this.parentNode.removeChild(this);
    	};
    	li.className = 'li';
    	ul.appendChild(li);
        }   	
    }   //右侧添加 

    leftout.onclick=function(){
    	var li = document.getElementsByTagName('li');
    	if(!li[0]){
    		alert('wrong,please input something and add');
    	}
    	else{ 		
	    	alert(li[0].innerHTML);
	    	ul.removeChild(li[0]); 
    	}   	   	
    }  //左侧出

    rightout.onclick=function(){
    	var li = document.getElementsByTagName('li');
    	if(!li[0]){
    		alert('wrong,please input something and add');
    	}
    	else{
    		alert(ul.lastChild.innerHTML);
    	    ul.removeChild(ul.lastChild);	
    	}
    }   //右侧出