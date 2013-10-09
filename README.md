gClass
======

Prototype inheritance based implementation of Classes, with defaults and events.

Prerequisites
----
The script uses two global variables: *_* and *$*. The latter is for Your favourite library. Can be anything as long as it provide *extend* method for objects compatible with jQuery API.
The former is a namespace variable, could be changed in source if necessary.  

Basic usage
----
First, define a class:

    var Animal = new _.Class();

Add some options (optionally):

    Animal.prototype.options = {
        name: 'Random animal'
    };

...and methods:

    Animal.prototype.walk = function() {
        console.log(this.options.name + ' is walking');
    };

Initialize:

    var animal = new Animal();
    animal.walk();

Inheritance
----

    var Cat = new _.Class(Animal);
    
    Cat.prototype.options = {
        type: 'cat'
    };

    Cat.prototype.walk = function() {
        console.log('Type of this animal is: ' + this.options.type);
        this.parent.walk.call(this);
    };

    Cat.prototype.speak = function() {
        console.log(this.options.name + ' says "mrauuu"');
    };

    var garfield = new Cat({
        name: 'Garfield'
    });
    
    garfield.walk();
    garfield.speak();

Further down the inheritance tree:

    var Tiger = new _.Class(Cat);

Events
----
Put a trigger for event in a method:

    Tiger.prototype.speak = function() {
        this.parent.speak.call(this);
        this.trigger('speak');
    };

    var tiger = new Tiger();

Add event:

    tiger.on('speak', function() {
       console.log(this.options.name + 'fired an event');
    });
    
Remove event:

    tiger.off('speak');


License
----
**The MIT License (MIT)**

Copyright (c) 2013 Bart Garbiak http://www.garbiak.com/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.