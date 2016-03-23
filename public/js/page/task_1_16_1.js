/**
 * Created by Administrator on 2016/3/23 0023.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var ctiy,       // 城市
        index;      // 指数

    ctiy = document.getElementById('aqi-city-input').value;
    index = document.getElementById('aqi-value-input').value;

    aqiData[ctiy] = index;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var list,       //表格
        apiTable;   //dom

    apiTable = document.getElementById('api-table');
    list = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for (name in aqiData) {
        list += '<tr><td>'
            + name +'</td><td>'
            + aqiData[name]
            +'</td><td><button>删除</button></td></tr>';
    }

    apiTable.innerHTML = list;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}



function init() {
    var addBtn,
        delBtn;

    addBtn = document.getElementById('add-btn');
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent(addBtn, 'click', addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();


/**
 * 添加事件（兼容）
 * @param elm ----------------------- dom元素
 * @param type ---------------------- 事件
 * @param handler ------------------- 方法
 * @returns {boolean} --------------- boolean
 */
function addEvent(elm,type,handler){
    if(!elm) return false;
    if(elm.addEventListener){
        elm.addEventListener(type,handler,false);
        return true;
    }else if(elm.attachEvent){
        elm.attachEvent('on'+type,function(){handler.apply(elm)});
        return true;
    }
    return false;
}