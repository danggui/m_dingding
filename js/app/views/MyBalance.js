define(["View",getViewTemplatePath("MyBalance"),"MyBalanceModel","UIGroupList","UIRadioList","UIGroupSelect"],function(a,b,c,d,e,f){return _.inherit(a,{onCreate:function(){var a=this;this.$el.html(b),this.els={remain_leaves_tpl:this.$el.find("#remain_leaves_tpl")};var e=c.getInstance();e.execute(function(b){var e=[];_.each(b.data.unclose_leaves,function(a,b,d){e.push(c.viewMenuInfoModel("MyBalance_detail",a.name,a.apply_time+"&nbsp;"+a.state_name,[],"","",!0))});var f=[];_.each(b.data.finish_leaves,function(a,b,d){f.push(c.viewMenuInfoModel("MyBalance_detail",a.name,a.span,[],"","",!0))}),this.$("#remain_leaves_wrap").html(_.template(this.els.remain_leaves_tpl.html())({remain_leaves_data:b.data.remain_leaves})),this.grouplist1=new d({datamodel:{data:e},onGroupClick:function(b,c,d){a.forward(this.datamodel.data[b].gname)},wrapper:this.$(".wrapper_unclose_leaves")}),this.grouplist1.show(),this.grouplist2=new d({datamodel:{data:f},onGroupClick:function(b,c,d){a.forward(this.datamodel.data[b].gname)},wrapper:this.$(".wrapper_finish_leaves")}),this.grouplist2.show()},function(a){},this)},events:{"click #selectMonth":"selectMonth_fun","click #apply_leave":function(){this.forward("MyBalance_apply")}},selectMonth_fun:function(){for(var a=[],b=[],c=[],d=2e3;2014>=d;d++){var g={id:"y_"+d,name:d+"年"};a.push(g)}for(var d=1;12>=d;d++){var g={id:"m_"+d,name:d+"月"};b.push(g)}for(var d=1;31>=d;d++){var g={id:"d_"+d,name:d+"日"};c.push(g)}if(this.groupSelect2||(this.groupSelect2=new f({datamodel:{title:"日期选择",btns:[{name:"取消",className:"pop-box-btns-cancel"},{name:"确定",className:"pop-box-btns-ok"}]},data:[a,b,c],changedArr:[function(a){for(var b=this.scrollArr[2],c=parseInt(a.name),d=parseInt(this.scrollArr[1].getSelected().name),e=_.dateUtil.getDaysOfMonth(c,d),f=31;f>28;f--)b.datamodel.data[f-1].disabled=!1,f>e&&(b.datamodel.data[f-1].disabled=!0);this.scrollArr[2].reload(),0},function(a){for(var b=this.scrollArr[2],c=parseInt(a.name),d=parseInt(this.scrollArr[0].getSelected().name),e=_.dateUtil.getDaysOfMonth(d,c),f=31;f>28;f--)b.datamodel.data[f-1].disabled=!1,f>e&&(b.datamodel.data[f-1].disabled=!0);this.scrollArr[2].reload(),0},function(a){0}],onOkAction:function(a){0,this.hide()},onCancelAction:function(a){0,this.hide()}})),!this.selectMonth_radio){var h=[{id:"上月"},{id:"本月"},{id:"今年"},{id:"其他"}],i=this;this.selectMonth_radio=new e({datamodel:{title:"请选择时间",data:h},displayNum:4,selectId:"本月",index:4,onClick:function(a,b){i.$("#title_month").text(b.id),"其他"==b.id?i.groupSelect2.show():i.groupSelect2.hide(),this.hide()}})}this.selectMonth_radio.show()},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});