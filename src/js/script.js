var modalLogReg = (function() {

    var myModal = {
        modalLogin: null,
        contents: null,
        defaultContentClass: "modal-content--logreg-login",
        modalOptions: {
            "backdrop": true,
            "keyboard": true
        },

        init: function() {
            this.modalLogin = jQuery("#modalLogReg");
            this.contents = this.modalLogin.find(".modal-content");
        },

        bindEvents: function() {
            var _this = this;
            if (!this.modalLogin) this.init();

            var body = jQuery('body');

            body.on("click", ".js-modal-logreg-login", function() {
                _this.open("modal-content--logreg-login");
                return false;
            });

            body.on("click", ".js-modal-logreg-reg", function() {
                _this.open("modal-content--logreg-reg");
                return false;
            });

            body.on("click", ".js-modal-logreg-forgot", function() {
                _this.open("modal-content--logreg-forgot");
                return false;
            });

            jQuery(document).on('tyreplus.successmessage', function(event, str) {
                var $modal = jQuery("#success-message-modal");
                $modal.find('.js-success-message-content').html(str);

                _this.open("modal-content--logreg-success");
            });

            jQuery(document).ready(function(event) {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const showLogin = urlParams.get('show_login')
                if (showLogin) {
                    _this.open("modal-content--logreg-login");
                    return false;
                }
            });
        },

        open: function(contentClass) {
            if (!this.modalLogin) this.init();
            closeOtherModals(this.modalLogin);
            if (this.modalLogin.data('bs.modal') && this.modalLogin.data('bs.modal')._isShown) {
                this.modalLogin.modal('handleUpdate');
            } else {
                this.modalLogin.modal(this.modalOptions);
            }
            this.contents.hide();
            if (contentClass === undefined) {
                contentClass = this.defaultContentClass;
            }
            this.modalLogin.find("." + contentClass).fadeIn();
        },

        hide: function() {
            this.modalLogin.modal("hide");
        }
    };

    return myModal;
})();

function generalPopup(elem) {
    this.elem;
    var closeBtn;
    this.fader;
    this.options = {
        hideOthers: true
    };

    this.init = function() {
        var self = this;
        self.elem = $(elem);
        self.fader = $(".fader");
        closeBtn = self.elem.find(".js-popup-close");
        this.elem.data('glpopup', this);
        this.fader = $(".fader").length ? $(".fader") : $('<div class="fader"></div>').prependTo("body");

        closeBtn.on("click", function() {
            self.hide();
            return false;
        })
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
        $(".pop-up").not(this.elem).each(function() {
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
    modalLogReg.bindEvents();

    $(".reg-pop-up").add(".pop-up--flex").each(function() {
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