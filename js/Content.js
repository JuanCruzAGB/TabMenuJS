// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} defaultProps Default properties. */
let defaultProps = {
    id: 'content-1',
};

/** @var {object} defaultState Default state. */
let defaultState = {
    open: false,
};

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
        super({ ...defaultProps, ...props }, { ...defaultState, ...state });
        this.setHTML(`#${ tabmenu.props.id }.tab-menu .tab-content-list #${ this.props.id }.tab-content`);
        this.setSections();
    }

    /**
     * * Set the Content inside sections.
     * @memberof Content
     */
    setSections () {
        let sections;
        this.sections = [];
        if (sections = this.html.dataset.sections) {
            for(const section of sections.split(',')){
                this.sections.push(section);
            }
        }
    }

    /**
     * * Check if the section is inside the Content.
     * @param {string} name Section name.
     * @returns {boolean}
     * @memberof Content
     */
    checkSection (name) {
        if (this.sections) {
            for (const section of this.sections) {
                if (section == name) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * * Open the Content.
     * @memberof Content
     */
    open () {
        this.setState('open', true);
        if (this.html.classList.contains('closed')) {
            this.html.classList.remove('closed');
        }
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
        this.html.classList.add('closed');
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
           contents.push(new this(this.generateProperties(html), this.generateState(html), tabmenu));
        }
        return contents;
    }

    /**
     * * Generates the Content properties.
     * @static
     * @param {HTMLElement} html Content HTML Element.
     * @returns {object}
     * @memberof Content
     */
    static generateProperties(html){
        return {
            id: html.id,
        };
    }

    /**
     * * Generates the Content state.
     * @static
     * @param {HTMLElement} html Content HTML Element.
     * @returns {object}
     * @memberof Content
     */
    static generateState(html){
        return {
            open: html.classList.contains('opened'),
        };
    }
}

// ? Default export
export default Content;