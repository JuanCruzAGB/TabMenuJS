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
        this.target = this.html.href.split('#').pop();
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
}