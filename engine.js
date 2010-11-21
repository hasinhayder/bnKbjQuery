/**
 * BanglaInputManager jQuery Plugin for typing bangla into web pages. 
 * This is the main engine and require any one or more of the following drivers
 * like phonetic, probhat, unijoy or inscript.
 * 
 * @author: Hasin Hayder from Ekushey Team
 * @version: 0.11
 * @license: New BSD License
 * @date: 2010-03-08 [8th March, 2010]
 * 
 * Contact at [hasin: countdraculla@gmail.com, manchu: manchumahara@gmail.com, omi: omi: omiazad@gmail.com]
 *
 * Changelog
 * Nov 21, 2010 - Fixed switch key browser incompatibility issue reported by Manchu and Sarim Khan.
 */
$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
(function($){
    var opts;
    var common = 1;
    var switched = 0;
    var ctrlPressed;
    var lastInsertedString = "";
    var writingMode = "b";
    var carry;
    var switchKey = "y";
    
    $.fn.bnKb = function(options){
        var defaults = {
            "switchkey": {
                "webkit":"k",
                "mozilla":"y",
                "safari":"k",
                "chrome":"k",
                "msie":"y"
            },
            "driver": phonetic
        };
        // Extend our default options with those provided.
        opts = $.extend(defaults, options);
        writingMode = "b";
        carry = "";
        $(this).unbind("keypress keydown keyup");
        
        $(this).keyup($.fn.bnKb.ku);
        $(this).keydown($.fn.bnKb.kd);
        $(this).keypress($.fn.bnKb.kp);

        /* Browser Specific Switch Key fix - Thanks to Sarim Khan */
        if($.browser.chrome) switchKey = opts.switchkey.chrome;
        else if($.browser.safari || $.browser.safari ) switchKey = opts.switchkey.webkit;
        else if($.browser.msie) switchKey = opts.switchkey.msie;
        else if($.browser.mozilla) switchKey = opts.switchkey.mozilla;

    }
    
    /**
     * handle keypress event
     * @param event ev
     */
    $.fn.bnKb.kp = function(ev){
        var keycode = ev.which;
        var keycode =  ev.keyCode ? ev.keyCode : ev.which;
        var keystring = String.fromCharCode(keycode);
        //lets check if writing mode is english. if so, dont process anything
        if (writingMode == "e") 
            return true;
        //end mode check
        
        
        if (ctrlPressed) 
            $("#stat").html("Not Processing");
        else {
            var _carry = carry;
            carry += keystring;
            //processing intellisense
            if (opts.driver.supportIntellisense) {
                var mods = opts.driver.intellisense(keystring, _carry);
                if (mods) {
                    keystring = mods.keystring
                    carry = mods.carry;
                }
            }
            //end intellisense
            
            
            var replacement = opts.driver.keymaps[carry];
            if (replacement) {
                $.fn.bnKb.iac(this, replacement, 1);
                ev.stopPropagation();
                return false;
            }
            //carry processing end
            
            //if no equivalent is found for carry, then try it with relpacement itself
            replacement = opts.driver.keymaps[keystring];
            carry = keystring;
            if (replacement) {
                $.fn.bnKb.iac(this, replacement, 0);
                ev.stopPropagation();
                return false;
            }
            
            //nothing found, leave it as is
            lastInsertedString = "";
            return true;
        }
    }
    
    /**
     * handle keydown event
     * @param {event} ev
     */
    $.fn.bnKb.kd = function(ev){
        var keycode =  ev.keyCode ? ev.keyCode : ev.which;
        var keystring = String.fromCharCode(keycode).toLowerCase();
        if (keycode == 17 || keycode == 224 || keycode==91) {
            ctrlPressed = true;
        }
        //lets check if user pressed the switchkey, then toggle the writing mode
        if (ctrlPressed && keystring == switchKey) {
            //console.log("Switching");
            (writingMode == "b") ? writingMode = "e" : writingMode = "b";
        }
    //end processing switchkey
    }
    
    /**
     * handle keyup event
     * @param event ev
     */
    $.fn.bnKb.ku = function(ev){
        var keycode =  ev.keyCode ? ev.keyCode : ev.which;
        if (keycode == 17 || keycode == 224 || keycode==91) {
            ctrlPressed = false;
        }
        
    }
    
    
    /**
     * insert some string at current cursor position in a textarea or textbox
     * @param DOMElement obj
     * @param string input the string to insert in the textarea or textbox at cursor's current location
     * @param int length to shift
     * @param int type 0 for normal insertion, 1 for conjunct insertion
     */
    $.fn.bnKb.iac = function(obj, input, type){
        var myField = obj;
        var myValue = input;
        
        len = lastInsertedString.length;
        if (!type) 
            len = 0;
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            if (myField.value.length >= len) { // here is that first conjunction bug in IE, if you use the > operator
                sel.moveStart('character', -1 * (len));
            }
            sel.text = myValue;
            sel.collapse(true);
            sel.select();
        }
        //MOZILLA/NETSCAPE support
        else {
            if (myField.selectionStart || myField.selectionStart == 0) {
                myField.focus();
                var startPos = myField.selectionStart - len;
                var endPos = myField.selectionEnd;
                var scrollTop = myField.scrollTop;
                startPos = (startPos == -1 ? myField.value.length : startPos);
                myField.value = myField.value.substring(0, startPos) +
                myValue +
                myField.value.substring(endPos, myField.value.length);
                myField.focus();
                myField.selectionStart = startPos + myValue.length;
                myField.selectionEnd = startPos + myValue.length;
                myField.scrollTop = scrollTop;
            }
            else {
                var scrollTop = myField.scrollTop;
                myField.value += myValue;
                myField.focus();
                myField.scrollTop = scrollTop;
            }
        }
        lastInsertedString = myValue;
    }
    
})(jQuery);
