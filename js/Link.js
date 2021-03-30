// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Link controls the tab button.
 * @export
 * @class Link
 * @extends {Class}
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Link extends Class {
    /**
     * * Creates an instance of Link.
     * @param {object} [props] Link properties:
     * @param {string} [props.id] Link primary key.
     * @param {object} [state] Link state:
     * @param {boolean} [state.active=false] Link active status.
     * @param {TabMenu} tabmenu TabMenu.
     * @param {TabMenu} tab Tab Link parent.
     * @memberof Link
     */
    constructor (props = {
        id: 'link-1',
    }, state = {
        active: false,
    }, tabmenu, tab) {
        super(props, state);
        let intance = this;
        let htmls = document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-menu-list .tab`);
        for (const key in document.querySelectorAll(`#${ tabmenu.props.id }.tab-menu .tab-menu-list .tab`)) {
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                if (`tab-${ key }-link` == this.props.id) {
                    for (const child of html.children) {
                        if (child.classList.contains('tab-link') || child.classList.contains('tab-button')) {
                            this.setHTML(child);
                        }
                    }
                }
            }
        }
        this.html.addEventListener('click', function (e) {
            if (this.classList.contains('tab-button')) {
                e.preventDefault();
                tabmenu.closeAll();
                tab.switch();
                tabmenu.execute(intance.getPathname());
            }
        });
    }

    /**
     * * Activate a Tab.
     * @memberof Tab
     */
    activate () {
        this.setState('active', true);
        if (!this.html.classList.contains('active')) {
            this.html.classList.add('active');
        }
    }

    /**
     * * Deactivate a Tab.
     * @memberof Tab
     */
    deactivate () {
        this.setState('active', false);
        if (this.html.classList.contains('active')) {
            this.html.classList.remove('active');
        }
    }

    /**
     * * Get the Link pathname.
     * @returns
     * @memberof Link
     */
    getPathname () {
        let https_regexp = new RegExp('https://');
        let http_regexp = new RegExp('http://');
        if (https_regexp.exec(this.html.href)) {
            let target = this.html.href.split('https://').pop();
            https_regexp = new RegExp('/');
            return target.slice(https_regexp.exec(target).index).split('#').pop();
        } else if (http_regexp.exec(this.html.href)) {
            let target = this.html.href.split('http://').pop();
            http_regexp = new RegExp('/');
            return target.slice(http_regexp.exec(target).index).split('#').pop();
        } else {
            return this.html.href;
        }
    }
}

// ? Defaul export
export default Link;