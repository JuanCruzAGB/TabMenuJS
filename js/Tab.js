// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

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
     * @param {string} [props.type='button'] Tab type.
     * @param {object} [state] Tab state:
     * @param {boolean} [state.open=false] Tab open status.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    constructor (props = {
        id: 'tab-1',
        target: undefined,
        type: "button",
    }, state = {
        open: false,
    }, tabmenu) {
        super({ ...Tab.props, ...props }, { ...Tab.state, ...state });
        this.setButtons(tabmenu);
        this.setHTML(`#${ tabmenu.props.id }.tab-menu .tab-menu-list #tab-${ this.props.target }.tab`);
    }

    /**
     * * Set the Tab Link HTML Element.
     * @param {TabMenu} tabmenu TabMenu.
     * @memberof Tab
     */
    setButtons (tabmenu) {
        let instance = this;
        if (!this.buttons) {
            this.buttons = [];
        }
        for (const btn of document.querySelectorAll(`a[href='#${ this.props.target }'].tab-button`)) {
            this.buttons.push(btn);
            btn.addEventListener('click', function (e) {
                tabmenu.open(instance.props.target);
            })
        }
    }

    /**
     * * Open the Tab.
     * @memberof Tab
     */
    open () {
        if (this.props.type === 'button') {
            this.setState('open', true);
            this.html.classList.add('opened');
            for (const btn of this.buttons) {
                btn.classList.add('opened');
            }
        }
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close () {
        if (this.props.type === 'button') {
            this.setState('open', false);
            if (this.html.classList.contains('opened')) {
                this.html.classList.remove('opened');
            }
            for (const btn of this.buttons) {
                btn.classList.remove('opened');
            }
        }
    }

    /**
     * * Generates the TabMenu Tab.
     * @static
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {Tab[]}
     * @memberof Tab
     */
    static generate (tabmenu) {
        let tabs = [];
        for (const html of document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-menu-list .tab`)) {
            console.log(html.querySelector(".tab-button"));
            tabs.push(new this({
                id: html.id,
                target: html.id.split('tab-')[1],
                type: ((html.classList.contains("tab-button") || html.querySelector(".tab-button")) ? "button" : "link"),
            }, {
                open: html.classList.contains('opened'),
            }, tabmenu));
        }
        return tabs;
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'tab-1',
        target: undefined,
        type: "button",
    };
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    };
}

// ? Default export
export default Tab;