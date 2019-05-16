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
    }
}

new Modal({
    modalname: 'test'
})