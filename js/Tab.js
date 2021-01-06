import { Link } from "./Link.js";
import { TabMenu } from "./TabMenu.js";

/**
 * * Tab controls the tab button.
 * @export
 * @class Tab
 */
export class Tab{
    /**
     * * Creates an instance of Tab.
     * @param {Object} [properties] Tab properties:
     * @param {String} [properties.id='tab-1'] Tab ID.
     * @param {String} [properties.target=undefined] Tab target.
     * @param {Object} [states] Tab states:
     * @param {Boolean} [states.open=false] Tab open status.
     * @param {Boolean} [states.active=false] Tab active tab status.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    constructor(properties = {
        id: 'tab-1',
        target: undefined,
    }, states = {
        open: false,
        active: false,
    }, tabmenu){
        this.setProperties(properties);
        this.setStates(states);
        this.setLink(tabmenu);
        this.setHTML(tabmenu);
    }

    /**
     * * Set the Tab properties.
     * @param {Object} [properties] Tab properties:
     * @param {String} [properties.id='tab-1'] Tab ID.
     * @memberof Tab
     */
    setProperties(properties = {
        id: 'tab-1',
        target: undefined,
    }){
        this.properties = {};
        this.setIDProperty(properties);
        this.setTargetProperty(properties);
    }

    /**
     * * Returns the Tab properties or an specific property.
     * @param {String} [name] Property name.
     * @returns {Object|*}
     * @memberof Tab
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
     * @memberof Tab
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
     * @memberof Tab
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
     * * Set the Tab ID.
     * @param {Object} [properties] Tab properties:
     * @param {String} [properties.id='tab-1'] Tab ID.
     * @memberof Tab
     */
    setIDProperty(properties = {
        id: 'tab-1',
    }){
        this.properties.id = ((properties.hasOwnProperty('id')) ? properties.id : 'tab-1');
    }

    /**
     * * Returns the Tab ID.
     * @returns {String}
     * @memberof Tab
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Tab target.
     * @param {Object} [properties] Tab properties:
     * @param {String} [properties.target=undefined] Tab target.
     * @memberof Tab
     */
    setTargetProperty(properties = {
        target: undefined,
    }){
        this.properties.target = ((properties.hasOwnProperty('target')) ? properties.target : undefined);
    }

    /**
     * * Returns the Tab target.
     * @returns {String}
     * @memberof Tab
     */
    getTargetProperty(){
        return this.properties.target;
    }

    /**
     * * Set the Tab states.
     * @param {Object} [states] Tab states:
     * @param {Boolean} [states.open=false] Tab open status.
     * @param {Boolean} [states.active=false] Tab active tab status.
     * @memberof Tab
     */
    setStates(states = {
        open: false,
        active: false,
    }){
        this.states = {};
        this.setOpenStatus(states);
        this.setActiveStatus(states);
    }

    /**
     * * Returns the Tab states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Tab
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
     * @memberof Tab
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
     * @memberof Tab
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
                    if (!this.getStates('active')) {
                        this.getLink().activate();
                    }
                } else {
                    if (this.getHTML().classList.contains('opened')) {
                        this.getHTML().classList.remove('opened');
                    }
                    this.getHTML().classList.add('closed');
                    if (!this.getStates('active')) {
                        this.getLink().deactivate();
                    }
                }
                break;
            case 'active':
                if (this.getStates('active')) {
                    this.getLink().activate();
                } else {
                    this.getLink().deactivate();
                }
                break;
        }
    }

    /**
     * * Set the Tab open status.
     * @param {Object} [states] Tab states:
     * @param {Boolean} [states.open=false] Tab open status.
     * @memberof Tab
     */
    setOpenStatus(states = {
        open: false,
    }){
        this.states.open = ((states.hasOwnProperty('open')) ? states.open : false);
    }

    /**
     * * Returns the Tab open status.
     * @returns {Boolean}
     * @memberof Tab
     */
    getOpenStatus(){
        return this.states.open;
    }

    /**
     * * Set the Tab active tab status.
     * @param {Object} [states] Tab states:
     * @param {Boolean} [states.active=false] Tab active tab status.
     * @memberof Tab
     */
    setActiveStatus(states = {
        active: false,
    }){
        this.states.active = ((states.hasOwnProperty('active')) ? states.active : false);
    }

    /**
     * * Returns the Tab active tabs status.
     * @returns {Boolean}
     * @memberof Tab
     */
    getActiveStatus(){
        return this.states.active;
    }

    /**
     * * Set the Tab HTML Element.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    setHTML(tabmenu){
        this.html = Tab.getDomHTML(this.getProperties('id'), tabmenu);
    }

    /**
     * * Returns the Tab HTML Element.
     * @returns {HTMLElement}
     * @memberof Tab
     */
    getHTML(){
        return this.html;
    }

    /**
     * * Set the Tab Link HTML Element.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    setLink(tabmenu){
        this.link = new Link({
            id: `${ this.getProperties('id') }-link`,
        }, {
            active: this.getStates('active'),
        }, tabmenu, this);
    }

    /**
     * * Returns the Tab Link HTML Element.
     * @returns {HTMLElement}
     * @memberof Tab
     */
    getLink(){
        return this.link;
    }

    /**
     * * Change the Tab open state.
     * @memberof Tab
     */
    switch(){
        switch(this.getStates('open')){
            case true:
                this.close();
                break;
            case false:
                this.open();
                break;
        }
    }

    /**
     * * Open the Tab.
     * @memberof Tab
     */
    open(){
        this.changeStatus('open', true);
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close(){
        this.changeStatus('open', false);
    }

    /**
     * * Activate a Tab.
     * @memberof Tab
     */
    activate(){
        this.changeStatus('active', true);
    }

    /**
     * * Deactivate a Tab.
     * @memberof Tab
     */
    deactivate(){
        this.changeStatus('active', false);
    }

    /**
     * * Generates the TabMenu Tab.
     * @static
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {Tab[]}
     * @memberof Tab
     */
    static generate(tabmenu){
        let tabs = [], htmls = this.getAllDomHTML(tabmenu.getProperties('id'));
        for(const key in htmls){
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                let link = html.children[0];
                for (const child of html.children) {
                    if (child.classList.contains('tab-link') && child.classList.contains('tab-button')) {
                        link = child;
                    }
                }
                tabs.push(new this(this.generateProperties(key, link), this.generateStates(html, tabmenu), tabmenu));
            }
        }
        return tabs;
    }

    /**
     * * Generates the Tab properties.
     * @static
     * @param {Number} key Tab key.
     * @param {HTMLElement} link Tab Link HTML Element.
     * @returns {Object}
     * @memberof Tab
     */
    static generateProperties(key, link){
        return {
            id: `tab-${ key }`,
            target: ((link.href.split('#').pop()) ? link.href.split('#').pop() : undefined),
        };
    }

    /**
     * * Generates the Tab states.
     * @static
     * @param {HTMLElement} html Tab HTML Element.
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {Object}
     * @memberof Tab
     */
    static generateStates(html, tabmenu){
        return {
            open: html.classList.contains('opened'),
            active: tabmenu.getStates('active'),
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
        return document.querySelectorAll(`#${ id }.tab-menu .tab-menu-list .tab`);
    }

    /**
     * * Returns a Tab HTML Element.
     * @static
     * @param {String} id Tab ID.
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {HTMLElement[]}
     * @memberof Tab
     */
    static getDomHTML(id, tabmenu){
        let htmls = document.querySelectorAll(`#${ tabmenu.getProperties('id') }.tab-menu .tab-menu-list .tab`);
        for (const key in htmls) {
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                if (`tab-${ key }` == id) {
                    return html;
                }
            }
        }
    }
}