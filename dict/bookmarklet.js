javascript:(
    void(
        function() {
            var fileRef;
            var loaded = false;

            try {
                loaded = lookupDictDefinition;
            }
            catch(err) {
            }

            if(!loaded) {
                fileRef = document.createElement("link");
                fileRef.rel = "stylesheet";
                fileRef.type = "text/css";
                fileRef.href = "http://localhost/CIS233W/dict/dict.css";
                document.getElementsByTagName("head")[0].appendChild(fileRef);

                fileRef = document.createElement("script");
                fileRef.src = "http://localhost/CIS233W/dict/dict.js";
                fileRef.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(fileRef);
            } else {
                lookupDictDefinition();
            }
        }()
    )
)