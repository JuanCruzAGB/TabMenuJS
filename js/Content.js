// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Content controls the TabMenu Content.
 * @export
 * @class Content
 * @extends {Class}
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 */
export default class Content extends Class {
    /**
     * * Creates an instance of Content.
     * @param {object} [data]
     * @param {object} [data.props]
     * @param {string} [data.props.id="content-1"] Content primary key.
     * @param {object} [data.state]
     * @param {boolean} [data.state.open=false] If the Content should be open.
     * @param {HTMLElement} [data.html] Content HTML Element.
     * @memberof Content
     */
    constructor (data = {
        props: {
            id: "content-1",
        }, state: {
            open: false,
        }, html,
    }) {
        super({
            props: {
                ...Content.props,
                ...(data && data.hasOwnProperty("props")) ? data.props : {},
            }, state: {
                ...Content.state,
                ...(data && data.hasOwnProperty("state")) ? data.state : {},
            },
        });
        this.setHTML(data.html);
    }

    /**
     * * Close the Content.
     * @memberof Content
     */
    close () {
        this.setState("open", false);
        this.html.classList.remove("opened");
    }

    /**
     * * Open the Content.
     * @memberof Content
     */
    open () {
        this.setState("open", true);
        this.html.classList.add("opened");
    }

    /**
     * * Generates the TabMenu Content.
     * @static
     * @param {TabMenu} TabMenu Content TabMenu parent.
     * @returns {Content[]}
     * @memberof Content
     */
    static generate (TabMenu) {
        let contents = [];
        let htmls = this.querySelector(TabMenu.props.id);
        for (const key in htmls) {
            if (Object.hasOwnProperty.call(htmls, key)) {
                contents.push(new this({
                    props: {
                        id: (htmls[key].hasAttribute("id") ? htmls[key].id : `content-${ key }`),
                    }, state: {
                        open: htmls[key].classList.contains("open"),
                    }, html: htmls[key],
                }));
            }
        }
        return contents;
    }

    /**
     * * Returns all the TabMenu Contents HTMLElements.
     * @static
     * @param {string} id TabMenu primary key.
     * @returns {HTMLElement[]}
     * @memberof Content
     */
    static querySelector (id = false) {
        if (id) {
            return document.querySelectorAll(`#${ id }.tab-menu .tab-content-list .tab-content`);
        }
        if (!id) {
            console.error("ID param is required to get the TabMenu Contents");
            return [];
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "content-1",
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        open: false,
    }
}