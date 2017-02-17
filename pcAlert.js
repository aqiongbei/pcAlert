// author:qiongbei
// github:https://github.com/aqiongbei
// personPage:http://aqiongbei.top

function PcAlert(options) {
    this.dBody = document.body;
    this.QRCodeUrl = window.location.href;
    this.defalutOptions = {
        pcAlertTitle: 'Yeah！有人来看我的DEMO了！',
        pcAlertPartOne: '这是一份移动端DEMO哦~',
        pcAlertPartTwo: '在手机上看效果才好呢！',
        pcAlertPartThree: '赶紧掏出微信扫描二维码吧！',
        pcAlertBtnLeft: '好哒，这就去扫',
        pcAlertBtnRight: '破事多，不看了',
        pcAlertBtnLeftClick: '谢谢！你真是个好人！',
        pcAlertBtnRightClick: '你确定不扫一下吗？恩！？'
    };
    for (key in options) {
        this.defalutOptions[key] = options[key];
    }
    this.init();
}
PcAlert.prototype = {
    constructor: PcAlert,
    init: function() {
        if (this.isPC()) {
            this.pcAlertBox();
        }
    },
    // PC端弹窗提示
    pcAlertBox: function() {
        var pcAlertstr = '<div class="pcAlertBoxHeader"><h3>' + this.defalutOptions.pcAlertTitle + '</h3></div><div class="pcAlertBoxContent"><div id="QRCodeImgWrap" class="QRCodeImgWrap" alt=""></div><p>' + this.defalutOptions.pcAlertPartOne + '</p><p>' + this.defalutOptions.pcAlertPartTwo + '</p><p>' + this.defalutOptions.pcAlertPartThree + '</p></div><div class="pcAlertBoxFooter"><span class="pcAlertBoxFooterLeft">' + this.defalutOptions.pcAlertBtnLeft + '</span><span class="pcAlertBoxFooterRight">' + this.defalutOptions.pcAlertBtnRight + '</span></div>';
        document.body.innerHTML = '';
        var pcAlert = document.createElement('div');
        var mask = document.createElement('div');
        mask.className = 'mask';
        pcAlert.className = 'pcAlertBoxWrap comeIn';
        pcAlert.innerHTML = pcAlertstr;
        this.dBody.appendChild(mask);
        this.dBody.appendChild(pcAlert);
        this.getQRCode("#QRCodeImgWrap", this.QRCodeUrl);
        var yesBtn = document.querySelector('.pcAlertBoxFooterLeft');
        var noBtn = document.querySelector('.pcAlertBoxFooterRight');
        var _this = this;
        yesBtn.onclick = function() {
            noBtn.className = 'pcAlertBoxFooterRight toRightSmall';
            yesBtn.className = 'pcAlertBoxFooterLeft toRightBig';
            noBtn.innerHTML = '';
            yesBtn.innerHTML = _this.defalutOptions.pcAlertBtnLeftClick;
            yesBtn.onclick = null;
        }
        noBtn.onclick = function() {
            yesBtn.className = 'toLeftSmall';
            noBtn.className = 'toLeftBig';
            yesBtn.innerHTML = '';
            noBtn.innerHTML = _this.defalutOptions.pcAlertBtnRightClick;
            noBtn.onclick = null;
        }
    },
    getQRCode: function(id, url) {
        var qrcode = new QRCode(document.querySelector(id), {
            width: 250,
            height: 250
        });
        qrcode.makeCode(url);
    },
    // 判断是否是PC端
    isPC: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
};
