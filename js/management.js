/******************************
* define
*******************************/

// session保存クラス 必要に応じて初期化
class Session {
    constructor(){
        this.postData= {};
        this.postError= {};
    }
}
let session = new Session();

// DOM変更の影響を受けずに複数個所で利用できる不変のDOMを格納
const $dom = {
    ajaxText: document.querySelector('.mng-content__ajaxText'),
    modal: document.querySelector('.mng-modal'),
    modalContent: document.querySelector('.mng-modal__content'),
    modalConfirm: document.querySelector('.mng-modal__confirm'),
    modalMenu: document.querySelector('.mng-modal__menu'),
};

// ajax通信後に格納するオブジェクト
const ajaxData = {
    authority: '', // 管理権限
    name: '', // ログイン者名
    userData: '', // 受信データ格納
};

/******************************
* functions => common
*******************************/

// html escape
const htmlspecialchars = (str)=>{
    return (str + '').replace(/&/g,'&amp;')
                     .replace(/"/g,'&quot;')
                     .replace(/'/g,'&#039;')
                     .replace(/</g,'&lt;')
                     .replace(/>/g,'&gt;'); 
}


// url function
const urlFn ={
    getRoot(){
        return location.protocol +'//'+ location.host + '/createMVC/'; // http://localhost/createMVC/
    },
    logout(time=0){
        const root = this.getRoot();
        setTimeout(()=>{
            location.replace(root+'logout');
        },time);
    }
};


// session check
const sessionFn = {
    postDataValue(item){
        if(!session.postData[item]) return '';
        return 'value="' + session.postData[item] + '"';
    },
    postDataSelect(item,name){
        if(!session.postData[item] && name==='user') return 'selected';
        if(session.postData[item]===name) return 'selected';
        return '';
    },
    postError(item){
        if(!session.postError[item]) return '';
        return session.postError[item];
    },
    isBlank(item){
        if(!session.postData[item]) return 'Blank item...';
        return session.postData[item];
    }
};

// table display
const tableFn = {
    // tableに並べる順番を配列で格納して定義
    columnSort: [
        'id','authority','name','email','tel','address','operation'
    ],
    // 受信データ表示thead
    head(){
        const $thead = document.querySelector('thead');
        const createTh = ()=>{
            let ele = '';
            this.columnSort.forEach(col=>{
                ele += `<th>${col}</th>`;
            });
            return ele;
        };
        $thead.innerHTML = `
            <tr>
                <th><label class="checkLabel checkAll"><input type="checkbox"></label></th>
                ${createTh()}
            </tr>
        `;
    },
    // 受信データ表示tbody
    body(){
        if(!ajaxData.userData.length) return;
        const $tbody = document.querySelector('tbody');
        $tbody.innerHTML = ''; // tbody reset
        const createTd = (data)=>{
            let ele = '';
            this.columnSort.forEach(col=>{
                if(!data[col]) return;
                ele += `<td>${data[col]}</td>`;
            })    
            return ele;
        };
        ajaxData.userData.forEach(data=>{
            $tbody.innerHTML += `
                <tr>
                    <td><label class="checkLabel checkSingle"><input type="checkbox" data="${data['id']}"></label></td>
                    ${createTd(data)}
                    <td><span class="editBtn" data="${data['id']}">edit</span></td>
                </tr>
            `;
        });
        setEvent.again(); // DOM操作後にEvent再セット
    },
};


/******************************
* functions => ajax
*******************************/

const ajaxFn = {

    /******************************
    * ajax => common
    *******************************/
    nowAjax(){
        $dom.ajaxText.classList.add('nowAjax');
        $dom.ajaxText.innerHTML = 'Connecting...';
    },
    endAjax(){
        $dom.ajaxText.classList.remove('nowAjax');
        $dom.ajaxText.innerHTML = '';
    },
    reset(){
        // チェックボックス解除
        const $checkboxes = document.querySelectorAll('.checkLabel input');
        $checkboxes.forEach($item=>{
            $item.checked = false;
        });
        // endAjax
        this.endAjax();
        // セッション初期化
        session = new Session();
    },

    /******************************
    * ajax => callFn
    *******************************/

    // ログイン情報取得
    getLoginUser(res){
        ajaxData.authority = res.authority;
        ajaxData.name = res.name;
    },
    // 初回全データ取得
    firstLoadData(res){
        ajaxData.userData = res; // 受信データ格納
        tableFn.head(); // th作成
        tableFn.body(); // td作成
        setEvent.initial(); // Event 初期設定
    },
    // update
    updateUserData(res,obj){
        modalFn.notice(obj);
        ajaxData.userData = res; // 受信データ更新
        tableFn.body();
        const getuser = new GetUser(); // ログイン情報更新
    },

    /******************************
    * ajax => run
    *******************************/

    run(ajax,after,data=false){
        this.nowAjax();
        const param = {};
        if(ajax.type==='POST'){
            param.method=ajax.type;
            if(ajax.form){ // form data
                param.body = new FormData(document.forms[ajax.form]);
            }else{ // any data
                param.body = 'data='+JSON.stringify(data);
                param.headers= {
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
            }
        }
        fetch(ajax.url, param)
            .then(res=>{return res.json()})
            .then(json=>{this.resCheck(json,after)});
    },

    // from fetch response
    resCheck(res,after){
        const resText = res.exception;
        if(resText){
            if(res.notfound) urlFn.logout(5500); // 5s + transition0.5s
            modalFn.notice({text:resText}); // resText 表示
        }else{
            this[after.callFn](res,after); // ajaxFn 任意function
        }
        this.reset();
    },
};


/******************************
* functions => set
*******************************/

const setEvent = {
    // event 設定
    // array({query:nodelist or query, event:click etc..., fn:function, boolean,false or true})
    // query => nodelist か query文をそのまま指定可能
    // boolean 省略可能 => 初期値false
    run(array){
        array.forEach(item=>{
            // string => querySelector
            if(typeof(item.query)==='string') item.query = document.querySelectorAll(item.query);
            if(!item.boolean) item.boolean = false;
            // nodelist
            if(0<=item.query.length){
                item.query.forEach(ele=>{
                    ele.addEventListener(item.event,item.fn,item.boolean);
                });
            }
            // node
            else{
                item.query.addEventListener(item.event,item.fn,item.boolean);
            }
        });
    },
    // イベント初期設定
    initial(){
        const array = [
            {query:'.newBtn',event:'click',fn:newBtn.input},
            {query:'.deleteBtn',event:'click',fn:deleteBtn.input},
            {query:'.mng-modal__toggle',event:'click',fn:modalFn.toggle},
            {query:'.checkAll',event:'click',fn:allCheckToggle},
        ];
        this.run(array);
    },
    // イベント再設定
    again(){
        const array = [
            {query:'.editBtn',event:'click',fn:editBtn.input},
        ];
        this.run(array);
    }
};


/******************************
* functions => template
*******************************/

const commonBtnTmp = {
    close(obj){
        $dom.modalConfirm.innerHTML = `<p class="mng-modal__attention">${obj.text}</p>`;
        $dom.modalMenu.innerHTML = `<span class="mng-modal__select mng-modal__agree" onclick="modalFn.toggle()">OK</span>`;
    },
};

class FormTemp{
    constructor(obj){
        this.items=obj.items;
        this.required=obj.required;
    };   
    isRequiredClass=item=>{
        if(this.required.includes(item)) return `<span class="required">*</span>`;
        return ``;
    };
    isRequiredAttr=item=>{
        if(this.required.includes(item)) return `required`;
        return ``;
    };
    ddInner=item=>{
        switch(item){
            case 'authority':
                return `
                    <select id="sqlForm__${item}" class="common-form__select" name="${item}" ${this.isRequiredAttr(item)}>
                        <option value="admin" ${sessionFn.postDataSelect('authority','admin')}>admin</option>
                        <option value="user" ${sessionFn.postDataSelect('authority','user')}>user</option>
                    </select>
                `;
            default:
                return `<input id="sqlForm__${item}" class="common-form__input" type="text" name="${item}" ${this.isRequiredAttr(item)} ${sessionFn.postDataValue(item)}>`;
        }
    };
    input=obj=>{
        let html = '';
        html +=`
            <p class="sqlHeader">${obj.title}</p>
            <p><span class="required">*</span> is Input Required</p>
            <form id="sqlForm" class="sqlForm">
        `;
        this.items.forEach(item=>{
            html += `
                <dl class="sqlForm__item common-form__item">
                    <dt><label for="sqlForm__${item}">${item}${this.isRequiredClass(item)}</label></dt>
                    <dd>${this.ddInner(item)}</dd>
                    <span class="postError">${sessionFn.postError(item)}</span>
                </dl>
            `;
        });
        html += `
                <div class="sqlForm__item common-form__item">
                    <input class="sqlForm__submit common-form__input common-form__submit" type="button" name="submit" value="OK" onclick="${obj.btn}.check()">
                </div>
            </form>
        `;
        $dom.modalConfirm.innerHTML = html;
    };
    confirm=obj=>{
        let html = '';
        html +=`
            <p class="sqlHeader">${obj.title}</p>
            <form id="sqlForm" class="sqlForm">
                <div><input type="hidden" name="id" ${sessionFn.postDataValue('id')}></div>
        `;
        this.items.forEach(item=>{
            html += `
                <dl class="sqlForm__item common-form__item">
                    <dt><label for="sqlForm__${item}">${item}</label></dt>
                    <dd>
                        <input id="sqlForm__${item}" class="common-form__input" type="hidden" name="${item}" ${sessionFn.postDataValue(item)}>
                        <span>${sessionFn.isBlank(item)}</span>
                    </dd>
                </dl>
                `;
        });
        html += `</form>`;
        $dom.modalConfirm.innerHTML = html;
        $dom.modalMenu.innerHTML = `
            <span class="mng-modal__select mng-modal__back" onclick="${obj.btn}.toInput()">BACK</span>
            <span class="mng-modal__select mng-modal__agree" onclick="${obj.btn}.run()">OK</span>
        `;
    };
}
const manageForm = new FormTemp({
    items: ['authority','name','email','password','tel','address'], // use items
    required: ['authority','name','email','password'], // required items
});

/******************************
* functions => event
*******************************/

const allCheckToggle = (e)=>{
    const $checkboxes = document.querySelectorAll('.checkSingle input');
    if(e.target.checked){
        $checkboxes.forEach($item=>{
            $item.checked = 'checked';
        });
    }else{
        $checkboxes.forEach($item=>{
            $item.checked = false;
        });
    }
};

/******************************
* class modal
*******************************/

// modal functions
class ModalFnBase{
    constructor(){
        this.timer = true; // for Multiple clicks
    }
    reset=()=>{
        $dom.modalConfirm.innerHTML = '';
        $dom.modalMenu.innerHTML = '';
    }
    toggle=()=>{
        if(!this.timer) return;
        $dom.modal.classList.toggle('active');
        $dom.modalContent.classList.toggle('active');
        this.timer = false;
        setTimeout(()=>{
            this.timer = true;
        },500);
    }
    changing=()=>{
        $dom.modalContent.classList.toggle('changing');
    }
    change=(fn,tempInfo)=>{
        this.changing();
        this.reset();
        setTimeout(()=>{
            fn(tempInfo);
            this.changing();
        },500);
    }
    notice=(obj)=>{
        setTimeout(()=>{
            commonBtnTmp.close(obj);
            this.toggle();
        },500);
    }
}
const modalFn = new ModalFnBase();


class OperationFlow extends ModalFnBase{
    constructor(){
        super();
        this.ajax={
            type:'POST',
            url:'',
            boolean:'true',
            form:'',
        };
        this.after={
            callFn:'updateUserData',
            text:'',
        };
    }
    input=(e)=>{
        this.reset();
        this.inputFn(e);
        this.toggle();
    }
    check=()=>{
        if(this.inputCheck()){this.toConfirm()}
        else{this.toInput()}
    }
    run=()=>{
        this.toggle();
        this.runFn();
    }
    toConfirm=()=>{
        this.change(manageForm.confirm,this.tempConfirm);
    }
    toInput=()=>{
        this.change(manageForm.input,this.tempInput);
    }
    inputCheck=()=>{
        const array = ['authority','name','email','password','tel','address'];
        array.forEach(item=>{
            const input = document.forms.sqlForm[item];
            session.postData[item] = htmlspecialchars(input.value); // sanitize
            // required check
            if(input.value==='' && input.hasAttribute('required')){session.postError[item] = 'Please fill in'}
            else{delete session.postError[item]} // for first error
        });
        // email check
        const result = session.postData.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if(!result && !session.postError.email) session.postError.email = 'Something wrong with your email address';
        // postErrorがなければtrueを返す
        if(!Object.keys(session.postError).length) return true;
    }
}


class NewBtn extends OperationFlow{
    constructor(){
        super();
        this.ajax.url='sqlinsert';
        this.ajax.form='sqlForm';
        this.after.text='Creation completed';
        this.btn='newBtn';
        this.tempInput={
            title:'Create New Data',
            btn:this.btn,
        };
        this.tempConfirm={
            title:'Create below',
            btn:this.btn,
        };
    };
    inputFn=()=>{
        manageForm.input(this.tempInput);
    };
    runFn=()=>{
        ajaxFn.run(this.ajax,this.after,'form');
    };
}
const newBtn = new NewBtn();


class EditBtn extends OperationFlow{
    constructor(){
        super();
        this.ajax.url='sqlupdate';
        this.ajax.form='sqlForm';
        this.after.text='Editing completed';
        this.btn='editBtn';
        this.tempInput={
            title:'Edit Data',
            btn:this.btn,
        };
        this.tempConfirm={
            title:'Edit below',
            btn:this.btn,
        };
    };
    inputFn=(e)=>{
        let dataId;
        if(e.target.hasAttribute('data')){
            dataId = e.target.getAttribute('data'); // userdata[id] に該当する数字をdata属性から取得して格納
        }else{
            const $checked = document.querySelectorAll('.checkSingle input:checked');
            if($checked.length!==1){ // 1でない場合
                commonBtnTmp.close({text:'Please select only one'});
                this.toggle();
                return;
            }            
            dataId = $checked[0].getAttribute('data'); // 1つ目のdataを取得
        }
        // セッション初期化
        session = new Session();
        // dataId に該当する既存のajaxDataから検索してセッションへ格納
        session.postData = ajaxData.userData.find(item=>item.id===dataId);
        // password はajaxで入手していない上にハッシュ化されているため表示されません
        // 変更したいなら記入するよう促す文を挿入
        session.postData.password = 'NotChange';
        session.postError.password = 'Please fill in if you want to change';
        manageForm.input(this.tempInput);
    }
    runFn=()=>{
        ajaxFn.run(this.ajax,this.after,'form');
    }
}
const editBtn = new EditBtn();


class DeleteBtn extends OperationFlow{
    constructor(){
        super();
        this.ajax.url='sqldelete';
        this.after.text='Deletion completed';
        this.checkId=[];
    };
    inputFn=()=>{
        // checked 取得
        const $checked = document.querySelectorAll('.checkSingle input:checked');
        if(!$checked.length){
            commonBtnTmp.close({text:'Please check items'});
        }else{
            // data属性に設定されたSQL対応のidを取得
            this.checkId = Array.from($checked).map(item=>item.getAttribute('data'));

            const output=()=>{
                const length = this.checkId.length;
                let text = '';
                this.checkId.forEach(function(item,index){
                    text += 'ID:' + item;
                    if(length!==index+1) text += `, `; // 半角スペース
                });
                return text;
            };

            // 削除確認文
            $dom.modalConfirm.innerHTML = `
                <p class="mng-modal__warning"><span class="mng-modal__delete">Delete</span> the following...</p>
                <p>[ ${output()} ]</p>
                <p>Are you absolutely sure?</p>
            `; // 半角スペース
            $dom.modalMenu.innerHTML = '<span class="mng-modal__select mng-modal__agree" onclick="deleteBtn.run()">OK</span>';
        }
    };
    runFn=()=>{
        ajaxFn.run(this.ajax,this.after,this.checkId);
    };
    output=()=>{
        const length = this.checkId.length;
        let text = '';
        this.checkId.forEach(function(item,index){
            text += 'ID:' + item;
            if(length!==index+1) text += `, `; // 半角スペース
        });
        return text;
    };
}
const deleteBtn = new DeleteBtn();


/******************************
* class Get
*******************************/

class CommonGet{
    constructor(obj){
        this.ajax={
            type:'GET',
            url:obj.url,
            boolean:'true',
        };
        this.after={
            callFn:obj.callFn,
        }
        this.run();
    }
    run(){
        ajaxFn.run(this.ajax,this.after);
    }
}

class GetUser extends CommonGet{
    constructor(){
        super({
            url:'getsession?get=info',
            callFn:'getLoginUser',
        });
    }
}

class GetData extends CommonGet{
    constructor(){
        super({
            url:'sqlselect?get=all',
            callFn:'firstLoadData',
        });
    }
}


/******************************
* run first time
*******************************/
const firstTime=()=>{
    const getuser = new GetUser();
    const getdata = new GetData();
};
firstTime();


/******************************
* run -> Read file Functions
*******************************/

// HamburgerMenu
const hamburger = new SetHamburger({
    icon: '.hamburger__icon',
    nav: '.hamburger__nav',
    target: '.hamburger__bg',
    openClass: 'active',
    width: 640,
});
