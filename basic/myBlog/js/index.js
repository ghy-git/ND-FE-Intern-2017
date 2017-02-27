function git(id){
    return document.getElementById(id);
}
function SHham(){
    var times = 0;
    git('header_ham').onclick = function(){
        console.log(git('header_ham').className);
        if (times === 0) {
            git('link').className ="showHam";
            times = 1;
        } else {
            git('link').className ="hideHam";
            times = 0;
        }
    }
}
window.onload = SHham();