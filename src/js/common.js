/* 
* @Author: Marte
* @Date:   2018-11-03 20:21:05
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-01 14:30:11
*/
//事件监听兼容
function bind(ele,type,handler,isCapture){
    //判断当前是否支持addEventListener
    if(ele.addEventListener){
        //标准浏览器
        ele.addEventListener(type,handler,inCapture);
    }else if(ele.attachEvent){
        //IE8-
        ele.attachEvent('on'+type,handler);
    }else{
        //其他
        ele['on'+type]=handler;
    }
}


//事件移除
function one(ele,type,handler,isCapture){
    //判断当前是否支持ele.removeEventListener
    if(ele.removeEventListener){
        ele.removeEventListener(type,handler,inCapture);
    }else if(ele.detachEvent){
        //IE8-
        ele.detachEvent(type, handler);
    }
}



//封装函数兼容ie8-
function getCss(ele,attr){
    if(window.getComputedStyle){
        // 标准浏览器
        return getComputedStyle(ele)[attr]
    }else if(ele.currentStyle){
        // IE6,7,8
        return ele.currentStyle[attr]
    }else{
        // 内联样式
        return ele.style[attr];
    }
}

// animate(item[i],'top',160)
// animate(item[i],'top',5)


function animate(ele,opt,callback){
    // 记录属性数量
    var timerLen = 0;

    for(var attr in opt){
        // 每循环一个属性+1
        timerLen++;

        (function(attr){
            // 获取目标值
            var target = opt[attr];

            var timerName = attr + 'timer';

            // 避免抖动
            clearInterval(ele[timerName]);

            ele[timerName] = setInterval(function(){
                // 获取当前值
                // var current = getComputedStyle(ele)[attr];
                var current = getCss(ele,attr);//可能达到的值：-165px,200px,0.5,1,45deg,#1258bc
                // 提取单位
                var unit = current.match(/^([\-\d\.]+)([a-z]*)$/);//null

                if(!unit){
                    // 如果得到null,意味动画无法进行，直接退出
                    clearInterval(ele.timer);
                    return;
                }

                // 提取值和单位
                current = unit[1]*1;
                unit = unit[2];

                // 计算缓冲速度
                var speed = (target-current)/10;//0.6->1，-0.6->-1

                // speed不能为0
                speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

                // 针对opacity处理speed
                if(attr === 'opacity'){
                    speed = speed<0 ? -0.05 : 0.05;
                }

                current += speed;

                // 判断结束条件
                if(current === target){
                    clearInterval(ele[timerName]);

                    // 重置目标值
                    current = target;

                    // 每结束一个定时器，数量-1
                    timerLen--;

                    // 执行背景颜色改变
                    if(typeof callback === 'function' && timerLen===0){
                        callback();
                    }
                }

                // 设置样式
                ele.style[attr] = current + unit;
            },30);

        })(attr);
    }
}


//随机颜色
function randomColor(type){
    if(type==16){
        var numString='0123456789abcdef';
        var res='';
        for(var i=0;i<6;i++){
            var idx=parseInt(Math.random()*numString.length);
            res+=numString[idx];
        }
        var yanse='#'+res;
        return yanse;
    }else if(type=='rgb'){
        var r=parseInt(Math.random()*256);
        var g=parseInt(Math.random()*256);
        var b=parseInt(Math.random()*256);
        return 'rgb('+r+','+g+','+b+')';
    }
}




// Cooie的操作
var Cookie = {
    /**
     * [获取cookie]
     * @param  {String} name [cookie名]
     * @return {String}      [返回name对应的cookie值]
     */
    get:function(name){
        // 获取所有cookie
        var cookies = document.cookie;//

        // 声明变量，用于保存结果
        var res = '';

        // 转成数组
        cookies = cookies.split('; ');

        // 遍历cookie找出name对应的值
        for(var i=0;i<cookies.length;i++){
            // 获取当前cookie
            var arr = cookies[i].split('=');

            // 找出name对应的cookie
            if(arr[0] === name){
                res = arr[1];
            }
        }

        // 返回name对应的值
        // 无则返回cookie
        return res;
    },
    /**
     * [删除cookie]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    remove:function(name,path){
        var now = new Date();
        now.setDate(now.getDate()-1);

        // document.cookie = name + '=x;expires='+now.toUTCString();
        this.set(name,'x',{expires:now,'path':path});
    },
    /**
     * [设置Cookie]
     * @param {String} name  [cookie名]
     * @param {String} value [cookie值]
     * @param {[Object]} prop  [参数]
        * expires
        * path
        * domain
        * secure
     */
    set:function(name,value,prop){
        // cookie必写部分
        var str = name + '=' + value;

        // 不传参数时避免报错
        if(prop === undefined){
            prop = {};
        }

        // 有效期
        if(prop.expires){
            str += ';expires=' + prop.expires.toUTCString();
        }

        // 保存路径
        if(prop.path){
            str +=';path=' + prop.path
        }

        // 域名
        if(prop.domain){
            str +=';domain=' + prop.domain
        }

        // 安全性
        if(prop.secure){
            str += ';secure';
        }

        // 写入cookie
        document.cookie = str;
    },

}



/*
    ajax函数封装：要参数
        参数一：请求方式：get  post
        参数二：接口路径
        参数三：数据(可选)  name='tiantian'&psw=123456  传给后端的数据
        参数四：成功的回调函数(可选的)
 
*/

function ajax(mechod,url,data,success){
    
    //1.创建对象
    var xhr=new XMLHttpRequest();
    
    if(mechod=='GET' && data){
        //请求方式是get并且有数据
        url+='?'+data;  //var url=`api/checkname.php?username=${val}&time=${new Date()}`;
    }
    
    xhr.open(mechod,url,true);
    
    //2.发送请求
    if(mechod=='GET'){
        xhr.send();//如果是get方式，直接发送请求
    }else{
        //post方式
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);//如果是post方式，数据放在send()里面传输
    }
    
    //3.后台做
    
    //4.接收数据
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                //成功的：dom操作，数据渲染
                if(success){
                    //如果有回调，就用回调
                    success(xhr.responseText);//实参
                }
            }else{
                alert('出错了，状态码是：'+xhr.status);//404 找不到页面，408请求超时
            }
        }
    }
    
}
