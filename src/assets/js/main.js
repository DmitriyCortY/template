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
//# sourceMappingURL=main.js.map
