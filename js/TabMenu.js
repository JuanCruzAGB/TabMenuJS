// ? TabMenuJS repository
import { Tab } from './Tab.js';
import { Content } from './Content.js';

/**
 * * TabMenu makes an excellent tab menu.
 * @export
 * @class TabMenu
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class TabMenu{
    /**
     * * Creates an instance of TabMenu.
     * @param {Object} [properties] TabMenu properties:
     * @param {String} [properties.id='tabmenu-1'] TabMenu ID.
     * @param {Object} [states] TabMenu states:
     * @param {String[]} [states.open=[]] TabMenu open tabs status.
     * @param {String} [states.active=undefined] TabMenu active tab status.
     * @param {Boolean} [states.execute=false] TabMenu execute click event status.
     * @param {Object} [callback] TabMenu click callback.
     * @param {Function} [callback.function] TabMenu click callback function.
     * @param {Object} [callback.params] TabMenu click callback params.
     * @memberof TabMenu
     */
    constructor(properties = {
        id: 'tab-menu-1',
    }, states = {
        open: [],
        active: undefined,
        execute: false,
    }, callback = {
        function: function(){ /* console.log('clicked') */ },
        params: {
            //
    }}){
        this.setProperties(properties);
        this.setStates(states);
        this.setCallback(callback);
        this.setHTML();
        this.setContents();
        this.setTabs();
        this.checkOpenStatus();
        this.checkActiveStatus();
    }

    /**
     * * Set the TabMenu properties.
     * @param {Object} [properties] TabMenu properties:
     * @param {String} [properties.id='tab-menu-1'] TabMenu ID.
     * @memberof TabMenu
     */
    setProperties(properties = {
        id: 'tab-menu-1',
    }){
        this.properties = {};
        this.setIDProperty(properties);
    }

    /**
     * * Returns the TabMenu properties or an specific property.
     * @param {String} [name] Property name.
     * @returns {Object|*}
     * @memberof TabMenu
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
     * @memberof TabMenu
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
     * @memberof TabMenu
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
     * * Set the TabMenu ID.
     * @param {Object} [properties] TabMenu properties:
     * @param {String} [properties.id='tab-menu-1'] TabMenu ID.
     * @memberof TabMenu
     */
    setIDProperty(properties = {
        id: 'tab-menu-1',
    }){
        this.properties.id = ((properties.hasOwnProperty('id')) ? properties.id : 'tab-menu-1');
    }

    /**
     * * Returns the TabMenu ID.
     * @returns {String}
     * @memberof TabMenu
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the TabMenu states.
     * @param {Object} [states] TabMenu states:
     * @param {String[]} [states.open=[]] TabMenu open tabs status.
     * @param {String} [states.active=undefined] TabMenu active tab status.
     * @param {Boolean} [states.execute=false] TabMenu execute click event status.
     * @memberof TabMenu
     */
    setStates(states = {
        open: [],
        active: undefined,
        execute: false,
    }){
        this.states = {};
        this.setOpenStatus(states);
        this.setActiveStatus(states);
        this.setExecuteStatus(states);
    }

    /**
     * * Returns the TabMenu states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof TabMenu
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
     * @memberof TabMenu
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
     * @memberof TabMenu
     */
    changeStatus(name = '', value = ''){
        if (this.hasStates(name)) {
            this.states[name] = value;
        }
        switch (name) {
            case 'open':
                this.checkOpenStatus();
                break;
            case 'active':
                this.checkActiveStatus();
                break;
        }
    }

    /**
     * * Set the TabMenu open tabs status.
     * @param {Object} [states] TabMenu states:
     * @param {String[]} [states.open=[]] TabMenu open tabs status.
     * @memberof TabMenu
     */
    setOpenStatus(states = {
        open: [],
    }){
        this.states.open = ((states.hasOwnProperty('open')) ? states.open : []);
    }

    /**
     * * Returns the TabMenu open tabs status.
     * @returns {String[]}
     * @memberof TabMenu
     */
    getOpenStatus(){
        return this.states.open;
    }

    /**
     * * Check if should be a current TabMenu Tab open.
     * @memberof NavMenu
     */
    checkOpenStatus(){
        if (this.getStates('open').length) {
            for (const tab of this.getTabs()) {
                let sameTarget = false;
                for (const target of this.getStates('open')) {
                    if (tab.getProperties('target') == target) {
                        sameTarget = true;
                        tab.open();
                        for (const content of this.getContents()) {
                            if (content.getProperties('id') == target) {
                                content.open();
                            }
                        }
                    }
                }
                if (!sameTarget) {
                    tab.close();
                    for (const content of this.getContents()) {
                        if (content.getProperties('id') == tab.getProperties('target')) {
                            content.close();
                        }
                    }
                }
            }
        }
    }

    /**
     * * Set the TabMenu active tab status.
     * @param {Object} [states] TabMenu states:
     * @param {String} [states.active=undefined] TabMenu active tab status.
     * @memberof TabMenu
     */
    setActiveStatus(states = {
        active: undefined,
    }){
        this.states.active = ((states.hasOwnProperty('active')) ? states.active : undefined);
    }

    /**
     * * Returns the TabMenu active tabs status.
     * @returns {Boolean}
     * @memberof TabMenu
     */
    getActiveStatus(){
        return this.states.active;
    }

    /**
     * * Check if should be a current TabMenu Tab active.
     * @memberof NavMenu
     */
    checkActiveStatus(){
        if(this.getStates('active')){
            for (const tab of this.getTabs()) {
                if (tab.getPathname() == this.getStates('active')) {
                    tab.activate();
                } else {
                    tab.deactivate();
                }
            }
        }
    }

    /**
     * * Set the TabMenu execute click event status.
     * @param {Object} [states] TabMenu states:
     * @param {Boolean} [states.execute=false] TabMenu execute click event status.
     * @memberof TabMenu
     */
    setExecuteStatus(states = {
        execute: false,
    }){
        this.states.execute = ((states.hasOwnProperty('execute')) ? states.execute : false);
    }

    /**
     * * Returns the TabMenu execute click event status.
     * @returns {Boolean}
     * @memberof TabMenu
     */
    getExecuteStatus(){
        return this.states.execute;
    }

    /**
     * * Set the TabMenu click callback.
     * @param {Object} [callback] TabMenu click callback.
     * @param {Function} [callback.function] TabMenu click callback function.
     * @param {Object} [callback.params] TabMenu click callback params.
     * @memberof TabMenu
     */
    setCallback(callback = {
        function: function(){ /* console.log('clicked') */ },
        params: {
            //
    }}){
        this.callback = {
            function: (callback.hasOwnProperty('function')) ? callback.function : function(){ /* console.log('clicked') */ },
            params: (callback.hasOwnProperty('params')) ? callback.params : {},
        };
    }

    /**
     * * Returns the TabMenu click callback.
     * @returns {Object}
     * @memberof TabMenu
     */
    getCallback(){
        return this.callback;
    }

    /**
     * * Set the TabMenu HTML Element.
     * @memberof TabMenu
     */
    setHTML(){
        this.html = TabMenu.getDomHTML(this.getProperties('id'));
    }

    /**
     * * Returns the TabMenu HTML Element.
     * @returns {HTMLElement}
     * @memberof TabMenu
     */
    getHTML(){
        return this.html;
    }

    /**
     * * Set the TabMenu Contents.
     * @memberof TabMenu
     */
    setContents(){
        this.contents = Content.generate(this);
    }

    /**
     * * Returns the TabMenu Contents.
     * @returns {Content[]}
     * @memberof TabMenu
     */
    getContents(){
        return this.contents;
    }

    /**
     * * Set the TabMenu Tabs.
     * @memberof TabMenu
     */
    setTabs(){
        this.tabs = Tab.generate(this);
    }

    /**
     * * Returns the TabMenu Tabs.
     * @returns {Tab[]}
     * @memberof TabMenu
     */
    getTabs(){
        return this.tabs;
    }

    /**
     * * Open a Content.
     * @param {Object} [open=[]] TabMenu open tabs status.
     * @memberof TabMenu
     */
    open(open = []){
        this.changeStatus('open', open);
    }

    /**
     * * Close all the Contents and Tabs.
     * @memberof TabMenu
     */
    closeAll(){
        for(const tab of this.tabs){
            tab.close();
        }
        for(const content of this.contents){
            content.close();
        }
    }

    /**
     * * Execute the TabMenu click function.
     * @param {String} id Tab clicked target.
     * @memberof TabMenu
     */
    execute(id){
        for(const content of this.getContents()){
            if(id == content.getProperties('id') || content.checkSection(id)){
                this.changeStatus('open', [content.getProperties('id')]);
                content.open();
            } else {
                content.close();
            }
        }
        let params = this.getCallback().params;
        params.tabmenu = this;
        this.getCallback().function(params);
    }

    /**
     * * Get the TabMenu HTML Elements
     * @static
     * @returns {HTMLElement[]}
     * @memberof TabMenu
     */
    static getDomHTML(ID){
        return document.querySelectorAll(`#${ ID }.tab-menu`);
    }
}