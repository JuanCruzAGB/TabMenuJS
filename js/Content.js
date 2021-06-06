// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Content controls the TabMenu Content.
 * @export
 * @class Content
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Content extends Class {
    /**
     * * Creates an instance of Content.
     * @param {object} [props] Content properties:
     * @param {string} [props.id='content-1'] Content primary key.
     * @param {object} [state] Content state:
     * @param {boolean} [state.open=false] Content open status.
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @memberof Content
     */
    constructor (props = {
        id: 'content-1',
    }, state = {
        open: false,
    }, tabmenu) {
        super({ ...Content.props, ...props }, { ...Content.state, ...state });
        this.setHTML(`#${ tabmenu.props.id }.tab-menu .tab-content-list #${ this.props.id }.tab-content`);
    }

    /**
     * * Open the Content.
     * @memberof Content
     */
    open () {
        this.setState('open', true);
        this.html.classList.add('opened');
    }

    /**
     * * Close the Content.
     * @memberof Content
     */
    close () {
        this.setState('open', false);
        if (this.html.classList.contains('opened')) {
            this.html.classList.remove('opened');
        }
    }

    /**
     * * Generates the TabMenu Content.
     * @static
     * @param {TabMenu} tabmenu Content TabMenu parent.
     * @returns {Content[]}
     * @memberof Content
     */
    static generate (tabmenu) {
        let contents = [];
        for (const html of document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-content-list .tab-content`)) {
           contents.push(new this({ id: html.id }, { open: html.classList.contains('opened') }, tabmenu));
        }
        return contents;
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'content-1',
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
export default Content;