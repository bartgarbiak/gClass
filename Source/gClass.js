/**
 * Prototype inheritance based Classes implementation
 * Additional classes' features:
 *  - events
 *  - default options
 * Author: Bart Garbiak
 * Website: http://www.garbiak.com
 */
var _ = _ || {};
(function(obj, lib) {
    /**
     * Base function used for inheritance
     */
    obj.Base = function() {
        return this;
    };
    
    /**
     * 
     * @param {Object} options
     */
    obj.Base.prototype.setOptions = function(options) {
        this.options = lib.extend({}, this.options,options);
        if (this.parent.options) {
            this.parent.options = lib.extend(this.parent.options, options);
        }
    };
    
    /**
     * Adds event listener to Object
     * @param {String} event
     * @param {Function} func
     */
    obj.Base.prototype.on = function(event, func) {
        if (!this.events) {
            this.events = {};
        }

        if (this.events[event]) {
            this.events[event].push(func);
        }
        else {
            this.events[event] = [func];
        }
        return this;
    };
    
    /**
     * Removes selected event from Object
     * @param {String} event
     */
    obj.Base.prototype.off = function(event) {
        if (this.events && this.events[event]) {
            delete this.events[event];
        }
        return this;
    };

    /**
     * Fires selected event
     * @param {String} event
     * @param {Object} arg
     */
    obj.Base.prototype.trigger = function(event, arg) {
        var self = this;
        if (this.events && this.events[event]) {
            lib.each(this.events[event], function(index, func){
                func.call(self, arg);
            });
        }
        return this;
    };

    /**
     * @constructor
     * Creates function that inherits methods and properties from a given function or from obj.Base (if no argument is given)
     */
    obj.Class = function(parent) {
        var newClass = function(options) {
            this.setOptions(options);
            return this;
        };
        newClass.prototype = parent ? new parent() : new obj.Base();
        newClass.constructor = newClass;
        newClass.prototype.parent = parent ? parent.prototype : obj.Base.prototype;
        return newClass;
    };
})(_, $);