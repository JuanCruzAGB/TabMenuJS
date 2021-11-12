// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? TabMenuJS repository
import Content from "./Content.js";
import Tab from "./Tab.js";

/**
 * * TabMenu makes an excellent tab menu.
 * @export
 * @class TabMenu
 * @extends {Class}
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 */
export default class TabMenu extends Class {
    /**
     * * Creates an instance of TabMenu.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="tabmenu-1"] TabMenu primary key.
     * @param {object} [data.state]
     * @param {string} [data.state.open=false] If a TabMenu Tab should be opened.
     * @param {object} [data.callbacks]
     * @param {object} [data.callbacks.close]
     * @param {function} [data.callbacks.close.function]
     * @param {object} [data.callbacks.close.params]
     * @param {object} [data.callbacks.open]
     * @param {function} [data.callbacks.open.function]
     * @param {object} [data.callbacks.open.params]
     * @memberof TabMenu
     */
    constructor (data = {
        props: {
            id: "tab-menu-1",
        }, state: {
            open: false,
        }, callbacks: {
            close: {
                function: (params) => { /* console.log("params"); */ },
                params: {}
            }, open: {
                function: (params) => { /* console.log("params"); */ },
                params: {}
            },
        },
    }) {
        super({
            props: {
                ...TabMenu.props,
                ...(data && data.hasOwnProperty("props")) ? data.props : {},
            }, state: {
                ...TabMenu.state,
                ...(data && data.hasOwnProperty("state")) ? data.state : {},
            },
        });
        this.setCallbacks({ ...TabMenu.callbacks, ...((data && data.hasOwnProperty("callbacks")) ? data.callbacks : {}) });
        this.setHTML(`#${ this.props.id }.tab-menu`);
        this.setContents();
        this.setTabs();
        this.checkState();
    }

    /**
     * * Set the TabMenu Contents.
     * @memberof TabMenu
     */
    setContents () {
        this.contents = Content.generate(this);
    }

    /**
     * * Set the TabMenu Tabs.
     * @memberof TabMenu
     */
    setTabs () {
        this.tabs = Tab.generate(this);
    }

    getSection (target = false) {
        if (target) {
            let found = false;
            for (const content of this.contents) {
                if (content.props.id == target) {
                    if (!found) {
                        found = {};
                    }
                    found.content = content;
                    break;
                }
            }
            for (const tab of this.tabs) {
                if (tab.props.target == target) {
                    if (!found) {
                        found = {};
                    }
                    found.tab = tab;
                    break;
                }
            }
            return found;
        }
        if (!target) {
            console.error("Target is required to get the TabMenu section");
            return false;
        }
    }

    /**
     * * Check the TabMenu state values.
     * @memberof TabMenu
     */
    checkState () {
        this.checkOpenState();
    }

    /**
     * * Check the TabMenu open state.
     * @memberof TabMenu
     */
    checkOpenState () {
        if (this.state.open) {
            this.open(this.state.open);
        }
    }

    /**
     * * Close the TabMenu Contents.
     * @param {object} [params]
     * @memberof TabMenu
     */
    close (params = {}) {
        for (const content of this.contents) {
            content.close();
        }
        for (const tab of this.tabs) {
            tab.close();
        }
        this.execute("close", {
            ...params,
            ...this.callbacks.close.params,
            TabMenu: this,
        });
    }

    /**
     * * Open a TabMenu Content.
     * @param {string} target Content target.
     * @param {object} [params]
     * @memberof TabMenu
     */
    open (target = false, params = {}) {
        if (target) {
            this.setState("open", target);
            let found = this.getSection(this.state.open);
            if (found) {
                for (const content of this.contents) {
                    content.close();
                }
                for (const tab of this.tabs) {
                    tab.close();
                }
                if (found.content) {
                    found.content.open();
                }
                if (found.tab) {
                    found.tab.open();
                }
                this.execute("open", {
                    ...params,
                    ...this.callbacks.open.params,
                    Content: found.content,
                    open: this.state.open,
                    Tab: found.tab,
                    TabMenu: this,
                });
            }
            return found;
        }
        if (!target) {
            console.error("Target is required is open a TabMenu Content");
            return false;
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "tab-menu-1",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    }
    
    /**
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        close: {
            function: (params) => { /* console.log("params"); */ },
            params: {}
        }, open: {
            function: (params) => { /* console.log("params"); */ },
            params: {}
        },
    }

    /** 
     * @static
     * @var {Content} Content
     */
    static Content = Content

    /** 
     * @static
     * @var {Tab} Tab
     */
    static Tab = Tab
}