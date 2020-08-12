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
        this.setSections();
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
        this.html = html;
    }

    /**
     * * Set the Content inside sections.
     * @memberof Content
     */
    setSections(){
        if(this.html.dataset.sections){
            this.sections = [];
            for(const section of this.html.dataset.sections.split(',')){
                this.sections.push(section);
            }
        }
    }

    /**
     * * Change the Content open state.
     * @returns
     * @memberof Content
     */
    switch(){
        switch(this.states.open){
            case true:
                this.close();
                return false;
            case false:
                this.open();
                return true;
        }
    }

    /**
     * * Open the Content.
     * @memberof Content
     */
    open(){
        this.states.open = true;
        if(this.html.classList.contains('closed')){
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
    }

    /**
     * * Close the Content.
     * @memberof Content
     */
    close(){
        this.states.open = false;
        if(this.html.classList.contains('opened')){
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
    }

    /**
     * * Check if the section is inside the Content.
     * @param {*} id
     * @returns
     * @memberof Content
     */
    checkInsideSection(id){
        if(this.sections){
            for(const section of this.sections){
                if(section == id){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * * Search the current Content open.
     * @static
     * @param {string} id - Content ID.
     * @param {Content[]} contents - Contents created.
     * @memberof Content
     */
    static checkOpened(id = '', contents = []){
        for(const content of contents){
            if(id == content.properties.id){
                content.switch();
            }else if(content.checkInsideSection(id)){
                content.switch();
            }
        }
    }
}