import {Content} from "./Content.js";

/**
 * * Tab controls the tab button.
 * @export
 * @class Tab
 */
export class Tab{
    /**
     * * Creates an instance of Tab.
     * @param {HTMLElement} html - Tab HTML Element.
     * @param {Content[]]} contents - TabMenu Contents.
     * @memberof Tab
     */
    constructor(html = undefined, contents = [],){
        this.setHTML(html, contents);
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
        this.setName();
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
     * * Set the Tab name.
     * @memberof Tab
     */
    setName(){
        this.propertoes.name = this.html.dataset.name;
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
     * @param {Content[]]} contents - TabMenu Contents.
     * @memberof Tab
     */
    setHTML(html = undefined, contents = [],){
        let tab = this;
        this.html = html;
        this.html.addEventListener('click', function(e){
            if(this.html.classList.contains('tab-button')){
                e.preventDefault();
                tab.switch();
                for(const content of contents){
                    if(this.href.split('#').pop() == content.properties.name){
                        content.switch();
                    }
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
     * * Search the current Tab open.
     * @static
     * @param {string} name - Tab name.
     * @param {Tab[]} tabs - Tabs created.
     * @param {Content[]} contents - Contents created.
     * @memberof Tab
     */
    static open(name = '', tabs = [], contents = [],){
        let state = false;
        for(const tab of tabs){
            if(name == tab.properties.name){
                state = tab.switch();
                if(state){
                    Content.open(tab.target, contents);
                }
            }
        }
    }
}