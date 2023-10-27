var checkDocumentWCAG = function() {
    function isTransparent(color) {
        if(color == "rgba(0, 0, 0, 0)")
            return true;
        if(color == "transparent")
            return true;
        return false;
    }

    function colorValues(color) {
        var values;
        var valueString;
        var valueArray; 
        
        if(color.indexOf("rgb(") == 0) {
            valueString = color.substr(4, color.length - 5);
        } else if(color.indexOf("rgba(") == 0) {
            valueString = color.substr(5, color.length - 6);
        } else {
            valueString = "0, 0, 0";
        }
        valueArray = valueString.split(",");
        values = valueArray.map(function(element) {
            return parseFloat(element);
        });
        // valueString = valueArray.map(parseFloat)
        return values;
    }

    function componentValue(component) {
        if(component <= 0.03928) {
            return component / 12.92;
        } else {
            return Math.pow(((component + 0.055) / 1.055), 2.4);
        }
    }

    function luminance(color) {
        var r = color[0] / 255;
        var g = color[1] / 255;
        var b = color[2] / 255;

        return 0.2126 *componentValue(r) + 0.7152 * componentValue(g) + 0.0722 * componentValue(b);
    }

    function isBold(weightString){
        var weight;

        if(weightString == "bold") {
            return true;
        }
        if(weightString == "normal") {
            return false;
        }
        try {
            weight = parseFloat(weightString);
            if(weight >= 700)
                return true;
            else
                return false;
        }
        catch(err) {
            return false;
        }
    }

    function checkContrast(tag, text, fore, back, sizeString, weight) {    
        var foreColor = colorValues(fore);
        var backColor = colorValues(back);
        var l1 = luminance(foreColor);
        var l2 = luminance(backColor);
        var temp;
        var contrastRatio;
        var size = parseFloat(sizeString);
        var trimmed = text.trim();
        var bounds;
        var noteText;

        if(trimmed == "") {
            return;
        }
        if(tag.getBoundingClientRect !== undefined)
            bounds = tag.getBoundingClientRect();
        else
            bounds = tag.parentNode.getBoundingClientRect();
        if(bounds.right - bounds.left < 2) {
            return;
        }
        if(bounds.bottom - bounds.top < 2) {
            return;
        }
        if(bounds.right < 0) {
            return;
        }
        if(bounds.bottom < 0) {
            return;
        }
        if(l1 < l2) {
            temp = l1;
            l1 = l2;
            l2 = temp;
        } 
        contrastRatio = (l1 + 0.05) / (l2 + 0.05);

        if(contrastRatio >= 4.5) {
            return;
        }
        if(size >= 18 && contrastRatio >= 3.0) {
            return;
        }
        if(size >= 14 && contrastRatio >= 3.0 && isBold(weight)) {
            return;
        }
        console.log("contrast: " + contrastRatio.toFixed(1) + ", size: " + size + ", weight: " + weight + ", fore: " + foreColor + ", back: " 
            + backColor + ", text: " + text);
    }

    function checkColors(tag, fore, back, size, weight) {
        var children;
        var i;
        var style;
        var color;

        if(fore === undefined) {
            fore = "rgb(0, 0, 0)";
        }
        if(back === undefined) {
            back = "rgb(255, 255, 255)";
        }
        if(tag.nodeType == Node.TEXT_NODE) {
            checkContrast(tag, tag.nodeValue, fore, back, size, weight)
        }
        if(tag.nodeType == Node.ELEMENT_NODE) {
            style = document.defaultView.getComputedStyle(tag);
            color = style.color;
            if(!isTransparent(color))
                fore = color;
            color = style.backgroundColor;
            if(!isTransparent(color))
                back = color;
            size = style.fontSize;
            weight = style.fontWeight;
        }
        if(tag.nodeType == Node.ELEMENT_NODE && tag.label !== undefined) {
            checkContrast(tag, tag.label, fore, back, size, weight)
        }
        children = tag.childNodes;
        for(i = 0; i < children.length; i++) {
            checkColors(children[i], fore, back, size, weight);
        }
    }

    return function checkDocument() {
        checkColors(document);
    }
}();

checkDocumentWCAG();