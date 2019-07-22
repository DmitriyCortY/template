/* static hahahahah */ let __counterAlert = 0;

//  ********* example *********
// new TOT_alert({
//     type: 'info',
//     title: 'Сообщение для вас',
//     body: `Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы
// обучения кадров, соответствует насущным потребностям. Не следует, однако забывать, что дальнейшее развитие различных
// форм деятельности позволяет оценить значение новых предложений. С другой стороны постоянный количественный рост.`,
//     place: $('[data-append-alert]'),
//     onInsert: function () {
//         console.log('алерт добавился')
//     },
//     // icon: '<div class="b-alert__icon pe-7s-attention"></div>'
// })
//  ********* example *********

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


