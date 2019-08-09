class Modal {
    constructor(c) {
        this.modalName = c.name
        this.modalBox = $('[data-modal-window="' + this.modalName + '"]')
        this.modal = this.modalBox.children('.b-modal')
        this.trigger = $('[data-modal-trigger="' + this.modalName + '"]')
        this.flag = false
        this.init()
    }
    init() {
        this.handler()
    }
    handler() {
        this.trigger.on('click', e => {
            if (this.flag === false) {
                this.open()
                this.flag = true
            } else if (this.flag === true) {
                this.close()
                this.flag = false
            }
        })
    }
    open() {
        this.modalBox.addClass('b-modal-box_df')
        $('.b-page').css('filter', 'blur(2px)')
        setTimeout(e => {
            this.modalBox.addClass('b-modal-box_op1')
            setTimeout(e => {
                this.modal.addClass('b-modal_scale1')
            }, 200)
        }, 50)
    }
    close() {
        this.modal.removeClass('b-modal_scale1')
        setTimeout(e => {
            $('.b-page').css('filter', 'none')
            this.modalBox.removeClass('b-modal-box_op1')
            setTimeout(e => {
                this.modalBox.removeClass('b-modal-box_df')
            }, 200)
        }, 250)
    }
}