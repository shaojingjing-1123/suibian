//是否自动轮播
//是否显示高亮效果
//是否显示左右按钮
//可设置轮播间隔时间
//轮播类型: fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, 
//默认显示第几张图片
;(function($){$.fn.lunbo=function(options){
    var banner={
        //设置初始化参数
          autoplay:true,
          page:true,
          button:true,
          time:3000,
          width:640,
          height:480,
          src:['181.jpg','182.jpg','183.jpg','184.jpg','185.jpg','186.jpg','187.jpg','188.jpg'],
          type:'horizontal', //fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, 
          index:1

     }
     var obj=$.extend({},banner,options);
     
     var $banner=$('#banner');
         $banner.css({
            width:obj.width,
            height:obj.height
         })

     $('<ul>').appendTo($banner);

     $ul=$(' #banner ul');
     var timer;
      var idx=obj.index;
     //是否分页
    if(obj.page){
                 $('<div>').addClass('isPage').appendTo($banner);
                 for(var i=0;i<obj.src.length;i++){
                    $('<span>').text(i+1).appendTo($('.isPage'))     
                 }
                 $span=$('.isPage span');
                 $span.eq(0).addClass('active'); 
     } 
       //是否添加按钮
    if(obj.button){
        //创建按钮
        $('<span>').addClass('btnleft').appendTo($banner).text('<');
        $('<span>').addClass('btnright').appendTo($banner).text('>').css({
            left:($banner.outerWidth()-$('.btnright').outerWidth())
        });
        $left=$('.btnleft');
        $right=$('.btnright');

    }        
     //判定轮播图类型  1水平无缝滚动
     if(obj.type==='horizontal'){
           //设置水平参数
             $ul.addClass('horizontal');

            var content=obj.src.map(function(item){
                return ` <li><img src="${item}" /></li>` 
            }).join('')

             $ul.html(content);
           //无缝连接添加最后两张图片  
           //添加第一张到最后
           $('<li>').html(`<img src='${obj.src[0]}'/>`).appendTo($ul);
           //添加最后一张到最前
           $('<li>').html(`<img src="${obj.src[obj.src.length-1]}"/>`).prependTo($ul);
            //设置参数
            $(' #banner li img').css({
              width:obj.width,
              height:obj.height
            })
           var length=$('.horizontal li').length;
               //初始化ul
               $ul.css({
                  width:obj.width*length,
                  left:-obj.index*(obj.width)
             })         
           //自动轮播效果
            if(obj.autoplay){
             timer=setInterval(function(){
                
                      idx++;
                if(idx>length-1){
                 idx=(obj.index)+1;
                 $ul.css({ left:-(obj.width)*(obj.index)*1})
                }
                if(obj.page){               
               //高亮效果
                for(let i=0;i<$span.length;i++){
                    if((i+1)===idx){$span.eq(i).addClass('active')}
                    else if(i===0&&idx===obj.src.length+1){$span.eq(0).addClass('active')}                     
                    else {$span.eq(i).removeClass('active')}
                }
               }
                $ul.animate({
                    left:-idx*obj.width
                })
              
             },obj.time)
              //鼠标移入
               $banner.on('mouseover',e=>{
                if(e.target.tagName==="IMG"||e.target.tagName==="SPAN"){
                    clearInterval(timer);
                  
                 }
              })
              $banner.on('mouseout',e=>{
                if(e.target.tagName==="IMG"||e.target.tagName==="SPAN"){
                    timer=setInterval(function(){
                
                      idx++;
                if(idx>length-1){
                 idx=(obj.index)+1;
                 $ul.css({ left:-(obj.width)*(obj.index)*1})
                }
                if(obj.page){               
               //高亮效果
                for(let i=0;i<$span.length;i++){
                    if((i+1)===idx){$span.eq(i).addClass('active')}
                    else if(i===0&&idx===obj.src.length+1){$span.eq(0).addClass('active')}                     
                    else {$span.eq(i).removeClass('active')}
                }
               }
                $ul.animate({
                    left:-idx*obj.width
                })
              
             },obj.time) 
                }
               })            
            } 
           //点击分页实现切换效果
          if(obj.page){
               $('.isPage').on('click','span',function(e){
               var number=$(e.target).text();
               $ul.animate({left:-number*(obj.width)});
                   idx=number
               for(let i=0;i<$span.length;i++){
                    if(i===number-1){$span.eq(i).addClass('active')}
                    else{$span.eq(i).removeClass('active')}
              }
             });
          }
           //点击按钮实现切换
          if(obj.button){
               $left.on('click',function(){
               idx++;
                if(idx>length-1){
                 idx=(obj.index)+1;
                 $ul.css({ left:-(obj.width)*(obj.index)*1})
                }
                if(obj.page){               
               //高亮效果
                for(let i=0;i<$span.length;i++){
                    if((i+1)===idx){$span.eq(i).addClass('active')}
                    else if(i===0&&idx===obj.src.length+1){$span.eq(0).addClass('active')}                     
                    else {$span.eq(i).removeClass('active')}
                }
               }
                $ul.animate({
                    left:-idx*obj.width
                },100)

             })
             $right.on('click',function(){
                   idx--;
                 if(idx<0){
                    idx=obj.src.length-1;
                    $ul.css({left:-obj.width*(obj.src.length)})
                 } 
                 if(obj.page){               
                       //高亮效果
                  for(let i=0;i<$span.length;i++){
                    if((i+1)===idx){$span.eq(i).addClass('active')}
                    else if(i===$span.length-1&&idx===0){$span.eq($span.length-1).addClass('active')}                     
                    else {$span.eq(i).removeClass('active')}
                     }
                  }
                 $ul.animate({
                    left:-idx*obj.width
                 },100) 
             })      
          } 
       
     }
     //判定轮播图类型  2渐入渐出
     if(obj.type==='fade'){
          $ul.addClass('fade');
        //放入图片
        var content=obj.src.map(function(item){
           return `<img src="${item}">`
        }).join('');
        $ul.html(content);
        $img=$('.fade img');
        //自动播放
        if(obj.autoplay){
          timer=setInterval(function(){
             idx++;
             if(idx>obj.src.length){
                idx=1
             }
             for(let i=0;i<obj.src.length;i++){
                if(i+1===idx){$img.eq(idx-1).fadeIn()}
                else{$img.eq(i).fadeOut()}
                if(obj.page){
                if(i+1===idx){$span.eq(i).addClass('active')}
                else{$span.eq(i).removeClass('active')}
                }
             }
          }, 3000)
            //鼠标移入移除
          $banner.on('mouseover',e=>{
           if(e.target.tagName==='IMG'||e.target.tagName==='SPAN'){
            clearInterval(timer)
            }
          })
          $banner.on('mouseout',e=>{
         if(e.target.tagName==='IMG'||e.target.tagName==='SPAN'){
              timer=setInterval(function(){
             idx++;
             if(idx>obj.src.length){
                idx=1
             }
             // console.log(666)
             for(let i=0;i<obj.src.length;i++){
                if(i+1===idx){$img.eq(idx-1).fadeIn()}
                else{$img.eq(i).fadeOut()}
                if(obj.page){
                if(i+1===idx){$span.eq(i).addClass('active')}
                else{$span.eq(i).removeClass('active')}
                }
             }
          }, 3000)
         }
           })
        }
        //分页切换
        if(obj.page){
         $('.isPage').on('click','span',e=>{
            var number=$(e.target).text();
            for(let i=0;i<$span.length;i++){
                if(i+1==number){$img.eq(i).fadeIn();
                    $span.eq(i).addClass('active');
                }
                 else{$img.eq(i).fadeOut();
                      $span.eq(i).removeClass('active')
                 }
             }
          })
        }
        //添加按钮
        if(obj.button){
          $left.on('click',function(){
                  idx++;
             if(idx>obj.src.length){
                idx=1
              }
           
             for(let i=0;i<obj.src.length;i++){
                if(i+1===idx){$img.eq(idx-1).fadeIn()}
                else{$img.eq(i).fadeOut()}
                if(obj.page){
                if(i+1===idx){$span.eq(i).addClass('active')}
                else{$span.eq(i).removeClass('active')}
                }
              }
          })
          $right.on('click',function(){
                   idx--;
              if(idx<1){
                idx=obj.src.length
              } 
              for(let i=0;i<obj.src.length;i++){
                if(i+1===idx){$img.eq(idx-1).fadeIn()}
                else{$img.eq(i).fadeOut()}
                if(obj.page){
                if(i+1===idx){$span.eq(i).addClass('active')}
                else{$span.eq(i).removeClass('active')}
                }
              }    
          })
        }
       
    }
     

  return this;
}})(jQuery);
