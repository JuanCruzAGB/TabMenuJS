/**
 * * Content controls the TabMenu Content.
 * @export
 * @class Content
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Content{
    /**
     * * Creates an instance of Content.
     * @param {Object} [properties] Content properties:
     * @param {String} [properties.id='content-1'] Content ID.
     * @param {Object} [states] Content states:
     * @param {Boolean} [states.open=false] Content open status.
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @memberof Content
     */
    constructor(properties = {
        id: 'content-1',
    }, states = {
        open: false,
    }, tabmenu){
        this.setProperties(properties);
        this.setStates(states);
        this.setHTML(tabmenu);
        this.setSections();
    }

    /**
     * * Set the Content properties.
     * @param {Object} [properties] Content properties:
     * @param {String} [properties.id='content-1'] Content ID.
     * @memberof Content
     */
    setProperties(properties = {
        id: 'content-1',
    }){
        this.properties = {};
        this.setIDProperty(properties);
    }

    /**
     * * Returns the Content properties or an specific property.
     * @param {String} [name] Property name.
     * @returns {Object|*}
     * @memberof Content
     */
    getProperties(name = ''){
        if (name && name != '') {
            return this.properties[name];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} name Property name.
     * @returns {Boolean}
     * @memberof Content
     */
    hasProperty(name = ''){
        if (this.properties.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} name Property name.
     * @param {*} value Property value.
     * @memberof Content
     */
    changeProperty(name = '', value = ''){
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }

    /**
     * * Set the Content ID.
     * @param {Object} [properties] Content properties:
     * @param {String} [properties.id='content-1'] Content ID.
     * @memberof Content
     */
    setIDProperty(properties = {
        id: 'content-1',
    }){
        this.properties.id = ((properties.hasOwnProperty('id')) ? properties.id : 'content-1');
    }

    /**
     * * Returns the Content ID.
     * @returns {String}
     * @memberof Content
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Content states.
     * @param {Object} [states] Content states:
     * @param {Boolean} [states.open=false] Content open status.
     * @memberof Content
     */
    setStates(states = {
        open: false,
    }){
        this.states = {};
        this.setOpenStatus(states);
    }

    /**
     * * Returns the Content states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Content
     */
    getStates(property = ''){
        if (property && property != '') {
            return this.states[property];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {String} name Status name.
     * @returns {Boolean}
     * @memberof Content
     */
    hasStates(name = ''){
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {String} name Status name.
     * @param {*} value Status value.
     * @memberof Content
     */
    changeStatus(name = '', value = ''){
        if (this.hasStates(name)) {
            this.states[name] = value;
        }
        switch (name) {
            case 'open':
                if (this.getStates('open')) {
                    if (this.getHTML().classList.contains('closed')) {
                        this.getHTML().classList.remove('closed');
                    }
                    this.getHTML().classList.add('opened');
                } else {
                    if (this.getHTML().classList.contains('opened')) {
                        this.getHTML().classList.remove('opened');
                    }
                    this.getHTML().classList.add('closed');
                }
                break;
        }
    }

    /**
     * * Set the Content open status.
     * @param {Object} [states] Content states:
     * @param {Boolean} [states.open=false] Content open status.
     * @memberof Content
     */
    setOpenStatus(states = {
        open: false,
    }){
        this.states.open = ((states.hasOwnProperty('open')) ? states.open : false);
    }

    /**
     * * Returns the Content open status.
     * @returns {Boolean}
     * @memberof Content
     */
    getOpenStatus(){
        return this.states.open;
    }

    /**
     * * Set the Content HTML Element.
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @memberof Content
     */
    setHTML(tabmenu){
        this.html = Content.getDomHTML(this.getProperties('id'), tabmenu);
    }

    /**
     * * Returns the Content HTML Element.
     * @returns {HTMLElement}
     * @memberof Content
     */
    getHTML(){
        return this.html;
    }

    /**
     * * Set the Content inside sections.
     * @memberof Content
     */
    setSections(){
        let sections;
        this.sections = [];
        if (sections = this.getHTML().dataset.sections) {
            for(const section of sections.split(',')){
                this.sections.push(section);
            }
        }
    }

    /**
     * * Returns the Content sections.
     * @returns {String[]}
     * @memberof Content
     */
    getSections(){
        return this.sections;
    }

    /**
     * * Check if the section is inside the Content.
     * @param {String} name Section name.
     * @returns {Boolean}
     * @memberof Content
     */
    checkSection(name){
        if(this.getSections()){
            for(const section of this.getSections()){
                if(section == name){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * * Open the Content.
     * @memberof Content
     */
    open(){
        this.changeStatus('open', true);
    }

    /**
     * * Close the Content.
     * @memberof Content
     */
    close(){
        this.changeStatus('open', false);
    }

    /**
     * * Generates the TabMenu Content.
     * @static
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @returns {Content[]}
     * @memberof Content
     */
    static generate(tabmenu){
        let contents = [];
        for(const html of this.getAllDomHTML(tabmenu.getProperties('id'))){
           contents.push(new this(this.generateProperties(html), this.generateStates(html), tabmenu));
        }
        return contents;
    }

    /**
     * * Generates the Content properties.
     * @static
     * @param {HTMLElement} html Content HTML Element.
     * @returns {Object}
     * @memberof Content
     */
    static generateProperties(html){
        return {
            id: html.id,
        };
    }

    /**
     * * Generates the Content states.
     * @static
     * @param {HTMLElement} html Content HTML Element.
     * @returns {Object}
     * @memberof Content
     */
    static generateStates(html){
        return {
            open: html.classList.contains('opened'),
        };
    }

    /**
     * * Returns all the Content HTML Elements.
     * @static
     * @param {String} id TabMenu ID.
     * @returns {HTMLElement[]}
     * @memberof Content
     */
    static getAllDomHTML(id){
        return document.querySelectorAll(`#${ id }.tab-menu .tab-content-list .tab-content`);
    }

    /**
     * * Returns a Content HTML Element.
     * @static
     * @param {String} id Content ID.
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @returns {HTMLElement[]}
     * @memberof Content
     */
    static getDomHTML(id, tabmenu){
        return document.querySelector(`#${ tabmenu.getProperties('id') }.tab-menu .tab-content-list #${ id }.tab-content`);
    }
}