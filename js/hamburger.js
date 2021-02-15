/**
 * polyfill / forEach
 * @link https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
 */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


// ハンバーガーメニュー設定
function SetHamburger(argObj){

    /******************************
    * define
    ******************************/
    const config = {
        icon: '', // ハンバーガーアイコン
        nav: '', // 開閉するメニュー
        target: '', // icon以外に任意で設定する開閉ボタン
        openClass: 'open', // メニュー開閉時に設定するclass
        width: '', // メニューを利用するmediaquery 横幅
    };
    const $dom = {};
    const Proto = SetHamburger.prototype;

    /******************************
    * function
    ******************************/

    // constructor
    //function constructor(){
    Proto.constructor = function(){
        // config -> 引数上書き
        for(let key in argObj){
            if(!config.hasOwnProperty(key)) continue;
            config[key] = argObj[key];
        }
        getDOM();
        this.setEvent();
    }

    // DOM 定義
    const getDOM = function(){
        $dom.icon = document.querySelector(config.icon);
        $dom.nav = document.querySelector(config.nav);
        // 最低限 icon,nav 要素を取得が必要
        if(!$dom.icon || !$dom.nav) return;
        $dom.targets = [].slice.call(document.querySelectorAll(config.target));
        // nav a -> nav子要素を全取得(1階層のみ)
        $dom.links = [].slice.call(document.querySelectorAll(config.nav + ' *'));
        // openClass を付与する要素を設定
        $dom.openEle = $dom.targets.concat([$dom.icon,$dom.nav]);
        // toggleOpen を設定する要素を設定
        $dom.toggleEle = $dom.links.concat($dom.targets,[$dom.icon]);
    }

    Proto.setEvent = function(){
        $dom.toggleEle.forEach(function(i){
            i.addEventListener('click',this.toggleMenu,false);
        },this);
    }

    // new したobjectでも呼出可能
    Proto.toggleMenu = function(){
        // window viewport と 指定widthを比較
        // =>通常時のメニューとハンバーガーメニューで同じ要素を利用している場合を想定
        if(config.width && config.width<=window.innerWidth) return;
        $dom.openEle.forEach(function(i){
            i.classList.toggle(config.openClass);
        });
    }

    /******************************
    * run
    ******************************/
    this.constructor();
}