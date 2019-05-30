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