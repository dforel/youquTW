(function () {
    window.onload=function () { 
        var cav = document.getElementsByTagName("canvas")[0]
        // console.log(cav)
        //设置常量canvas的高度以及宽度 
        window.danmu_window = {
            cavWidth :cav.clientWidth,
            cavHeight:cav.clientHeight,
            capObjs:[],
            danmuArray:[  ],
            now_time:0
        }

 
        cav.width=danmu_window.cavWidth
        cav.height=danmu_window.cavHeight 


        
       

        var ctx = cav.getContext("2d") 
        // console.log(ctx)
        //存储弹幕对象的数组  
        var capHeight = 20 

        // var inputEle = document.getElementsByClassName("caption-input-text")[0]
        // var sendEle = document.getElementsByClassName("caption-sendButton")[0]
        // var colorUl = document.getElementsByClassName("colorItems")[0]
        // var ismoveInputEle = document.getElementsByClassName("caption-input-ismove")[0]
        //弹幕颜色
        var colors=["#fff","#FFCCCC","#CCFFCC","#CCCCFF","#FFFFCC","#CCFFFF"]
        var selectedColorIndex = 0
        var prevPlayTime = 0
        //测试数据的数组 
        //弹幕在画布中高度可能值组成的数组
         
        //将测试数据备份 

        // var cap1 = new Caption(  false , 1 , 0 , "小礼物走一波，双击6666。。。。", danmu_window.capObjs.length )
        // danmu_window.capObjs.push(cap1) 
        
        //循环遍历数组，根据对象的属性绘制在画布上
        function drawAllText () {
            ctx.clearRect( 0 , 0 , danmu_window.cavWidth , danmu_window.cavHeight)
            ctx.beginPath()
            for(var i=0 , len = danmu_window.capObjs . length ; i < len ; i++ ){
                ctx.fillStyle = danmu_window.capObjs[i].color
                ctx.font = "bold 20px Courier New"
                ctx.fillText( danmu_window.capObjs[i].content , danmu_window.capObjs[i].left , danmu_window.capObjs[i].top )
                ctx.closePath()
                danmu_window.capObjs[i].moving() 
            }
        }
        
        //更新数组，当对象已经超出范围的时候从数组删除这个对象
        function refreshObjs(objs) {
            for (var i = objs.length - 1; i >= 0; i--) {
                if (objs[i].left < - danmu_window.cavWidth || objs[i].latestTime > 450 ) {
                    objs.splice(i , 1)
                }

            }
        }
        
        //更新保存弹幕对象的数组
        function updateArray () {
            var now = danmu_window.now_time;
            // console.log(now)
            var array = danmu_window.danmuArray;
            for (var i = array.length - 1; i >= 0; i--) {
                var nowItemTime = parseInt(array[i].time) 
                if ( nowItemTime == now ) {
                    //首次写的控制高度的方式，空间利用不充分，后来改为setTopValue中的方式
                    // var nowItemLeft = getLeftValue(testArray[i])
                    // var diffTime = Math.abs(nowItemTime - lastItemTime)
                    // if (diffTime < 6) { 
                    //     capHeight += 30
                    //     capHeight = capHeight > 400 ? 20 : capHeight
                    // }    
                    var temcolor = colors[array[i].colorIndex]
                    var temcap = new Caption (  array[i].ismove , 1 , temcolor , array[i].content , danmu_window.capObjs.length)
                    danmu_window.capObjs.push(temcap) 
                    temcap = null
                    array.splice(i,1)
                }
            }
        }
        
        //当用户点击send发送弹幕的回调函数
        function sendCaption (argument) {
            var inputEleTxt = inputEle.value
            var now = parseInt( video.currentTime )
            var inputIsmoveValue = ismoveInputEle.checked
            var temObj = {content:inputEleTxt,time:now,ismove:inputIsmoveValue,colorIndex:selectedColorIndex}
            testArray.push(temObj)
            inputEle.value = ""
        }

        // function getLeftValue (obj) {
        //     if (obj.ismove) {
        //         return 0
        //     }
        //     else {
        //         var contentLength = obj.content.length
        //         var nowItemLeft = 420 - contentLength * 9
        //         return nowItemLeft
        //     }
        // }
        
        //重新启动canvas，用在人为导致进度条时间的改变
        function reinitCav (argument) {
            // testArray = testArrayCopy
            copyArray(testArrayCopy , testArray)
            danmu_window.capObjs = []
            capHeight = 0
            clearInterval(canvasTimer)
            canvasTimer = null
            initCanvas()
        }

        var canvasTimer = null 
        
        //初始化canvas，用在开始播放时
         function initCanvas () {
             if (canvasTimer == null ) {
                canvasTimer = setInterval(function (argument) {
                    drawAllText()
                    updateArray()
                    refreshObjs(danmu_window.capObjs)
                },10)
             }
            
        }//end function initCanvas

        var natureTimer = null 
        function initTimer () {
            if (natureTimer == null ) {
                natureTimer = setInterval(function (argument) {
                    danmu_window.now_time++;
               },1000)
            }
           
       }

       
        // 初次加载弹幕
        function initDanmu() {
            $.ajax({ 
                url:"http://youqu.tw/danmu/getdanmu.php?type=2", 
                dataType:"json",
                success:function(res){
                    if(res.code==1){
                        var data = res.result;
                        var minId = data[data.length-1].id;
                        for (let index = 0; index < data.length; index++) {
                            const d = data[index];
                            danmu_window.danmuArray.push({
                                content:d.COMMENT,
                                time:danmu_window.now_time + (d.id-minId)+1,
                                ismove:true,
                                colorIndex:4
                            })
                        } 
                    }  
                }
            });
        }

        // 初次加载弹幕
        function ajaxGetDanmu() {
            setInterval(function (params) {
                $.ajax({ 
                    url:"http://youqu.tw/danmu/getdanmu.php?type=1", 
                    dataType:"json",
                    success:function(res){
                        if(res.code==1){
                            var data = res.result;
                            var minId = data[data.length-1].id;
                            for (let index = 0; index < data.length; index++) {
                                const d = data[index];
                                danmu_window.danmuArray.push({
                                    content:d.COMMENT,
                                    time:danmu_window.now_time + (d.id-minId)+1,
                                    ismove:true,
                                    colorIndex:4
                                })
                            } 
                        }  
                    }
                });
            },10*1000)
        }
        
         

        //color select event 用户发送弹幕的颜色控制代码
        
       initTimer();
       initCanvas();
       initDanmu();
       ajaxGetDanmu();
       
    }//end
})()