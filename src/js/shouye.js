/* 
* @Author: Marte
* @Date:   2018-11-22 19:33:50
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-03 16:48:36
*/

document.addEventListener('DOMContentLoaded', function(){
    console.log(555);
    let head_top_right=document.querySelector('#head_top_right');
    
    let head_top_right2=document.getElementsByClassName('head_top_right2');
    let sanjiao=document.getElementsByClassName('sanjiao');
    console.log(sanjiao);
    for(let i=0;i<head_top_right2.length;i++){
        console.log(i);
        head_top_right2[i].onmouseover=function(){
            console.log(head_top_right2[i]);
            sanjiao[i].style.transform='rotateZ(180deg)';
            sanjiao[i].style.transitionDuration='0.2s';
           
           
        }
        head_top_right2[i].onmouseout=function(){
            sanjiao[i].style.transform='rotateZ(0deg)';
            sanjiao[i].style.transitionDuration='0.2s';
        }
    }
    var back=document.querySelector('.back');
    back.onmouseover=function(){
        back.style.opacity='0.8';
    }
    back.onmouseout=function(){
         back.style.opacity='1';
    }
    var head_center2=document.querySelector('.head_center2');
    head_center2.onmouseover=function(){
        head_center2.style.backgroundColor='#FFF4F5';
    }
    head_center2.onmouseout=function(){
        head_center2.style.backgroundColor='';
    }
    var head_bottom1=document.querySelector('.head_bottom1');
    var yidui=rich.children;
    var xuanxiangbox=document.getElementsByClassName('xuanxiangbox');
    console.log(xuanxiangbox);
    head_bottom1.onmouseover=function(){
        for(let i=0;i<yidui.length;i++){
            yidui[i].onmouseover=function(){
                yidui[i].style.backgroundColor='#fff';
                yidui[i].children[1].className='ziti';
                xuanxiangbox[i].style.display='block';
            }
            yidui[i].onmouseout=function(){
                     yidui[i].style.backgroundColor='';
                    yidui[i].children[1].className='';
                }
        }
    }

    head_bottom1.onmouseout=function(){
        for(let i=0;i<yidui.length;i++){
           xuanxiangbox[i].style.display='none';
        }
    }
    

   var xhr=new XMLHttpRequest();

  xhr.onload=()=>{
     if(xhr.status===200 ){
         var arr=JSON.parse(xhr.responseText);
         // console.log(arr);
         var meizhuang_bottom=document.querySelector('.meizhuang_bottom');

        var res=arr.map(function(item){
        // console.log(item.image.slice(3));
        return  `<div class="meizhuangbox">
                    <div class="goods_img">
                        <img src="${item.image.slice(3)}" alt="" />
                    </div>
                    <h5>
                        <a href="./html/liebiaoye.html">${item.name}</a>
                    </h5>
                    <h6>${item.tiqu}</h6>
                    <div class="m-priceitem">
                        <span class="price"><i>￥</i>${item.sale}</span>
                        <span class="mktprice"><del>￥${item.price}</del></span>
                        
                    </div>
                </div>`;

  }).join('');
         // console.log(res);
         meizhuang_bottom.innerHTML=res;

         var meishi_bottom=document.querySelector('.meishi_bottom');
         var res2=arr.map(function(item){
            return `<div class="meishibox">
                    <div class="goods_img">
                        <img src="${item.image.slice(3)}" alt="" />
                    </div>
                    <h5>
                        <a href="#">${item.name}</a>
                    </h5>
                    <h6>${item.tiqu}</h6>
                    <div class="m-priceitem">
                        <span class="price"><i>￥</i>${item.sale}</span>
                        <span class="mktprice"><del>￥${item.price}</del></span>
                        
                    </div>
                </div>`
         }).join('');
         // console.log(res2);
         meishi_bottom.innerHTML=res2;
     }
  }
  xhr.open('get','./api/goodlist.php');
  xhr.send();
  var louceng_tiaoyue=document.querySelector('.louceng_tiaoyue');
  var benceng=document.getElementsByClassName('benceng');
  var lou=document.getElementsByClassName('lou');
  console.log(lou);
  var alis=louceng_tiaoyue.children;
  console.log(alis);
  for(let i=0;i<alis.length;i++){
    alis[i].onmouseover=function(){
        alis[i].style.backgroundColor='#330B77';
    }
    alis[i].onmouseout=function(){
        alis[i].style.backgroundColor='';
    }
  }
  for(let j=0;j<benceng.length;j++){
    console.log(j)
    benceng[j].onclick=function(){

        var gaodu=lou[j].offsetTop;
        console.log('距离顶部的距离：'+gaodu);
       window.scrollTo(0, gaodu);
       // console.log(gaodu);
    }
  }
  //返回顶部
  var fanhuidingbu=document.querySelector('.fanhuidingbu');
  var louceng=document.querySelector('.louceng');
  window.onscroll=function(){
    if(window.scrollY>680){
        louceng.style.display='block';
    }else{
        louceng.style.display='none';
    }
    fanhuidingbu.onclick=function(){
        let timer=setInterval(function(){
            let v=Math.ceil(window.scrollY/5);
            scrollBy(0,-v);
            if(window.scrollY<=0){
                clearInterval(timer);
            }
        },30)
    }
  }
  var yonghuming=document.querySelector('.yonghuming');
  var tuichubtn=document.querySelector('.tuichubtn');
  var cookies=Cookie.get('username');
  cookies=cookies.slice(7);
  if(cookies){
    yonghuming.innerHTML='欢迎你,手机用户'+cookies;
    tuichubtn.style.display='inline-block';
  }
  tuichubtn.onclick=function(){
    Cookie.remove('username','/');
    yonghuming.innerHTML='考拉欢迎你！';
    tuichubtn.style.display='none';
  }
})

