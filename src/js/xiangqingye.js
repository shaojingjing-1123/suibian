/* 
* @Author: Marte
* @Date:   2018-11-28 20:26:55
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-02 19:29:33
*/

document.addEventListener('DOMContentLoaded', function(){
    let head_top_right=document.querySelector('#head_top_right');
    
    let head_top_right2=document.getElementsByClassName('head_top_right2');
    let sanjiao=document.getElementsByClassName('sanjiao');
    // console.log(sanjiao);
    for(let i=0;i<head_top_right2.length;i++){
        // console.log(i);
        head_top_right2[i].onmouseover=function(){
            // console.log(head_top_right2[i]);
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

    var wupinxiangqing=document.querySelector('.wupinxiangqing');
    var res=decodeURI(location.search);
        res=res.slice(4);
        console.log(res);

    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
        if(xhr.status===200){
            var arr=JSON.parse(xhr.responseText);
            // console.log(arr);
            if(res){
            //利用filter筛选ID是res的数据
                var brr=arr.filter(function(item,index) {
                    return item.id==res?true:false;
                    console.log(item.id);
                });
                console.log(brr);
                var html=brr.map(function(item){
                    return `<div class="wupin_img">
                          <div class="wupin_img_top">
                            <img src="${item.image}"  dataBig="${item.image}" alt="" />
                          </div>
                          <ul class="wupin_img_bottom">
                            <a href="javascript:;" class="wupin_img_btn1"></a>
                            <li><a href="javascript:;"><img src="${item.image}" alt="" /></a></li>
                            <li><a href="javascript:;"><img src="${item.img2}" alt="" /></a></li>
                            <a class="wupin_img_btn2" href="javascript:;"></a>
                          </ul>
                        </div>
                        <div class="wupin_xinxi">
                            <div class="wupin_xinxiname"><span class="auto-id-1543318986353">${item.name}</span></div>
                            <p class="des">${item.des}</p>
                            <div class="jiage">
                                <ul>
                                    <li>售价</li>
                                    <li  class="sale">￥${item.sale}</li>
                                    <li><span class="zhekou">${((item.sale*10)/(item.price*1)).toFixed(1)}折</span><span class="haha">包邮</span></li>
                                    <li class="price"><span>参考价</span>￥${item.price}</li>
                                </ul>
                            </div>
                            <div class="shuliang">
                                <b>数量</b>
                                <div class="jiajian">
                                <span class="jian">-</span><input type="Number" class="val" name="val" min="1" value="1" /><span class="jia">+</span>
                                <span class="kucun">库存充足</span>
                                </div>
                            </div>
                            <div class="shuoming"><span>说明</span><span>正品保障</span><span>支持7天无理由退换货</span></div>
                            <div class="goumai_btn">
                            <ul>
                            <li class="purchase"><a href="javascript:;">立即购买</a></li>
                            <li class="trolley" data-id="${item.id}"><a href="javascript:;"><i></i>加入购物车</a></li>
                            </ul>
                            </div>
                        </div>`
                }).join('');
                // console.log(html);
                wupinxiangqing.innerHTML=html;
                var trolley=document.querySelector('.trolley');
                var a
                $('.jia').on('click',(e)=>{
                    e.preventDefault();
                    a=$('.val').val();
                    a++;
                    $('.val').val(a);
                });
                $('.jian').on('click',(e)=>{
                     e.preventDefault();
                     a=$('.val').val();
                     if(a==1)return
                     a--;
                    $('.val').val(a);

                })
                trolley.onclick=function(){
                    var a=true
                var goodslist=Cookie.get('goodslist');
                    goodslist===''? goodslist=[] : goodslist=JSON.parse(goodslist);
                    
                    brr[0].num=$('.val').val();
                    goodslist.forEach(item=>{
                      if(item.id==brr[0].id){
                        item.num=item.num*1+brr[0].num*1;
                        a=false;
                       }
                    });
                     if(a) {goodslist.push(brr[0]);}

                    Cookie.set('goodslist',JSON.stringify(goodslist));
                    location.href="./gouwuche.html"
                }
                 $('.wupin_img_top').lxzoom()
            }
        }
    }
    xhr.open('get','../api/goodlist.php');
    xhr.send();
    var pinglun_btn=document.querySelector('.pinglun_btn');
    var alis=pinglun_btn.children;
    var pinglun=document.querySelector('.pinglun');
    var dadadehezi=document.querySelector('.dadadehezi');
    // console.log(alis);
    for(var i=0;i<alis.length;i++){
        alis[i].index=i;
        alis[i].onclick=function(){
            for(var j=0;j<alis.length;j++){
                alis[j].className='';
            }
            alis[this.index].className='gaoliang';
            window.scrollTo(0,752);
        }
    }
    var gouwuche=document.querySelector('.gouwuche');
    var Top=pinglun.offsetTop;
    console.log(Top);
    window.onscroll=function(){
        var scrollTop=window.scrollY;
        if(scrollTop>=Top){
            dadadehezi.className='dadadehezi dahezi';
            dadadehezi.style.backgroundColor='#fff';
            gouwuche.style.display='block';
        }else{
            dadadehezi.className='dadadehezi';
            dadadehezi.style.backgroundColor='#F8F8F8';
            gouwuche.style.display='none';
        }
    }
    //返回顶部
    var fanhuidingbu=document.querySelector('.fanhuidingbu');
    var wupinxiangqing=document.querySelector('.wupinxiangqing');
    var wuming=document.querySelector('.wuming');
    var tp=wupinxiangqing.offsetTop;
    // window.onscroll=function(){
    //     var scrollTop=window.scrollY;
    //     if(scrollTop>=tp){
    //         wuming.style.display='block';
    //     }else{
    //         wuming.style.display='none';
    //     }
    // }
    fanhuidingbu.onclick=function(){
        var timer=setInterval(function(){
            var v=Math.ceil(window.scrollY/5);
            scrollBy(0, -v);
            if(window.scrollY<=0){
                clearInterval(timer);
            }
        },30)
    }



          
         
})