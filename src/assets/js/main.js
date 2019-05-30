/*

new SceneScrollControl({
    scene: 'body',
    tracking: 'body'
})

*/

class SceneScrollControl {
    constructor(config) {

        this.scene      = $(config.scene)
        this.tracking   = $(config.tracking)
        this.saveState  = null
        this.flag       = false

        this.callHandler()
    }

    callHandler() {

        this.tracking.on('sceneScrollOff', () => {
            this.scrollSceneOff()
        })

        this.tracking.on('sceneScrollOn', () => {
            this.scrollSceneOn()
        })
    }

    scrollSceneOff() {

        if (!this.flag) {

            this.flag = !this.flag
            this.saveState = this.scene.css('overflow-y')
            this.scene.css('overflow-y', 'hidden')
        }
    }

    scrollSceneOn() {

        if (this.flag) {

            this.flag = !this.flag
            this.scene.css('overflow-y', this.saveState)
            this.saveState = null
        }
    }
}
/*

new ScrollToBlock({
    trigger: '[data-scroll-to-block-trigger]',
    anchor: '[data-scroll-to-block-anchor]',
    offset: $(window).height() / 2
})

*/
class ScrollToBlock{
	constructor(config){

		this.trigger 	= $(config.trigger)
		this.anchor 	= $(config.anchor)
		this.offset 	= config.offset || 0
		this.speed 		= config.speed || 600
		this.place 		= $('html')

		this.callHandler()
	}

	callHandler() {

		this.trigger.on('click', () => {

			event.preventDefault()
			this.scroll()
		})
	}

	scroll() {

		this.place.animate({

			scrollTop: this.calcPosition(this)
		}, this.speed)
	}

	calcPosition() {

		let anchorOffsetTop = this.anchor.eq(0).offset().top
		let calc			= anchorOffsetTop - this.offset		
		return calc
	}
}
/*   

new ItemTracking({
    trigger: '[data-tracking-postition-trigger]',
    offset: $(window).height() * 0.2,
    eventName: 'testEvent',
    callBack: function () {
        console.log('callBack')
    }
})

*/

class ItemTracking{
    constructor(config) {

        this.trigger = $(config.trigger)
        this.callBack = config.callBack
        this.offset = parseInt(config.offset, 10) || 0
        this.place =  $(document)
		this.eventName = config.eventName || 'tracking-position-event'
        this.eventPlace = $('body')

        this.window = $(window)
        this.flagEvent = false

        this.handlerScroll()
    }

    visibilityAction() {

        this.callBack()
        this.customEvent()
    }

    customEvent() {

        if (this.eventName && !this.flagEvent) {

            this.flagEvent = !this.flagEvent
            this.eventPlace.trigger(this.eventName)
        }
    }

    handlerScroll() {
        
        this.place.on('scroll', () => {
            
            if (this.calcPosition() <= 0) {

                this.visibilityAction() 
            }
            
        })
    }

    calcPosition() {

        let calc = this.trigger.eq(0).offset().top - this.place.scrollTop() - this.window.height() + this.offset
        return Math.round(calc)
    }
}

/* static hahahahah*/ let __counterAlert = 0;
class TOT_alert {
    constructor(config) {
        this.type = config.type // (string) success, dander, info
        this.title = config.title // (string) html
        this.body = config.body // (string) html
        this.place = config.place // jQuery.object
        this.icon = config.icon // (string) html

        this.onInsert = config.onInsert || (() => { })

        this.createAlert(this.onInsert)
    }
    createAlert(callback) {
        let template = ''

        if (this.body === undefined) {
            template =
                `<div class="b-alert b-alert_${this.type}" data-alert="${__counterAlert}">
                    <div class="b-alert__header">
                       ${this.icon != undefined ? this.icon : '<div class="b-alert__icon ' + this.getIcon() + '"></div>'} 
                        <div class="b-alert__title">${this.title}</div>
                        <div class="b-alert__close pe-7s-close-circle" data-alert-close="${__counterAlert}"></div>
                    </div>
                </div>`
        } else {
            template =
                `<div class="b-alert b-alert_${this.type}" data-alert="${__counterAlert}">
                    <div class="b-alert__header">
                    ${this.icon != undefined ? this.icon : '<div class="b-alert__icon ' + this.getIcon() + '"></div>'} 
                        <div class="b-alert__title">${this.title}</div>
                        <div class="b-alert__close pe-7s-close-circle" data-alert-close="${__counterAlert}"></div>
                    </div>
                    <div class="b-alert__body">
                        ${this.body}
                    </div>
                </div>`
        }

        __counterAlert++
        this.place.append(template)

        callback()
    }

    getIcon() {
        if (this.type === 'success') {
            return ' pe-7s-bell'
        } else if (this.type === 'danger') {
            return ' pe-7s-attention'
        } else if (this.type === 'info') {
            return ' pe-7s-mail'
        }
    }
}


class TOT_delete_alert {
    constructor() {
        this.handler()
    }
    handler() {
        $('body').on('click', '.b-alert__close', e => {
            let int = $(e.target).data('alertClose')
            this.deleteAlert(int)
        })
    }

    deleteAlert(int) {
        $('[data-alert="' + int + '"]').fadeOut("normal", function () {
            $(this).remove();
        });
    }
}
new TOT_delete_alert()



class Fileinput {
    constructor(config) {
        this.input = config.input
        this.selectImage = null
        this.urlPhoto = ''
        this.placeholder = null


        this.init()
    }
    init() {

        this.input.on('change', e => {

            let reader = new FileReader()
            this.selectImage = e.target.files[0];

            this.placeholder = $(e.target).parent().children('.b-file-input__placeholder')

            reader.onload = e => {
                this.urlPhoto = e.target.result
                this.placeholder.css('backgroundImage', 'url(' + this.urlPhoto + ')')
            }

            reader.readAsDataURL(this.selectImage)
        })
    }
}

new Fileinput({
    input: $('.b-file-input')
})
class Modal {
    constructor(config) {
        this.modalName = config.modalname

        this.handler()
    }
    handler() {
        $('[data-modal-trigger="' + this.modalName + '"]').on('click', e => {
            this.toggleClass()
        })
    }
    toggleClass() {
        $('[data-modal-window="' + this.modalName + '"]').toggleClass('b-modal_open')
        $('body').toggleClass('body_overfloy-hidden')
    }
}

new Modal({
    modalname: 'test'
})
$(document).ready(e => {
    $(".b-preloader").fadeOut(400, function () {
        $(".b-preloader").remove()
    });
})
$('.b-field__see-pass').on('click', e => {

    let contextInput = $(e.target).parent().children('.b-field__input')
    let iconPlace = $(e.target).children('span')

    toogleInputType(contextInput, 'password', 'text')
    toogleClassIcon(iconPlace, 'pe-7s-lock', 'pe-7s-unlock')
})
function toogleInputType(input, type1, type2) {
    if (input.attr('type') === type1) {
        input.attr('type', type2)
    }
    else if (input.attr('type') === type2) {
        input.attr('type', type1)
    }
}
function toogleClassIcon(place, class1, class2) {
    if (place.hasClass(class1)) {
        place.removeClass(class1)
        place.addClass(class2)
    }
    else if (place.hasClass(class2)) {
        place.removeClass(class2)
        place.addClass(class1)
    }
}
//# sourceMappingURL=main.js.map
