//初始化地图对象，加载地图
var pt=[108.7081,34.3133];
var map = new AMap.Map("container", {
    resizeEnable: true
});
map.setZoomAndCenter(14,pt);
var rectOptions = {
    strokeStyle: "dashed",
    strokeColor: "#FF33FF",
    fillColor: "#FF99FF",
    fillOpacity: 0.5,
    strokeOpacity: 1,
    strokeWeight: 2
};

/*
map.plugin(["AMap.MouseTool"], function() {
    var mouseTool = new AMap.MouseTool(map);
    //通过rectOptions更改拉框放大时鼠标绘制的矩形框样式
    mouseTool.rectZoomIn(rectOptions);     
});
*/

addMarker();
//添加marker标记
function addMarker() {
    map.clearMap();
    var marker = new AMap.Marker({
        map: map,
        position: pt
    });
    /*
    marker.setTitle("设置位置");  
            marker.setLabel({  
                offset: new AMap.Pixel(15, 15),  
                content: "陕西金诺财企业管理有限公司"  
            });
    */

    var text = new AMap.Text({
        text:'陕西金诺财企业管理有限公司',
        textAlign:'center', // 'left' 'right', 'center',
        verticalAlign:'middle', //middle 、bottom
        //draggable:true,
        cursor:'pointer',
        offset: new AMap.Pixel(0, 22),  
        angle:0,
        style:{
            'background-color':'#ACD6FF',
            'border':'solid 1px #0088ff',
            'padding':'5px 5px'
        },
        position: pt
    });
    text.setMap(map);


    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker.getPosition());
    });

    AMap.event.addListener(text, 'click', function() {
        infoWindow.open(map, marker.getPosition());
    });

}

//实例化信息窗体
var title = '陕西金诺财企业管理有限公司',
    content = [];
content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：陈阳寨十字世纪星城3号楼1单元20层1-20-14");
content.push("电话：手机: 13201828970 微信:13201828970");
content.push("<a href='http://www.jinnuocai.com'>详细信息</a>");
var infoWindow = new AMap.InfoWindow({
    isCustom: true,  //使用自定义窗体
    content: createInfoWindow(title, content.join("<br/>")),
    offset: new AMap.Pixel(16, -45)
});

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "info";

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "http://webapi.amap.com/images/close2.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "http://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}
