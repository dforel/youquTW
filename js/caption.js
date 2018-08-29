
var capobjId = 0

var topObjs = [{blank:true , value : 20 ,index:0},
    {blank:true , value : 50 ,index:1},
    {blank:true , value : 80 ,index:2},
    {blank:true , value : 110 ,index:3},
    {blank:true , value : 140 ,index:4},
    {blank:true , value : 170 ,index:5},
    {blank:true , value : 200 ,index:6},
    {blank:true , value : 230 ,index:7},
    {blank:true , value : 260 ,index:8},
    {blank:true , value : 290 ,index:9},
    {blank:true , value : 320 ,index:10},
    {blank:true , value : 350 ,index:11},
    {blank:true , value : 380 ,index:12},
    {blank:true , value : 410 ,index:13}]

/*弹幕对象的构造函数，参数分别是：1.ismove：弹幕是否是移动的弹幕,2.spe:弹幕的移动速度，3.col：弹幕的颜色，4.text：弹幕的文本*/
/*原型链方法 setTopValue设置纵坐标，setLeftValue设置横坐标，moving完成坐标的改变，setId完成id值的设置*/
function Caption( ismove , spe , col , text, id ) {
    this.isMove = ismove
    this.speed = spe
    this.color = col || "#ff0"
    this.content = text
    this.latestTime = 0 
    this.width = text.length * 20 
    this.id = id
    this.topIndex = 0
    this.occupyPos = true 
    this.top = 300
    this.left = 0
    this.setLeftValue()
    this.setTopValue()
}
Caption.prototype.setTopValue = function  () {
    for(var i = 0 ,len = topObjs.length ; i < len ; i++){
        if (topObjs[i].blank) {
            this.top = topObjs[i].value
            this.topIndex = i
            topObjs[i].blank = false 
            break
        }
    }
}
Caption.prototype.setLeftValue = function  () {
    if (this.isMove) {
        this.left = danmu_window.cavWidth
    }
    else {
        var contentLength = this.content.length
        var nowItemLeft = 420 - contentLength * 9
        this.left = nowItemLeft
    }
}
Caption.prototype.moving = function () {
    if (this.isMove) {
        this.left-=this.speed
        if ( this.left + this.width < danmu_window.cavWidth && this.occupyPos) {
            this.occupyPos = false 
            topObjs[this.topIndex].blank = true 
        }
    } 
    else{
        this.latestTime += 1
        if (this.latestTime > 450) {
            topObjs[this.topIndex].blank = true 
        }
    }
}
Caption.prototype.setId = function  () {
    this.id = capobjId
    capobjId++
}

window.Caption = Caption;