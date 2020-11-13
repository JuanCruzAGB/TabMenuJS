import { Tab } from './Tab.js';
import { Content } from './Content.js';

/**
 * * TavMenu makes an excellent tab menu.
 * @export
 * @class TabMenu
 */
export class TabMenu{
    /**
     * * Creates an instance of TabMenu.
     * @param {object} properties - TabMenu properties.
     * @param {object} states - TabMenu states.
     * @memberof TabMenu
     */
    constructor(properties = {
        id: 'tab-1',
    }, states = {
        open: [],
        active: undefined,
        noClick: false,
    }){
        // TODO Edit custom errors.
        this.setProperties(properties);
        this.setStates(states);
        this.setHTML();
        this.setContents();
        this.setTabs();
        // TODO Create this.checkInteractions();
        this.checkOpenedTab();
        this.checkActiveTab();
    }

    /**
     * * Set the TabMenu properties.
     * @param {object} properties - TabMenu properties.
     * @memberof TabMenu
     */
    setProperties(properties = {
        id: 'tab-1',
    }){
        this.properties = {};
        this.setId(properties);
    }

    /**
     * * Set the TabMenu states.
     * @param {object} states - TabMenu states.
     * @memberof TabMenu
     */
    setStates(states = {
        open: [],
        active: undefined,
        noClick: false,
    }){
        this.states = {};
        this.setOpen(states);
        this.setActive(states);
        this.setNoCLick(states);
    }

    /**
     * * Set the TabMenu ID.
     * @param {object} properties - TabMenu properties.
     * @memberof TabMenu
     */
    setId(properties = {
        id: 'tab-1',
    }){
        this.properties.id = properties.id;
    }

    /**
     * * Set the TabMenu open state.
     * @param {object} states - TabMenu states.
     * @memberof TabMenu
     */
    setOpen(states = {
        open: [],
    }){
        this.states.open = states.open;
    }

    /**
     * * Set the TabMenu active state.
     * @param {object} states - TabMenu states.
     * @memberof TabMenu
     */
    setActive(states = {
        active: undefined,
    }){
        this.states.active = states.active;
    }

    /**
     * * Set the TabMenu active state.
     * @param {object} states - TabMenu states.
     * @memberof TabMenu
     */
    setNoCLick(states = {
        noClick: false,
    }){
        this.states.noClick = states.noClick;
    }

    /**
     * * Set the TavMenu HTML Element.
     * @memberof TavMenu
     */
    setHTML(){
        let tabmenus = document.querySelectorAll('.tab-menu');
        for(const tab of tabmenus){
            if(tab.id == this.properties.id){
                this.html = tab;
            }
        }
    }

    /**
     * * Set the TabMenu Contents.
     * @memberof TabMenu
     */
    setContents(){
        this.contents = [];
        let contents = document.querySelectorAll('.tab-menu .tab-content-list .tab-content');
        for(const content of contents){
            this.contents.push(new Content(content));
        }
    }

    /**
     * * Set the TabMenu Tabs.
     * @memberof TabMenu
     */
    setTabs(){
        this.tabs = [];
        let tabs = document.querySelectorAll('.tab-menu .tab-menu-list .tab-button, .tab-menu .tab-menu-list .tab-link');
        for(const tab of tabs){
            this.tabs.push(new Tab(tab, this.contents, this));
        }
    }

    /**
     * * Close all the Contents and Tabs.
     * @memberof TabMenu
     */
    closeAll(){
        for(const tab of this.tabs){
            if(tab.states.open){
                tab.close();
            }
        }
        for(const content of this.contents){
            if(content.states.open){
                content.close();
            }
        }
    }

    /**
     * * Open a Content.
     * @param {object} open - TabMenu open state.
     * @param {string} active - TabMenu active state.
     * @memberof TabMenu
     */
    open(open = [], active = undefined){
        this.states.open = open;
        this.states.active = active;
        this.checkOpenedTab();
        this.checkActiveTab();
    }

    /**
     * * Check if should be a current TabMenu Tab open.
     * @memberof NavMenu
     */
    checkOpenedTab(){
        if(this.states.open.length){
            for(const target of this.states.open){
                if(!Tab.checkOpened(target, this.tabs, this.contents, this)){
                    Content.checkOpened(target, this.contents);
                }
            }
        }
    }

    /**
     * * Check if should be a current TabMenu Tab active.
     * @memberof NavMenu
     */
    checkActiveTab(){
        if(this.states.active){
            Tab.checkActive(this.states.active, this.tabs);
        }
    }
}