/* 
* @Author: Marte
* @Date:   2018-11-26 11:16:27
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-02 18:08:04
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
    // console.log(xuanxiangbox);
    head_bottom1.onmouseover=function(){
        rich.style.display='block';
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
        rich.style.display='none';
        for(let i=0;i<yidui.length;i++){
           xuanxiangbox[i].style.display='none';
        }
    }
    var zhongjianbottom1=document.querySelector('.zhongjianbottom1');
    var xhr=new XMLHttpRequest();
    var arr
    xhr.onload=function(){
        console.log(11111)
        if(xhr.status===200){
            arr=JSON.parse(xhr.responseText);
            var res1=arr.map(function(item){
                return `<div class="goods_bd" data-id="${item.id}">
                          <div class="goods_bd_border">
                            <div class="goods_img"><img src="${item.image}" alt="" /></div>
                            <h5><a href="javascript:;">${item.name}</a></h5>
                            <h6>${item.tiqu}</h6>
                            <div class="m-priceitem">
                              <span class="price"><i>￥</i>${item.sale}</span>
                              <span class="mktprice"><del>￥${item.price}</del></span>
                              <a href="./gouwuche.html" class="goods-btn"><span>加入购物车</span></a>
                            </div>
                          </div>
                      </div>`
            }).join('');
            zhongjianbottom1.innerHTML=res1;
            var zhongjianbottom2=document.querySelector('.zhongjianbottom2');
            var res2=arr.map(function(item){
                return `<div class="goods_bd" data-id="${item.id}">
                          <div class="goods_bd_border">
                            <div class="goods_img"><img src="${item.image}" alt="" /></div>
                            <h5><a href="javascript:;">${item.name}</a></h5>
                            <h6>${item.tiqu}</h6>
                            <div class="m-priceitem">
                              <span class="price"><i>￥</i>${item.sale}</span>
                              <span class="mktprice"><del>￥${item.price}</del></span>
                              <a href="./gouwuche.html" class="goods-btn"><span>加入购物车</span></a>
                            </div>
                          </div>
                      </div>`
            }).join('');
            zhongjianbottom2.innerHTML=res2;
            var goods_bd=document.getElementsByClassName('goods_bd');

            for(let i=0;i<goods_bd.length;i++){
                goods_bd[i].onclick=function(){
                    let id=this.getAttribute('data-id');
                    console.log(id)
                    location.href='./xiangqingye.html?id='+id;
                }
            }
        }
    }
    xhr.open('get','../api/goodlist.php');
    xhr.send(); 
// 返回顶部
var louceng_tiaoyue=document.querySelector('.louceng_tiaoyue');
  var benceng=document.getElementsByClassName('benceng');
  var lou=document.getElementsByClassName('lou');
  console.log(lou);
  var alis=louceng_tiaoyue.children;
  console.log(alis);
  for(let i=0;i<alis.length;i++){
    alis[i].onmouseover=function(){
        alis[i].style.backgroundColor='#FFECED';
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
  var sheng=document.querySelector('.sheng');
  var jiang=document.querySelector('.jiang');
  sheng.onclick=function(){
    arr.sort((a,b)=>{
         return a.sale-b.sale;
    })
   var res3=arr.map(function(item){
        return `<div class="goods_bd" data-id="${item.id}">
                  <div class="goods_bd_border">
                    <div class="goods_img"><img src="${item.image}" alt="" /></div>
                    <h5><a href="javascript:;">${item.name}</a></h5>
                    <h6>${item.tiqu}</h6>
                    <div class="m-priceitem">
                      <span class="price"><i>￥</i>${item.sale}</span>
                      <span class="mktprice"><del>￥${item.price}</del></span>
                      <a href="./gouwuche.html" class="goods-btn"><span>加入购物车</span></a>
                    </div>
                  </div>
                </div>`
        }).join('');
    zhongjianbottom1.innerHTML=res3;
  }
  jiang.onclick=function(){
    arr.sort((a,b)=>{
      return b.sale-a.sale;
    })
    var res4=arr.map(function(item){
        return `<div class="goods_bd" data-id="${item.id}">
                  <div class="goods_bd_border">
                    <div class="goods_img"><img src="${item.image}" alt="" /></div>
                    <h5><a href="javascript:;">${item.name}</a></h5>
                    <h6>${item.tiqu}</h6>
                    <div class="m-priceitem">
                      <span class="price"><i>￥</i>${item.sale}</span>
                      <span class="mktprice"><del>￥${item.price}</del></span>
                      <a href="./gouwuche.html" class="goods-btn"><span>加入购物车</span></a>
                    </div>
                  </div>
                </div>`
    }).join('');
    zhongjianbottom1.innerHTML=res4;
  }
}) 