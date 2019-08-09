/*

var tabs = new TABS({
    trigger: $('[data-tab-trigger]'), // jQuery.object
    content: $('[data-tab-content]'), // jQuery.object
    triggerClass: 'active', // srting
    contentClass: 'open' // srting
})
tabs.init()

*/

class TABS {
    constructor(c) {
        this.trigger = c.trigger || $('[data-tab-trigger]') // jQuery.object
        this.content = c.content || $('[data-tab-content]') // jQuery.object
        this.triggerClass = c.triggerClass || 'active' // srting
        this.contentClass = c.contentClass || 'open' // srting
    }
    init() {
        this.listeners()
        this.allTabsClose()
    }
    listeners() {
        this.trigger.on('click', e => {
            let index = this.trigger.index($(e.currentTarget))
            this.hadlerTrigger(index)
        })
    }
    hadlerTrigger(index) {
        if (this.trigger.eq(index).hasClass(this.triggerClass) && this.content.eq(index).hasClass(this.contentClass)) {
            this.close()
        } else {
            this.close()
            this.open(index)
        }
    }
    allTabsClose() {
        this.content.hide()
    }
    close() {
        this.content.slideUp()
        this.trigger.removeClass(this.triggerClass)
        this.content.removeClass(this.contentClass)
    }
    open(index) {
        this.content.eq(index).slideDown()
        this.trigger.eq(index).addClass(this.triggerClass)
        this.content.eq(index).addClass(this.contentClass)
    }
}