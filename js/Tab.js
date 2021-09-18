// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Tab controls the tab button.
 * @export
 * @class Tab
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Tab extends Class {
    /**
     * * Creates an instance of Tab.
     * @param {object} [data]
     * @param {object} [data.props] Tab properties:
     * @param {string} [data.props.id="tab-1"] Tab primary key.
     * @param {string} [data.props.target=undefined] Tab target.
     * @param {string} [data.props.type="button"] Tab type.
     * @param {object} [data.state] Tab state:
     * @param {boolean} [data.state.open=false] Tab open status.
     * @param {HTMLElement} [data.html] Tab HTML Element.
     * @param {TabMenu} [data.TabMenu] Tab TabMenu parent.
     * @memberof Tab
     */
    constructor (data = {
        props: {
            id: "tab-1",
            target: false,
            type: "button",
        }, state: {
            open: false,
        }, html,
        TabMenu,
    }) {
        super({ ...Tab.props, ...((data && data.hasOwnProperty("props")) ? data.props : {}) }, { ...Tab.state, ...((data && data.hasOwnProperty("state")) ? data.state : {}) });
        this.setHTMLs([ data.html ], data.TabMenu);
    }

    /**
     * * Set the Tab HTML Elements.
     * @param {HTMLElement[]} htmls
     * @param {TabMenu} TabMenu Tab TabMenu parent.
     * @memberof Tab
     */
    setHTMLs (htmls = [], TabMenu) {
        if (!this.htmls) {
            this.htmls = [];
        }
        for (const html of htmls) {
            btn.addEventListener("click", (e) => {
                if (this.props.type == "button") {
                    e.preventDefault();
                }
                TabMenu.open(this.props.target);
            })
            this.htmls.push(html);
        }
    }

    /**
     * * Close the Tab.
     * @memberof Tab
     */
    close () {
        this.setState("open", false);
        this.html.classList.remove("opened");
    }

    /**
     * * Open the Tab.
     * @memberof Tab
     */
    open () {
        this.setState("open", true);
        btn.classList.add("opened");
    }

    /**
     * * Generates the TabMenu Tab.
     * @static
     * @param {TabMenu} TabMenu Tab TabMenu parent.
     * @returns {Tab[]}
     * @memberof Tab
     */
    static generate (TabMenu) {
        let tabs = [];
        let htmls = this.querySelector(TabMenu.props.id);
        for (const key in htmls) {
            if (Object.hasOwnProperty.call(htmls, key)) {
                let found = false;
                for (const tab of tabs) {
                    if (tab.props.target && tab.props.target == (htmls[key].hasAttribute("href") ? htmls[key].href.split("#").pop().split("?").shift() : false)) {
                        tab.setHTMLs([htmls[key]], TabMenu);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tabs.push(new this({
                        props: {
                            id: (htmls[key].hasAttribute("id") ? htmls[key].id : `tab-${ key }`),
                            target: (htmls[key].hasAttribute("href") ? htmls[key].href.split("#").pop().split("?").shift() : false),
                            type: (htmls[key].classList.contains("tab-button") ? "button" : "link"),
                        }, state: {
                            open: html.classList.contains("opened"),
                        }, html: htmls[key],
                        TabMenu: TabMenu,
                    }));
                }
            }
        }
        return tabs;
    }

    /**
     * * Returns all the TabMenu Tabs HTMLElements.
     * @static
     * @param {string} id TabMenu primary key.
     * @returns {HTMLElement[]}
     * @memberof Tab
     */
    static querySelector (id = false) {
        if (id) {
            return document.querySelectorAll(`.${ id }.tab`);
        }
        if (!id) {
            console.error("ID param is required to get the TabMenu Tabs");
            return [];
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "tab-1",
        target: false,
        type: "button",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    }
}