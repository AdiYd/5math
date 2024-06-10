export const debug = (...args) => {
    if (args[args.length - 1].constructor === Object) {
        let p = args[args.length - 1];
        if (p.color || p.background || p.fontSize || p.fontWeight || p.textShadow || p.textBorder) {
            let settings = ``;
            settings += p.color ? `color: ${p.color} ; ` : '';
            settings += p.background ? `background: ${p.background} ; ` : '';
            settings += p.fontSize ? `font-size: ${p.fontSize}px ;` : '';
            settings += p.fontWeight ? `font-weight: ${p.fontWeight} ;` : '';
            settings += p.textShadow || p.textBorder ? `text-shadow: ${p.textShadow ? '1px 1px 2px rgb(217,31,38) , 2px 2px 1px rgb(226,91,14), 3px 3px 1px rgb(245,221,8) , 4px 4px 1px rgb(5,148,68)' : ''} ${p.textBorder ? `${p.textShadow ? ',' : ''} 0px 0px 1px ${p.textBorder}` : ''} ;` : ''; //, 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)
            if ((p.log !== undefined && p.log) || p.log === undefined) { // Can prevent log by add 'log:false' to DBG_PROPS objects
                if (args[0].constructor === String) {
                    console.log(`%c${args[0]}`, settings, ...args.slice(1, args.length - 1));
                }
                else {
                    console.log(...args);
                }
            }
        }
    }
    else {
        if (args[0].constructor === String) {
            console.log(`%c${args[0]}`, 'color: #00a6ff ; font-weight: bold ; font-size: 16px', ...args.slice(1, args.length));
        }
        else {
            console.log(...args);
        }
    }

}