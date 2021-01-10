export default function webfonts(families) {

    return new Promise((resolve) => {

         // create webfont config (google only for now)
         window.WebFontConfig = {
            google: { families },
            active: resolve
        };

        // insert webfont script
        (function() {
            const wf = document.createElement('script');
            wf.src = `${document.location.protocol}//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
            wf.type = 'text/javascript';
            wf.async = 'true';
            const s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        }()); 

    });
}
