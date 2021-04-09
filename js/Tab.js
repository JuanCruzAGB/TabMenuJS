// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? TabMenu repository
import Link from "./Link.js";
import TabMenu from "./TabMenu.js";

/** @var {object} defaultProps Default properties. */
let defaultProps = {
    id: 'tab-1',
    target: undefined,
};

/** @var {object} defaultState Default state. */
let defaultState = {
    open: false,
    active: false,
};

/**
 * * Tab controls the tab button.
 * @export
 * @class Tab
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Tab extends Class {
    /**
     * * Creates an instance of Tab.
     * @param {object} [props] Tab properties:
     * @param {string} [props.id='tab-1'] Tab primary key.
     * @param {string} [props.target=undefined] Tab target.
     * @param {object} [state] Tab state:
     * @param {boolean} [state.open=false] Tab open status.
     * @param {boolean} [state.active=false] Tab active tab status.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    constructor (props = {
        id: 'tab-1',
        target: undefined,
    }, state = {
        open: false,
        active: false,
    }, tabmenu) {
        super({ ...defaultProps, ...props }, { ...defaultState, ...state });
        this.setLink(tabmenu);
        let htmls = document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-menu-list .tab`);
        for (const key in htmls) {
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                if (`tab-${ key }` == this.props.id) {
                    this.setHTML(html);
                }
            }
        }
    }

    /**
     * * Set the Tab Link HTML Element.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    setLink (tabmenu) {
        this.link = new Link({
            id: `${ this.props.id }-link`,
        }, {
            active: this.state.active,
        }, tabmenu, this);
    }

    /**
     * * Change the Tab open state.
     * @memberof Tab
     */
    switch () {
        switch (this.state.open) {
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
    open () {
        this.setState('open', true);
        if (this.html.classList.contains('closed')) {
            this.html.classList.remove('closed');
        }
        this.html.classList.add('opened');
        if (!this.state.active) {
            this.activate();
        }
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close () {
        this.setState('open', false);
        if (this.html.classList.contains('opened')) {
            this.html.classList.remove('opened');
        }
        this.html.classList.add('closed');
        if (this.state.active) {
            this.deactivate();
        }
    }

    /**
     * * Activate a Tab.
     * @memberof Tab
     */
    activate () {
        this.setState('active', true);
        this.link.activate();
    }

    /**
     * * Deactivate a Tab.
     * @memberof Tab
     */
    deactivate () {
        this.setState('active', false);
        this.link.deactivate();
    }

    /**
     * * Generates the TabMenu Tab.
     * @static
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {Tab[]}
     * @memberof Tab
     */
    static generate (tabmenu) {
        let tabs = [], htmls = document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-menu-list .tab`);
        for (const key in htmls) {
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                let link = html.children[0];
                for (const child of html.children) {
                    if (child.classList.contains('tab-link') && child.classList.contains('tab-button')) {
                        link = child;
                    }
                }
                tabs.push(new this(this.generateProperties(key, link), this.generateState(html, tabmenu), tabmenu));
            }
        }
        return tabs;
    }

    /**
     * * Generates the Tab properties.
     * @static
     * @param {Number} key Tab key.
     * @param {HTMLElement} link Tab Link HTML Element.
     * @returns {object}
     * @memberof Tab
     */
    static generateProperties (key, link) {
        return {
            id: `tab-${ key }`,
            target: ((link.href.split('#').pop()) ? link.href.split('#').pop() : undefined),
        };
    }

    /**
     * * Generates the Tab state.
     * @static
     * @param {HTMLElement} html Tab HTML Element.
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {object}
     * @memberof Tab
     */
    static generateState (html, tabmenu) {
        return {
            open: html.classList.contains('opened'),
            active: tabmenu.state.active,
        };
    }
}

// ? Tab childs
Tab.Link = Link;

// ? Default export
export default Tab;