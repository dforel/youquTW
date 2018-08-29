(function($) {

	"use strict";	

	/**
    * 作者：dforel@gmail.com
    * 博客：http://viinight.com
    * 允许转载，转载希望注明一下作者
    * 请不要用于非法用途，滑稽。
    *
    **/ 
  
   
  	var dict = {
		'0':'富强' ,
		'1':'民煮' ,  // 防和谐
		'2':'文明' ,
		'3':'和谐' ,
		'4':'自由' ,
		'5':'平等' ,
		'6':'公正' ,
		'7':'法治' ,
		'8':'爱国' ,
		'9':'敬业' ,
		'a':'诚信' ,
		'b':'友善' ,
		'c':'奶只' ,  // 防和谐
		'd':'萌妹'
	};
	var dict_r = {
		'富强' :'0',
		'民煮' :'1',  // 防和谐
		'文明' :'2',
		'和谐' :'3',
		'自由' :'4',
		'平等' :'5',
		'公正' :'6',
		'法治' :'7',
		'爱国' :'8',
		'敬业' :'9',
		'诚信' :'a',
		'友善' :'b',
		'奶只' :'c',  // 防和谐
		'萌妹' :'d' 
	};

	function submitDanmu( comment ){
		
		$.post("http://youqu.tw/danmu/commit.php",{comment:comment},function(result){
			console.log(result)
		});
	}

	$('.toggle-menu').click(function(){
        $('.show-menu').stop(true,true).slideToggle();
        return false;
    });

    $('.show-menu a').click(function() {
    	$('.show-menu').fadeOut('slow');
    });

	$('#jiami').click(function() {
		// alert( $("#yw").val() )
		
		var strs = $("#yw").val();
		var ascii = '';
		var ascii2 = '';
		
		// 上传弹幕
		if( $('#toggle').attr('checked') ){ 
			submitDanmu(strs);
		}

		for (let index = 0; index < strs.length; index++) {
			var str = strs[index];
			var code = str.charCodeAt().toString(14); 
			// console.log(code)
			for (let i = 0; i < code.length; i++) {
				var e = code[i];
				ascii+=dict[e]+",";
				// console.log(dict[e])
			} 
			ascii = ascii.substring(0, ascii.lastIndexOf(','));  
			ascii += ";" 
			ascii2 += str.charCodeAt().toString(2)+";"
		}
		ascii = ascii.substring(0, ascii.lastIndexOf(';'));   
		// console.log(ascii);
		// console.log(ascii2);

    	$('#mw').val(ascii);
	});
	

	
	$('#jiemi').click(function() {
		// alert( $("#yw").val() )
		var strs = $("#mw").val();
		var list = strs.split(';'); 
		var yuanwen = ''; 
		// var ascii2 = '';
		for (let index = 0; index < list.length; index++) {
			var code = list[index];
			var charList = code.split(',');
			var ywStr = '';
			for (let i = 0; i < charList.length; i++) {
				const c = charList[i];
				if(!dict_r[c]){
					$('#yw').val("密码中混进了什么奇怪的东西");
					return;
				};
				ywStr += dict_r[c]; 
			}
			
			// console.log(ywStr)
			var asciiCode = parseInt(ywStr,14);
			// console.log(asciiCode)
			yuanwen +=String.fromCharCode(asciiCode);
		}  

    	$('#yw').val(yuanwen);
    });

})(jQuery);