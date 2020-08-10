/**
 * * Content controls the content.
 * @export
 * @class Content
 */
export class Content{
    /**
     * * Creates an instance of Content.
     * @param {HTMLElement} html - Content HTML Element.
     * @memberof Content
     */
    constructor(html = undefined){
        this.setHTML(html);
        this.setProperties();
        this.setStates();
    }

    /**
     * * Set the Content properties.
     * @memberof Content
     */
    setProperties(){
        this.properties = {};
        this.setId();
    }

    /**
     * * Set the Content properties.
     * @memberof Content
     */
    setStates(){
        this.states = {};
        this.setOpen();
    }

    /**
     * * Set the Content id.
     * @memberof Content
     */
    setId(){
        this.properties.id = this.html.id;
    }

    /**
     * * Set the Content open state.
     * @memberof Content
     */
    setOpen(){
        this.states.open = false;
    }

    /**
     * * Set the Content HTML Element.
     * @param {HTMLElement} html - Content HTML Element.
     * @memberof Content
     */
    setHTML(html = null,){
        this.html = properties.html;
    }

    /**
     * * Change the Content open state.
     * @returns
     * @memberof Content
     */
    switch(){
        switch(this.states.open){
            case true:
                this.states.open = false;
                if(this.html.classList.contains('opened')){
                    this.html.classList.remove('opened');
                }
                this.html.classList.add('closed');
                return false;
            case false:
                this.states.open = true;
                if(this.html.classList.contains('closed')){
                    this.html.classList.remove('closed');
                }
                this.html.classList.add('opened');
                return true;
        }
    }

    /**
     * * Search the current Content open.
     * @static
     * @param {string} id - Content ID.
     * @param {Content[]} contents - Contents created.
     * @memberof Content
     */
    static open(id = '', contents = []){
        for(const content of contents){
            if(id == content.properties.id){
                content.switch();
            }
        }
    }
}