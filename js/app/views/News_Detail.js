define(["View",getViewTemplatePath("News_Detail"),"UIScroll","NewsDetailModel","LanguageStore"],function(a,b,c,d,e){var f=e.getInstance(),g=d.getInstance(),h=h||[];location.href.substring(location.href.indexOf("&")+1,location.href.length);return _.inherit(a,{onCreate:function(){this.$el.html(b),$("#newsdetail-title")[0].innerHTML=f.getAttr("language").newsdetail,this.els={newsDetail_tpl:this.$el.find("#newsDetail_tpl")}},events:{"click #self_service":"self_service","click #myinfo":"myinfo","click #fq":"fq"},self_service:function(){this.forward("MyProfile")},myinfo:function(){this.forward("MyInfo")},fq:function(){this.forward("FAQ")},onPreShow:function(){this.$("#scroller").children().remove(),g.execute(function(a,b,c,e){return"0"==b.status?(this.toast1.showToast(b.message),!1):(h.push(d.viewModel(b.data.img?b.data.img:"images/news/news_default_"+f.getAttr("language").languageFlag+".png",b.data.title,b.data.content)),void this.$("#scroller").append(_.template(this.els.newsDetail_tpl.html())({news_Detail_data:h[h.length-1]})))},function(a){0},this,function(a){},{news_id:location.href.substring(location.href.indexOf("&")+1,location.href.length)}),this.turning()},onShow:function(){},onHide:function(){}})});