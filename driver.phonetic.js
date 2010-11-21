/**
 * Phonetic driver to be used with BanglaInputManager jQuery Plugin developed by Ekushey
 * This is set as default driver for BIM plugin
 * 
 * @author: Hasin Hayder from Ekushey Team
 * @version: 0.1
 * @license: New BSD License
 * @date: 2010-03-08 [8th March, 2010]
 * 
 * Contact at [hasin: countdraculla@gmail.com, manchu: manchumahara@gmail.com, omi: omi: omiazad@gmail.com]
 */
var phonetic = {
    keymaps: {
        'k': '\u0995',
        '0': '\u09E6',
        '1': '\u09E7',
        '2': '\u09E8',
        '3': '\u09E9',
        '4': '\u09EA',
        '5': '\u09EB',
        '6': '\u09EC',
        '7': '\u09ED',
        '8': '\u09EE',
        '9': '\u09EF',
        'i': '\u09BF',
        'I': '\u0987',
        'ii': '\u09C0',
        'II': '\u0988',
        'e': '\u09C7',
        'E': '\u098F',
        'U': '\u0989',
        'u': '\u09C1',
        'uu': '\u09C2',
        'UU': '\u098A',
        'r': '\u09B0',
        'WR': '\u098B',
        'a': '\u09BE',
        'A': '\u0986',
        'ao': '\u0985',
        'Ao': '\u0985',
        's': '\u09B8',
        't': '\u099F',
        'K': '\u0996',
        'kh': '\u0996',
        'n': '\u09A8',
        'N': '\u09A3',
        'T': '\u09A4',
        'Th': '\u09A5',
        'd': '\u09A1',
        'dh': '\u09A2',
        'b': '\u09AC',
        'bh': '\u09AD',
        'v': '\u09AD',
        'R': '\u09DC',
        'Rh': '\u09DD',
        'g': '\u0997',
        'G': '\u0998',
        'gh': '\u0998',
        'h': '\u09B9',
        'NG': '\u099E',
        'j': '\u099C',
        'J': '\u099D',
        'jh': '\u099D',
        'c': '\u099A',
        'ch': '\u099B',
        'C': '\u099B',
        'th': '\u09A0',
        'p': '\u09AA',
        'f': '\u09AB',
        'ph': '\u09AB',
        'D': '\u09A6',
        'Dh': '\u09A7',
        'z': '\u09AF',
        'y': '\u09DF',
        'Ng': '\u0999',
        'ng': '\u0982',
        'l': '\u09B2',
        'm': '\u09AE',
        'sh': '\u09B6',
        'S': '\u09B7',
        'O': '\u0993',
        'ou': '\u099C',
        'OU': '\u0994',
        'Ou': '\u0994',
        'Oi': '\u0990',
        'OI': '\u0990',
        'tt': '\u09CE',
        'H': '\u0983',
        '.': '\u0964',
        '..': '\u002E',
        'HH': '\u09CD\u200C',
        'NN': '\u0981',
        'Y': '\u09CD\u09AF',
        'w': '\u09CD\u09AC',
        'W': '\u09C3',
        'wr': '\u09C3',
        'x': '\u0995\u09CD\u09B8',
        'rY': '\u09B0\u200D\u09CD\u09AF',
        'L': '\u09B2',
        'Z': '\u09AF',
        'P': '\u09AA',
        'V': '\u09AD',
        'B': '\u09AC',
        'M': '\u09AE',
        'X': '\u0995\u09CD\u09B8',
        'F': '\u09AB',
        "+": '\u09CD',
        "++": "+",
        "o":'\u09CB',
        "oI":'\u09C8',
        "oU":"\u09CC"
    },
    supportIntellisense: true,
    intellisense: function(currentinput, lastcarry){
        var vowels = 'aIiUuoiiouueEiEu';
        if ((vowels.indexOf(lastcarry) != -1 && vowels.indexOf(currentinput) != -1) || (lastcarry == " " && vowels.indexOf(currentinput) != -1)) {
            //let's check for dhirgho i kar and dhirgho u kar :P	
            carry = lastcarry + currentinput;
            if (carry == 'ii' || carry == 'uu') 
                newkeystring = currentinput;
            else 
                newkeystring = currentinput.toUpperCase();
            
            newcarry = lastcarry + newkeystring;
            mods = {
                keystring: newkeystring,
                carry: newcarry
            }
            return mods;
        }
        return false;
    }
};
