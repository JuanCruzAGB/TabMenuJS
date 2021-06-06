// ? JuanCruzAGB repository
import Class from '../../JuanCruzAGB/js/Class.js';

// ? TabMenuJS repository
import Tab from './Tab.js';
import Content from './Content.js';

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
     * @param {string} [state.open=false] TabMenu tab opened.
     * @param {object} [callback] TabMenu click callback.
     * @param {function} [callback.function] TabMenu click callback function.
     * @param {object} [callback.params] TabMenu click callback params.
     * @memberof TabMenu
     */
    constructor (props = {
        id: 'tab-menu-1',
    }, state = {
        open: false,
    }, callback = {
        function: (params) => { /* console.log('Tab changed'); */ },
        params: {}
    }) {
        super({ ...TabMenu.props, ...props }, { ...TabMenu.state, ...state });
        this.setCallbacks({ default: { ...TabMenu.callback, ...callback } });
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

    /**
     * * Check the TabMenu state values.
     * @memberof TabMenu
     */
    checkState () {
        this.checkOpenState();
    }

    /**
     * * Check the TabMenu Contents open state.
     * @memberof TabMenu
     */
    checkContentOpenState () {
        for (const content of this.contents) {
            if (content.props.id === this.state.open) {
                content.open();
            } else {
                content.close();
            }
        }
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
     * * Check the TabMenu Tabs open state.
     * @memberof TabMenu
     */
    checkTabOpenState () {
        for (const tab of this.tabs) {
            if (tab.props.target === this.state.open) {
                tab.open();
            } else {
                tab.close();
            }
        }
    }

    /**
     * * Open a Content.
     * @param {string} target Tab target.
     * @param {object} [params] Params to send to the function.
     * @memberof TabMenu
     */
    open (target, params = {}) {
        this.setState('open', target);
        this.checkTabOpenState();
        this.checkContentOpenState();
        this.execute('default', {
            ...params,
            TabMenuJS: this,
        });
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'tab-menu-1',
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
     * @var {object} callback Default callback.
     */
    static callback = {
        function: (params) => { /* console.log('Tab changed'); */ },
        params: {}
    }
}

// ? TabMenu childs
TabMenu.Tab = Tab;
TabMenu.Content = Content;

// ? Default export
export default TabMenu;