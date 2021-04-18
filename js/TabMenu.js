// ? JuanCruzAGB repository
import Class from '../../JuanCruzAGB/js/Class.js';

// ? TabMenuJS repository
import Tab from './Tab.js';
import Content from './Content.js';

/** @var {object} defaultProps Default properties. */
let defaultProps = {
    id: 'tab-menu-1',
};

/** @var {object} defaultState Default state. */
let defaultState = {
    open: [],
    active: undefined,
};

/**
 * * TabMenu makes an excellent tab menu.
 * @export
 * @class TabMenu
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class TabMenu extends Class {
    /**
     * * Creates an instance of TabMenu.
     * @param {object} [props] TabMenu properties:
     * @param {string} [props.id='tabmenu-1'] TabMenu primary key.
     * @param {object} [state] TabMenu state:
     * @param {string[]} [state.open=[]] TabMenu open tabs state.
     * @param {string} [state.active=undefined] TabMenu active tab state.
     * @param {object} [callback] TabMenu click callback.
     * @param {function} [callback.function] TabMenu click callback function.
     * @param {object} [callback.params] TabMenu click callback params.
     * @memberof TabMenu
     */
    constructor (props = {
        id: 'tab-menu-1',
    }, state = {
        open: [],
        active: undefined,
    }, callback = {
        function: () => { /* console.log('Tab changed'); */ },
        params: {
            //
    }}) {
        super({ ...defaultProps, ...props }, { ...defaultState, ...state });
        this.setCallbacks({
            default: callback,
        });
        this.setHTML(`#${ this.props.id }.tab-menu`);
        this.setContents();
        this.setTabs();
        this.checkState();
    }

    /**
     * * Check the TabMenu state values.
     * @memberof TabMenu
     */
    checkState () {
        this.checkOpenState();
        this.checkActiveState();
    }

    /**
     * * Check the TabMenu open state.
     * @memberof TabMenu
     */
    checkOpenState () {
        if (this.state.open.length) {
            for (const target of this.state.open) {
                for (const tab of this.tabs) {
                    if (tab.html.classList.contains('tab-button')) {
                        if (tab.props.target === target) {
                            tab.open();
                        } else {
                            tab.close();
                        }
                    }
                }
                for (const content of this.contents) {
                    if (content.props.id === target) {
                        content.open();
                    } else {
                        content.close();
                    }
                }
            }
        }
    }

    /**
     * * Check the TabMenu state.
     * @memberof TabMenu
     */
    checkActiveState () {
        if (this.state.active) {
            for (const tab of this.tabs) {
                if (tab.link.getPathname() == this.state.active) {
                    tab.activate();
                } else {
                    tab.deactivate();
                }
            }
        }
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

    /**
     * * Open a Content.
     * @param {object} [open=[]] TabMenu open tabs state.
     * @memberof TabMenu
     */
    open (open = []) {
        this.setState('open', open);
        this.checkOpenState();
    }

    /**
     * * Close all the Contents and Tabs.
     * @memberof TabMenu
     */
    closeAll () {
        for (const tab of this.tabs) {
            tab.close();
        }
        for (const content of this.contents) {
            content.close();
        }
    }

    /**
     * * Execute the TabMenu click function.
     * @param {string} id Tab clicked target.
     * @memberof TabMenu
     */
    execute (id) {
        for (const content of this.contents) {
            if (id == content.props.id || content.checkSection(id)) {
                this.setState('open', [content.props.id]);
                this.checkOpenState();
                content.open();
            } else {
                content.close();
            }
        }
        this.callbacks.default.function({
            ...this.callbacks.default.params,
            tabmenu: this,
        });
    }
}

// ? TabMenu childs
TabMenu.Tab = Tab;
TabMenu.Content = Content;

// ? Default export
export default TabMenu;