/* 
* @Author: Marte
* @Date:   2018-11-29 22:42:52
* @Last Modified by:   Marte
* @Last Modified time: 2018-12-03 16:33:57
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

    var cart=document.querySelector('.cart');
    var goodslist=Cookie.get('goodslist');
        goodslist===''? goodslist=[] : goodslist=JSON.parse(goodslist);
        console.log(goodslist);
    cart.innerHTML=goodslist.map(item=>{
              return `<li data-id="${item.id}">
                                <p class="good_check"><input type="checkbox" name="good" value=""  class="checkbox"  /></p>
                                <p><img src="${item.image}" height="80" width="80" alt="" /></p>
                                <p class="good_name">${item.name}</p>
                                <p class="good_price">￥${item.sale}</p>
                                <p class="num">
                                    <span class="cutnum">-</span><input class="nownum" type="Number" value="${item.num}" min="1"/><span class="addnum">+</span>   
                                </p>
                                <p class="good_total">￥${(item.sale)*1*((item.num)*1).toFixed(2)}</p>
                                <p class="good_del">
                                    <a class="del" >删除</a>
                                </p>
                            </li>`
        }).join('');
        var a
        $('.del').on('click',function(){
           var index=$(this).parents('li').index();
           goodslist.splice(index,1);
           Cookie.set('goodslist',JSON.stringify(goodslist));
           location.href="gouwuche.html"
        })
        $('.cart').on('click',(e)=>{
            if(e.target.className==='addnum'){
                    e.preventDefault();
                a=$(e.target).prev().val();
                    a++;
                    $(e.target).prev().val(a);
                var danjia=$(e.target).parents('.num').prev().html().slice(1)*1;
                    $(e.target).parents('.num').next().html('￥'+(danjia*a*1));
                    total()
                      
             }else if(e.target.className==='cutnum'){
                    e.preventDefault();
                a=$(e.target).next().val();
                    if(a==1)return;
                    a--;
                    $(e.target).next().val(a);
                    var danjia=$(e.target).parents('.num').prev().html().slice(1)*1;
                    $(e.target).parents('.num').next().html('￥'+(danjia*a*1));
                    total()
                      
            }
        })
      
     function total(){
           var nownum=document.getElementsByClassName('nownum');
            var allnum=document.querySelector('#allnum');
            var good_total=document.getElementsByClassName('good_total');
            var zongji=document.querySelector('.zongji');
            var checkbox=document.querySelectorAll('.checkbox')
            var total=0;
            var zongjia=0;
            var a=false;
            for(let i=0;i<nownum.length;i++){
                if(checkbox[i].checked){
                      var nownumval=nownum[i].value*1;
                        total+=nownumval;
                        allnum.innerHTML='已选商品'+total+'件';
                        var good_totalval=good_total[i].innerHTML.slice(1)*1;
                        zongjia+=good_totalval;
                        zongji.innerHTML='￥'+zongjia;
                        a=true;
                }
                if(!a){
                      allnum.innerHTML='已选商品'+0+'件';
                       zongji.innerHTML='￥'+0;
                 }
  
              
            }
     }
    jQuery($=>{
            // 全选/不选
            var $checkbox=$('li :checkbox');
           
            $('#xuanzhong').click(function(){
                $checkbox.prop('checked',this.checked);
                total()
            })
            $checkbox.on('click',()=>{
                console.log(343)
                 total();
                 quanxuan();
            })
            //如果都被选中怎全选就勾选
            function quanxuan(){
                //筛选出有checked属性的集合
                $checked=$('li :checkbox').filter(':checked');//筛选匹配的表达式
                $('#xuanzhong').prop('checked',$checked.length===$checkbox.length);
        
            }
         
         
        });
        
})