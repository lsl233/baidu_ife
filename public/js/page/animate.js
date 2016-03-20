/**
 * Created by Administrator on 2016/3/20 0020.
 */
/**
 * »º¶¯Ëã·¨
 * @type {{linear: Function}}
 */
var tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },

    easeIn: function (t, b ,c, d) {
        return c * (t /= d) * t + b;
    }
}

var Animate = function (dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
}

Animate.prototype.start = function (propertName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertName];
    this.propertyName = propertName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];

    var self = this;
    var timeId = setInterval(function () {
        if (self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
};

Animate.prototype.step = function () {
    var t = +new Date;
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }
    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
};

Animate.prototype.update = function (pos) {
    this.dom.style[this.propertyName] = pos + 'px';
}
var div = document.getElementById('circular');
var animate = new Animate(div);
div.onclick = function () {
    animate.start('left', 500, 1000, 'linear');
}
