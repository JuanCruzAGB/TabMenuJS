/**
 * * Link controls the tab button.
 * @export
 * @class Link
 */
export class Link{
    /**
     * * Creates an instance of Link.
     * @param {Object} [properties] Link properties:
     * @param {String} [properties.id] Link ID.
     * @param {Object} [states] Link states:
     * @param {Boolean} [states.active=false] Link active status.
     * @param {TabMenu} tabmenu TabMenu.
     * @param {TabMenu} tab Tab Link parent.
     * @memberof Link
     */
    constructor(properties = {
        id: 'link-1',
    }, states = {
        active: false,
    }, tabmenu, tab){
        this.setProperties(properties);
        this.setStates(states);
        this.setHTML(tabmenu, tab);
    }

    /**
     * * Set the Link properties.
     * @param {Object} [properties] Link properties:
     * @param {String} [properties.id='link-1'] Link ID.
     * @memberof Link
     */
    setProperties(properties = {
        id: 'link-1',
    }){
        this.properties = {};
        this.setIDProperty(properties);
    }

    /**
     * * Returns the Link properties or an specific property.
     * @param {String} [name] Property name.
     * @returns {Object|*}
     * @memberof Link
     */
    getProperties(name = ''){
        if (name && name != '') {
            return this.properties[name];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} name Property name.
     * @returns {Boolean}
     * @memberof Link
     */
    hasProperty(name = ''){
        if (this.properties.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} name Property name.
     * @param {*} value Property value.
     * @memberof Link
     */
    changeProperty(name = '', value = ''){
        if (this.hasProperty(name)) {
            this.properties[name] = value;
        }
        switch (name) {
            default:
                break;
        }
    }

    /**
     * * Set the Link ID.
     * @param {Object} [properties] Link properties:
     * @param {String} [properties.id='link-1'] Link ID.
     * @memberof Link
     */
    setIDProperty(properties = {
        id: 'link-1',
    }){
        this.properties.id = ((properties.hasOwnProperty('id')) ? properties.id : 'link-1');
    }

    /**
     * * Returns the Link ID.
     * @returns {String}
     * @memberof Link
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Link states.
     * @param {Object} [states] Link states:
     * @param {Boolean} [states.active=false] Link active status.
     * @memberof Link
     */
    setStates(states = {
        active: false,
    }){
        this.states = {};
        this.setActiveStatus(states);
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Link
     */
    getStates(property = ''){
        if (property && property != '') {
            return this.states[property];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {String} name Status name.
     * @returns {Boolean}
     * @memberof Link
     */
    hasStates(name = ''){
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {String} name Status name.
     * @param {*} value Status value.
     * @memberof Link
     */
    changeStatus(name = '', value = ''){
        if (this.hasStates(name)) {
            this.states[name] = value;
        }
        switch (name) {
            case 'active':
                if (this.getStates('active')) {
                    if (!this.getHTML().classList.contains('active')) {
                        this.getHTML().classList.add('active');
                    }
                } else {
                    if (this.getHTML().classList.contains('active')) {
                        this.getHTML().classList.remove('active');
                    }
                }
                break;
        }
    }

    /**
     * * Set the Link active tab status.
     * @param {Object} [states] Link states:
     * @param {Boolean} [states.active=false] Link active tab status.
     * @memberof Link
     */
    setActiveStatus(states = {
        active: false,
    }){
        this.states.active = ((states.hasOwnProperty('active')) ? states.active : false);
    }

    /**
     * * Returns the Link active tabs status.
     * @returns {Boolean}
     * @memberof Link
     */
    getActiveStatus(){
        return this.states.active;
    }

    /**
     * * Set the Link HTML Element.
     * @param {TabMenu} tabmenu TabMenu.
     * @param {TabMenu} tab Tab Link parent.
     * @memberof Link
     */
    setHTML(tabmenu, tab){
        let intance = this;
        this.html = Link.getDomHTML(this.getProperties('id'), tabmenu);
        this.html.addEventListener('click', function(e){
            if (this.classList.contains('tab-button')) {
                e.preventDefault();
            }
            if (!tabmenu.getStates('execute')) {
                tabmenu.closeAll();
                tab.switch();
                tabmenu.execute(intance.getPathname());
            }
        });
    }

    /**
     * * Returns the Link HTML Element.
     * @returns {HTMLElement}
     * @memberof Link
     */
    getHTML(){
        return this.html;
    }

    /**
     * * Activate a Tab.
     * @memberof Tab
     */
    activate(){
        this.changeStatus('active', true);
    }

    /**
     * * Deactivate a Tab.
     * @memberof Tab
     */
    deactivate(){
        this.changeStatus('active', false);
    }

    /**
     * * Get the Link pathname.
     * @returns
     * @memberof Link
     */
    getPathname(){
        let https_regexp = new RegExp('https://');
        let http_regexp = new RegExp('http://');
        if(https_regexp.exec(this.getHTML().href)){
            let target = this.getHTML().href.split('https://').pop();
            https_regexp = new RegExp('/');
            return target.slice(https_regexp.exec(target).index).split('#').pop();
        }else if(http_regexp.exec(this.getHTML().href)){
            let target = this.getHTML().href.split('http://').pop();
            http_regexp = new RegExp('/');
            return target.slice(http_regexp.exec(target).index).split('#').pop();
        }else{
            return this.getHTML().href;
        }
    }

    /**
     * * Returns a Link HTML Element.
     * @static
     * @param {String} id Link ID.
     * @param {TabMenu} tabmenu Tab TabMenu parent.
     * @returns {HTMLElement[]}
     * @memberof Tab
     */
    static getDomHTML(id, tabmenu){
        let htmls = document.querySelectorAll(`#${ tabmenu.getProperties('id') }.tab-menu .tab-menu-list .tab`);
        for (const key in document.querySelectorAll(`#${ tabmenu.getProperties('id') }.tab-menu .tab-menu-list .tab`)) {
            if (htmls.hasOwnProperty(key)) {
                const html = htmls[key];
                if (`tab-${ key }-link` == id) {
                    for (const child of html.children) {
                        if (child.classList.contains('tab-link') || child.classList.contains('tab-button')) {
                            return child;
                        }
                    }
                }
            }
        }
    }
}