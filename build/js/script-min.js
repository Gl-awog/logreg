function generalPopup(e,i){this.elem,this.closeBtn,this.fader,this.options=$.extend({hideOthers:!0},i),this.init=function(){var i=this;this.elem=$(e),this.fader=$(".fader"),this.closeBtn=this.elem.find(".js-popup-close"),this.elem.data("glpopup",this),this.fader=$(".fader").length?$(".fader"):$('<div class="fader"></div>').prependTo("body"),this.closeBtn.on("click",function(){return i.hide(),!1}),$(document).keyup(function(e){"Escape"===e.key&&i.hide()})},this.show=function(){this.elem.is(":hidden")&&(this.options.hideOthers&&this.hideOthers(),this.elem.show(),$("body").addClass("popup-open"),this.fader.is(":hidden")&&this.fader.show())},this.hideOthers=function(){$(".popup").not(this.elem).each(function(){var e=$(this).data("glpopup");e&&e.hide()})},this.hide=function(){this.elem.is(":hidden")||(this.elem.hide(),this.fader.hide(),$("body").removeClass("popup-open"))},this.init()}$(document).ready(function(){$(".popup").each(function(){new generalPopup(this)}),$(".js-glpopup-open").on("click",function(){var e=$($(this).data("targetpopup"));return e.length&&e.data("glpopup").show(),!1})});