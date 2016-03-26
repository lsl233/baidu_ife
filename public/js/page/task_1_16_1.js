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
 * 验证策略
 * @type {Object}
 */
var strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },

    minLength: function (value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },

    isMobile: function (value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}%)/.test(value)) {
            return errorMsg;
        }
    },

    isChinese: function (value, errorMsg) {
        if (/[^\u4e00-\u9fa5]/.test(value)) {
            return errorMsg;
        }
    },

    isNumber: function (value, errorMsg) {
        if (!/^[0-9]*$/.test(value)) {
            return errorMsg;
        }
    }
}

var Validator = function () {
    this.cache = [];
};

Validator.prototype.add = function (value, rules, errorMsg) {
    // var ary = rule.split(':');
    // this.cache.push(function () {
    //     var strategy = ary.shift();
    //     ary.unshift(value);
    //     ary.push(errorMsg);
    //     return strategies[strategy].apply(value, ary);
    // });
    var self = this;

    for (var i = 0, rule; rule = rules[i++];) {
        (function(rule) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;

            self.cache.push(function () {
                var strategy = strategyAry.shift();
                strategyAry.unshift(value);
                strategyAry.push(errorMsg);
                return strategies[strategy].apply(null, strategyAry);
            });
        })(rule)
    }
};

Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc();
        if (msg) {
            return msg;
        }
    }
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var ctiy,       // 城市
        index;      // 指数

    ctiy = document.getElementById('aqi-city-input').value;
    index = document.getElementById('aqi-value-input').value;

    function validataFunc () {
        var v = new Validator();
        // v.add(ctiy, 'isChinese', '请输入中文');
        // v.add(index, 'minLength:10', '请输入数字');
        v.add(ctiy, [{
            strategy: 'isChinese',
            errorMsg: '请填写中文'
        }, {
            strategy: 'isNonEmpty',
            errorMsg: '不能为空'
        }]);

        v.add(index, [{
            strategy: 'isNumber',
            errorMsg: '请填写数字'
        }, {
            strategy: 'isNonEmpty',
            errorMsg: '不能为空'
        }]);

        var errorMsg = v.start();
        return errorMsg;
    }
    
    var err = validataFunc();
    if (err) {
        alert(err);
        return false;
    }

    aqiData[ctiy] = index;
    return true;
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
        list += '<tr><td class="ctiy-name">'
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
    var is = addAqiData();
    if (is) {
       renderAqiList(); 
    }  
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    var event,
        target,
        ctiy

    event = event || window.event;
    target = event.target || event.srcElement;

    if (target.tagName === 'BUTTON') {
        ctiy = target.parentNode.parentNode.getElementsByClassName('ctiy-name')[0].outerText;
        delete aqiData[ctiy];

    };
    renderAqiList();
}



function init() {
    var addBtn,
        delBtn,
        apiTable;

    addBtn = document.getElementById('add-btn');
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent(addBtn, 'click', addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    apiTable = document.getElementById('api-table');
    addEvent(apiTable, 'click', delBtnHandle);
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