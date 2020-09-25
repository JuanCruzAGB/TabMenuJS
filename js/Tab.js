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
    }

    /**
     * * Set the Tab open state.
     * @memberof Tab
     */
    setOpen(){
        this.states.open = false;
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
        if(!this.html.classList.contains('tab-link')){
            this.html.addEventListener('click', function(e){
                tabmenu.closeAll();
                tab.switch();
                for(const content of contents){
                    if(this.href.split('#').pop() == content.properties.id){
                        content.switch();
                    }else if(content.checkInsideSection(this.href.split('#').pop())){
                        content.switch();
                    }
                }
            });
        }
    }

    /**
     * * Change the Tab open state.
     * @returns
     * @memberof Tab
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
     * * Open the Tab.
     * @memberof Tab
     */
    open(){
        this.states.open = true;
        if(this.html.classList.contains('closed')){
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close(){
        this.states.open = false;
        if(this.html.classList.contains('opened')){
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
    }

    /**
     * * Get the Tab pathname.
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
     * * Activate a Tab.
     * @memberof Tab
     */
    activate(){
        if (!this.html.parentNode.classList.contains('active')) {
            this.html.parentNode.classList.toggle('active');
        }
        return true;
    }

    /**
     * * Search the current Tab open.
     * @static
     * @param {string} target - Tab target.
     * @param {Tab[]} tabs - Tabs created.
     * @param {Content[]} contents - Contents created.
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
     * @memberof Tab
     */
    static checkActive(target = '', tabs = []){
        let state = false;
        for(const tab of tabs){
            if(target == tab.getPathname()){
                state = tab.activate();
            }
        }
        return state;
    }
}