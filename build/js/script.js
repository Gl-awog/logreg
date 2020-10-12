function generalPopup(elem,options) {
    this.elem;
    this.closeBtn;
    this.fader;
    this.options = $.extend({
        hideOthers: true
    }, options );

    this.init = function() {
        var _this = this;
        this.elem = $(elem);
        this.fader = $(".fader");
        this.closeBtn = this.elem.find(".js-popup-close");
        this.elem.data('glpopup', this);
        this.fader = $(".fader").length ? $(".fader") : $('<div class="fader"></div>').prependTo("body");

        this.closeBtn.on("click", function() {
            _this.hide();
            return false;
        });

        $(document).keyup(function(e) {          
            if (e.key === "Escape") {
                _this.hide();
            }
        });
    }
    this.show = function() {
        if (this.elem.is(":hidden")) {
            if (this.options.hideOthers) this.hideOthers();
            this.elem.show();
            $("body").addClass("popup-open");
            if (this.fader.is(":hidden")) this.fader.show();
        }
    }
    this.hideOthers = function() {
        $(".popup").not(this.elem).each(function() {
            var instance = $(this).data("glpopup");
            if (instance) instance.hide();
        });
    }
    this.hide = function() {
        if (!this.elem.is(":hidden")) {
            this.elem.hide();
            this.fader.hide();
            $("body").removeClass("popup-open");
        }
    }
    this.init();
}



$(document).ready(function() {

    $(".popup").each(function() {
        new generalPopup(this);
    });

    $(".js-glpopup-open").on("click", function() {
        var $popup = $($(this).data("targetpopup"));
       
        if ($popup.length) {
            $popup.data('glpopup').show();
        }
        return false;
    })
})