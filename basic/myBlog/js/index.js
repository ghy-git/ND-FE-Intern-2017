function $(id) {
    return document.getElementById(id);
}
var headerObj = {
    el: $('link'),
    showLinks: function () {
        this.el.className = 'showHam';
    },
    hideLinks: function () {
        this.el.className = 'hideHam';
    }
}

function toggle(){
    var flag = 0;
    $('header_ham').onclick = function(){
        if (flag === 0) {
            headerObj.showLinks();
            flag = 1;
        } else {
            headerObj.hideLinks();
            flag = 0;
        }
    }
}
toggle();