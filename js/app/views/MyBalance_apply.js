define(["View",getViewTemplatePath("MyBalance_apply"),"MyBalanceApplyModel","UIRadioList","UIGroupSelect"],function(a,b,c,d,e){var f=c.getInstance();return _.inherit(a,{onCreate:function(){this.$el.html(b)},events:{"focus input,textarea":"headerFocus","blur input,textarea":"headerBlur","click #selectLeaveType":"selectLeaveType","click #selectStartDate":"selectMonth_Time","click #selectEndDate":"selectMonth_Time"},headerFocus:function(){$("header").css("position","static")},headerBlur:function(){$("header").css("position","fixed")},selectMonth_Time:function(a){var b,c,d,f,g,h=[],i=[],j=[],k=[],l=[],m=this;if(this.targetinput=$(a.currentTarget).find('input[type="text"]'),!this.groupSelectS){var n=new Date;b=14,c=n.getMonth(),d=n.getDate()-1,f=n.getHours()-1,g=n.getMinutes()-1;for(var o=n.getFullYear()-14;o<=n.getFullYear();o++){var p={id:o,name:o+"年"};h.push(p)}for(var o=1;12>=o;o++){var p={id:(10>o?"0":"")+o,name:o+"月"};i.push(p)}for(var o=1;31>=o;o++){var p={id:(10>o?"0":"")+o,name:o+"日"};j.push(p)}for(var o=1;24>=o;o++){var p={id:(10>o?"0":"")+o,name:o+"时"};k.push(p)}for(var o=1;60>=o;o++){var p={id:(10>o?"0":"")+o,name:o+"分"};l.push(p)}this.groupSelectS=new e({datamodel:{title:"时间选择",btns:[{name:"取消",className:"pop-box-btns-cancel"},{name:"确定",className:"pop-box-btns-ok"}]},data:[h,i,j,k,l],indexArr:[b,c,d,f,g],changedArr:[function(a){for(var b=this.scrollArr[2],c=parseInt(a.name),d=parseInt(this.scrollArr[1].getSelected().name),e=_.dateUtil.getDaysOfMonth(c,d),f=31;f>28;f--)b.datamodel.data[f-1].disabled=!1,f>e&&(b.datamodel.data[f-1].disabled=!0);this.scrollArr[2].reload(),this.scrollArr[3].reload(),this.scrollArr[4].reload(),this.indexArr[0]=parseInt(a.name)-parseInt(this.scrollArr[0].datamodel.data[0].name),0},function(a){for(var b=this.scrollArr[2],c=parseInt(a.name),d=parseInt(this.scrollArr[0].getSelected().name),e=_.dateUtil.getDaysOfMonth(d,c),f=31;f>28;f--)b.datamodel.data[f-1].disabled=!1,f>e&&(b.datamodel.data[f-1].disabled=!0);this.scrollArr[2].reload(),this.scrollArr[3].reload(),this.scrollArr[4].reload(),this.indexArr[1]=parseInt(a.name)-1,0},function(a){this.indexArr[2]=parseInt(a.name)-1,0},function(a){this.indexArr[3]=parseInt(a.name)-1},function(a){this.indexArr[4]=parseInt(a.name)-1}],onOkAction:function(a){m.targetinput.val(a[0].id+"-"+a[1].id+"-"+a[2].id+" "+a[3].id+":"+a[4].id),this.hide()},onCancelAction:function(a){0,this.hide()}})}this.groupSelectS.show()},selectLeaveType:function(){f.execute(function(a){if(!this.selectType_radio){var b=[],c=this;_.each(a.data,function(a,c,d){b.push({id:a.leave_type,name:a.leave_name})}),this.selectType_radio=new d({datamodel:{title:"选择假期类型",data:b},displayNum:5,selectId:4,index:4,onClick:function(a,b){c.$("#leave_type").text(b.name),this.hide()}})}this.selectType_radio.show()},function(a){},this)},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){this.headerBlur(),this.selectType_radio&&this.selectType_radio.hide()}})});