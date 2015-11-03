define(['AbstractView', getViewTemplatePath('login'),'UIToast','LoginModel','MyProfileStore','EnvStore','UILoading','LanguageStore','UIArticle','DDloginFromPartnerModel'], function (View, viewhtml,UIToast,LoginModel,MyProfileStore,EnvStore,UILoading,LanguageStore,UIArticle,DDloginFromPartnerModel) {

    //判断访问终端
    var version = '1.0.0';
    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }
    localStorage.setItem("browser",JSON.stringify(browser.versions));
    var evnStore = EnvStore.getInstance();
    var menuModel = LoginModel.getInstance();
    var myProfileStore = MyProfileStore.getInstance();
    var DDloginModel = DDloginFromPartnerModel.getInstance();
    myProfileStore.setAttr('sessionid','');
    var lanStore = LanguageStore.getInstance();
    var lang = "";
    var WebUrlPath = {
        'WEB_URL_DEV':'http://192.168.101.126:8082',//开发环境D#  内网映射：'http://192.168.101.126:8082' 外网：'http://101.230.3.6:8082'
        'WEB_URL_T':'http://58.240.190.198:8142',//测试环境T#  内网映射：'http://192.168.9.230:8090' 外网：'http://58.240.190.198:8142'
        'WEB_URL_D':'http://120.27.43.83:8083',//Demo环境 M#
        'WEB_URL_W':'https://lite.cdpcloud.com',//生产机环境https://lite.cdpcloud.com
        'WEB_LUKE':'http://192.168.102.72:8080'//luke本机

    };
    var client_code = "";
    var workid = "";
    evnStore.setAttr('envUrl','http://58.240.190.198:8142');
    return _.inherit(View, {
        onCreate: function () {
            var scope = this;

            this.els = {
                basicInfo_tpl: this.$el.find("#basic_info_tpl")
            };

            if(browser.versions.android){
                var device = 'android'
            }else{
                var device = 'ios'
            }

            // en_us/zh_cn/zh_tw
            var type=navigator.appName

            if (type=="Netscape"){
                lang = navigator.language.toLowerCase().replace("-","_")
            }
            else{
                lang = navigator.userLanguage.toLowerCase().replace("-","_")
            }


            $.ajax({
                type: 'GET',
                url: './fakedata/'+lang+'.json',
                dataType:'json',
                success: function (data) {
                    lanStore.setAttr('language',data.data);
                    //this.$("#login").append(_.template(this.$("#login-language").html())({'lanStore':lanStore.getAttr('language')}));
                    //get workid & client_code START
                    var params = location.href.split('?')[1].split('&')

                    _.each(params,function(value, key, list){
                        if (value.indexOf('employeeId')==0){
                            workid = value.split('=')[1];
                        }else{
                            client_code = value.split('=')[1];
                        }
                    });

                    //get workid & client_code END
                    scope.$el.html(viewhtml);
                    this.$("#self-service").append(_.template(this.$("#basic_info_tp0").html())({'lanStore':lanStore.getAttr('language')}));

                    // get dingding Login START
                    if (!this.toast1) {
                        this.toast1 = new UIToast({
                            datamodel: {
                                content: 'content'
                            },
                            TIMERRES :  true
                        });
                    }
                    DDloginModel.execute(
                        function(datamodel,data,textStatus,resObj) {
                            //console.log(resObj.getAllResponseHeaders());
                            if(data.status == "0"){
                                this.toast1.showToast(data.message);
                                return false;
                            }else{
                                myProfileStore.setAttr('sessionid',data.data.session_id);
                                myProfileStore.setAttr('myProfileStore',JSON.stringify(data.data));

                                var data =  JSON.parse(myProfileStore.getAttr('myProfileStore'));
                                $("#basic_info_wrap").html(_.template(scope.$el.find("#basic_info_tpl").html())({'basic_infoData':data.menu_info}));

                            }
                        },
                        function(e){
                            console.log(e);
                            //todo with error information
                        },
                        this,
                        function(e){},
                        {'client_code':client_code,
                            'workid':workid
                        }
                    );
                    // get dingding Login END


                },
                error: function (xhr, type) {
                    console.log('Language Ajax error!');
                }
            });
        },

        events: {
            'click #salaryInfo':'view_salary',
            'click #leaveInfo':'view_leaveInfo',
            'click #myInfo':'view_myInfo',
            'click #newsInfo':'view_news',
            'click #policyInfo':'view_policy',
            'click #toDoList':'view_toDoList'
        },
        view_salary: function(){
            this.forward('ViewSalary');
        },
        view_leaveInfo:function(){
            this.forward('MyWork_leaveList');
        },
        view_myInfo: function(){
            this.forward('MyInfo');
        },
        view_news: function(){
            this.forward('News_List');
        },
        view_policy: function(){
            this.forward('PolicyList');
        },
        view_toDoList:function(){
            this.forward('MyWork_todoList');
        },

        jsonpCallback: function(data)
        {
            alert(data.message);
        },

        onPreShow: function () {
            this.turning();
        },

        onShow: function () {

        },

        onHide: function () {

        }
    });
});