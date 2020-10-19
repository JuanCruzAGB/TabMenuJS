import { Content } from "./Content.js";
import { TabMenu } from "./TabMenu.js";

/**
 * * Tab controls the tab button.
 * @export
 * @class Tab
 */
export class Tab{
    /**
     * * Creates an instance of Tab.
     * @param {HTMLElement} html - Tab HTML Element.
     * @param {Content[]} contents - TabMenu Contents.
     * @param {TabMenu} tabmenu - TabMenu.
     * @memberof Tab
     */
    constructor(html = undefined, contents = [], tabmenu = undefined){
        this.setHTML(html, contents, tabmenu);
        this.setProperties();
        this.setStates();
        this.setTarget();
    }

    /**
     * * Set the Tab properties.
     * @memberof Tab
     */
    setProperties(){
        this.properties = {};
    }

    /**
     * * Set the Tab states.
     * @memberof Tab
     */
    setStates(){
        this.states = {};
        this.setOpen();
        this.setActive();
    }

    /**
     * * Set the Tab open state.
     * @memberof Tab
     */
    setOpen(){
        this.states.open = false;
    }

    /**
     * * Set the Tab active state.
     * @memberof Tab
     */
    setActive(){
        this.states.active = this.html.classList.contains('active');
    }

    /**
     * * Set the Tab target.
     * @memberof Tab
     */
    setTarget(){
        if(this.html.href.split('#').pop()){
            this.target = this.html.href.split('#').pop();
        }else{
            this.target = undefined;
        }
    }

    /**
     * * Set the Tab HTML Element.
     * @param {HTMLElement} html - Tab HTML Element.
     * @param {Content[]} contents - TabMenu Contents.
     * @param {TabMenu} tabmenu - TabMenu.
     * @memberof Tab
     */
    setHTML(html = undefined, contents = [], tabmenu = undefined){
        let tab = this;
        this.html = html;
        this.html.addEventListener('click', function(e){
            if(this.classList.contains('tab-button')){
                e.preventDefault();
            }
            tabmenu.closeAll();
            tab.switch(tabmenu.tabs);
            for(const content of contents){
                if(this.href.split('#').pop() == content.properties.id){
                    content.switch();
                }else if(content.checkInsideSection(this.href.split('#').pop())){
                    content.switch();
                }
            }
        });
    }

    /**
     * * Get the Tab pathname.
     * @returns
     * @memberof Tab
     */
    getPathname(){
        let https_regexp = new RegExp('https://');
        let http_regexp = new RegExp('http://');
        if(https_regexp.exec(this.target)){
            let target = this.target.split('https://').pop()
            https_regexp = new RegExp('/');
            return target.slice(https_regexp.exec(target).index).split('#').shift();
        }else if(http_regexp.exec(this.target)){
            let target = this.target.split('http://').pop()
            http_regexp = new RegExp('/');
            return target.slice(http_regexp.exec(target).index).split('#').shift();
        }else{
            return this.target;
        }
    }

    /**
     * * Change the Tab open state.
     * @param {object} tabs - TabMenu Tabs.
     * @returns
     * @memberof Tab
     */
    switch(tabs = []){
        let returnedElement = {
            open: undefined,
            active: undefined,
        }
        switch(this.states.open){
            case true:
                this.close();
                returnedElement.open = false;
                break;
            case false:
                this.open();
                returnedElement.open = true;
                break;
        }
        switch(this.states.active){
            case true:
                this.deactivate();
                returnedElement.active = false;
                break;
            case false:
                this.activate(tabs);
                returnedElement.active = true;
                break;
        }
        return returnedElement;
    }

    /**
     * * Open the Tab.
     * @memberof Tab
     */
    open(){
        this.states.open = true;
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close(){
        this.states.open = false;
    }

    /**
     * * Activate a Tab.
     * @param {object} tabs - TabMenu Tabs.
     * @returns
     * @memberof Tab
     */
    activate(tabs = []){
        if (!this.html.classList.contains('active')) {
            if (tabs.length) {
                for (const tab of tabs) {
                    if (tab.states.active) {
                        tab.html.classList.remove('active');
                        tab.states.active = false;
                    }
                }
            }
            this.html.classList.add('active');
            this.states.active = true;
        }
        return true;
    }

    /**
     * * Deactivate a Tab.
     * @returns
     * @memberof Tab
     */
    deactivate(){
        if (this.html.classList.contains('active')) {
            this.html.classList.remove('active');
            this.states.active = false;
        }
        return false;
    }

    /**
     * * Search the current Tab open.
     * @static
     * @param {string} target - Tab target.
     * @param {Tab[]} tabs - Tabs created.
     * @param {Content[]} contents - Contents created.
     * @returns
     * @memberof Tab
     */
    static checkOpened(target = '', tabs = [], contents = [],){
        let state = false;
        for(const tab of tabs){
            if(target == tab.target){
                state = tab.switch();
                if(state){
                    Content.checkOpened(tab.target, contents);
                }
            }
        }
        return state;
    }

    /**
     * * Search the current Tab active.
     * @static
     * @param {string} target - Tab target.
     * @param {Tab[]} tabs - Tabs created.
     * @returns
     * @memberof Tab
     */
    static checkActive(target = '', tabs = []){
        let state = false;
        for(const tab of tabs){
            if(target == tab.getPathname()){
                state = tab.activate(tabs);
            }else{
                state = tab.deactivate();
            }
        }
        return state;
    }
}