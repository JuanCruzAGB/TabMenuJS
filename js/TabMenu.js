import { Tab } from './Tab.js';
import { Content } from './Content.js';
import { Sidebar } from './Sidebar.js';

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
        sidebar: {
            state: false,
        },
    }, states = {
        open: [],
    }){
        // TODO Edit custom errors.
        // TODO Create custom dropdown.
        // TODO Create custom sidebar.
        this.setProperties(properties);
        this.setStates(states);
        this.setHTML();
        this.setContents();
        this.setTabs();
        // TODO Create this.checkInteractions();
        this.checkOpenedTab();
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
    }){
        this.states = {};
        this.setOpen(states);
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
        let contents = document.querySelectorAll('.tab-menu > .tab-content-list > .tab-content');
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
        let tabs = document.querySelectorAll('.tab-menu > .tab-menu-list > li > .tab-link');
        for(const tab of tabs){
            this.tabs.push(new Tab(tab, this.contents));
        }
    }

    /**
     * * Check if should be a current TabMenu Tab open.
     * @memberof NavMenu
     */
    checkOpenedTab(){
        for(const name of this.states.open){
            Tab.open(name, this.tabs);
        }
    }
}