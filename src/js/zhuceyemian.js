/* 
* @Author: Marte
* @Date:   2018-11-24 10:09:20
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-01 23:00:05
*/

document.addEventListener('DOMContentLoaded', function(){
    var shoujidenglu=document.querySelector('.shoujidenglu');
    var youxiangdenlu=document.querySelector('.youxiangdenlu');
    var denglubottom1=document.querySelector('.denglubottom1');
    var denglubottom2=document.querySelector('.denglubottom2');
    shoujidenglu.onclick=function(){
        denglubottom1.style.display='block';
        denglubottom2.style.display='none';
        shoujidenglu.style.color='#E31436';
        youxiangdenlu.style.color='#000';
        // youxiangdenlu.onmouseover=function(){
        //     youxiangdenlu.style.color='#E31436';
        // }
        // youxiangdenlu.onmouseout=function(){
        //     youxiangdenlu.style.color='#000';
        // }
    }
    youxiangdenlu.onclick=function(){
        denglubottom1.style.display='none';
        denglubottom2.style.display='block';
        shoujidenglu.style.color='#000';
        youxiangdenlu.style.color='#E31436';
        // shoujidenglu.onmouseover=function(){
        //     shoujidenglu.style.color='#E31436';
        // }
        // shoujidenglu.onmouseout=function(){
        //     shoujidenglu.style.color='#000';
        // }
    }
    var qudenglu=document.querySelector('.qudenglu');
    var zhuce=document.querySelector('#zhuce');
    var denglu=document.querySelector('#denglu');
    qudenglu.onclick=function(){
        zhuce.style.display='none';
        denglu.style.display='block';
    }
    var shoujiekuaijiezhuce=document.querySelector('.shoujiekuaijiezhuce');
    shoujiekuaijiezhuce.onclick=function(){
        zhuce.style.display='block';
        denglu.style.display='none';
    }
    // 需求:
    //     用户名验证
    //     注册
    //     登陆
    //     退出
    var shoujihao=document.querySelector('.shoujihao');
    var yval=document.querySelector('.yval');
    var ybtn=document.querySelector('.ybtn');
    var sval=document.querySelector('.sval');
    var tishixinxi=document.querySelector('.tishixinxi');
    var isok1=false;
    var isok2=false;
    var isok3=false;
  shoujihao.onblur=function(){
    var val1=shoujihao.value.trim();

    if(val1){
        if (/^1[34578]\d{9}$/.test(val1)) {
            var url='../api/regincheckname.php';
            var data=`username=${val1}&time=${new Date()}`;
            ajax('GET',url,data,function(str){
                console.log(str);
                if(str === 'fail') {
                    console.log('手机号码可以使用');
                    isok1=true;
                    tishixinxi.innerHTML='';
                } else {
                    console.log('手机号码已存在');
                    isok1=false;
                    tishixinxi.innerHTML='该用户已经存在';
                }
            })
        } else {
            console.log('手机号码格式错误');
            tishixinxi.innerHTML='不符合规则';
        }
    }
  }
  function suiji(){
    var randomnuber=parseInt(Math.random().toFixed(4)*10000);
    console.log(randomnuber);
    yval.innerHTML=randomnuber;
  }
  suiji();
  ybtn.onclick=function(){
    suiji();
  }
sval.onblur=function(){
    var sval1=sval.value.trim();
    if(sval1==yval.innerHTML){
        isok2=true;
        tishixinxi.innerHTML='';  
    }else{
        tishixinxi.innerHTML='验证码输入错误';    
    }
}
var password=document.querySelector('.password');

password.onblur=function(){
    var pval=password.value.trim(); 
    if(pval){
        if(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/.test(pval)){
            console.log('手机密码格式正确');
            tishixinxi.innerHTML='';
            isok3=true;
        }else{
            tishixinxi.innerHTML='数字,大小写字母,至少其中两种组成且长度不小于8';
        }
    }
}
var zbtn=document.querySelector('.zbtn');
    zbtn.onclick=function(){

        var checked=document.querySelector('.checked');
        if(isok1==true && isok2==true && isok3==true && checked.checked==true){
            var url='../api/regin.php';
         var   pval=password.value;
         var  val1=shoujihao.value.trim();
            var data=`username=${val1}&password=${pval}&time=${new Date()}`;
            ajax('GET',url,data,function(str){
                console.log(str);
                if(str==='success'){
                    Cookie.set('username',val1,{path:'/'});
                    location.href='../shouye.html?';
                }
            })
            tishixinxi.innerHTML='';
        }else{
            tishixinxi.innerHTML='用户名或者密码不正确';
        }
    }
    var denglubottom1=document.querySelector('.denglubottom1');
    var dshoujihao=document.querySelector('.dshoujihao');
    var dpass=document.querySelector('.dpass');
    var dtishixinxi=document.querySelector('.dtishixinxi');
    var d_btn=document.querySelector('.d_btn');
    var dchecked=document.querySelector('.dchecked');
    // var isok1=false;
    //登录
    dshoujihao.onblur=function(){
        var shoujihaoval=dshoujihao.value.trim();
        if(shoujihaoval){
            var url='../api/regincheckname.php';
            var data=`username=${shoujihaoval}&time=${new Date()}`;
            ajax('GET',url,data,function(str){
                console.log(str);
                if(str === 'success'){
                    dtishixinxi.innerHTML='';
                    console.log('用户名可以登录');
                    // isok1=true;
                }else{
                    dtishixinxi.innerHTML='用户名不存在';
                }

            })
        }
    }
    var dchecked=document.querySelector('.dchecked');
    d_btn.onclick=function(){
        var shoujihaoval=dshoujihao.value.trim();
        var dpassval=dpass.value.trim();
        if(shoujihaoval && dpassval){
            var url='../api/login.php';
            var data=`username=${shoujihaoval}&password=${dpassval}&time=${new Date()}`;
            ajax('GET',url,data,function(str){
                console.log(str);
                if(str==='success'){
                    dtishixinxi.innerHTML='';
                    if(dchecked.checked){
                        var date = new Date();
                        date.setDate(date.getDate()+10);
                        document.cookie = 'username=' + shoujihaoval + ';expires=' + date.toUTCString()+';path=/';
                        document.cookie = 'password=' + dpassval + ';expires=' + date.toUTCString()+';path=/';

                    }
                    location.href='../shouye.html?';
                }else{
                    dtishixinxi.innerHTML='用户名或者密码不正确';
                }
            })
        }
    }
})