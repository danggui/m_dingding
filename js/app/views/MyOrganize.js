define(["View",getViewTemplatePath("MyOrganize"),"UISliderIscroll","MyOrganizeModel"],function(a,b,c,d){return _.inherit(a,{onCreate:function(){this.$el.html(b),this.initSize(),this._initSlider()},events:{},initSize:function(){var a=Math.max($(window).width(),$(window).height());this.$(".g-flex-container").height(a)},_initSlider:function(){if(!this.slider){var a=d.getInstance();a.execute(function(a){this.slider=new c({datamodel:{data:a.data.superior,index:1,itemFn:function(a){return"<div>"+a.department+'</div><div><img src="'+a.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div><div>'+a.ee_name+"</div><div>"+a.po_name+"</div>"}},momentum:!0,displayNum:3,wrapper:this.$(".demo1")}),this.slider.show(),this.slider1=new c({datamodel:{data:a.data.equal,index:1,itemFn:function(a){return"<div>"+a.department+'</div><div><img src="'+a.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div><div>'+a.ee_name+"</div><div>"+a.po_name+"</div>"}},momentum:!0,displayNum:3,wrapper:this.$(".demo2")}),this.slider1.show(),this.slider2=new c({datamodel:{data:a.data.subordinate,index:1,itemFn:function(a){return"<div>"+a.department+'</div><div><img src="'+a.photo+'" style="border: 1px solid rgba(0, 0, 0, 0.08);box-shadow: 0 0 0 2px rgba(0,0,0,0.2); border-radius: 50%;"/></div><div>'+a.ee_name+"</div><div>"+a.po_name+"</div>"}},momentum:!0,displayNum:3,wrapper:this.$(".demo3")}),this.slider2.show()},function(a){},this)}},onPreShow:function(){this.turning()},onShow:function(){},onHide:function(){}})});