var btn = document.getElementById("btn_extraer");
btn.addEventListener("click", miFuncion);
function miFuncion() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var adress = tabs[0].url;
        var url = adress.split('/')[2];
        if (!url.includes('aliexpress')) {
            alert("It can only work in aliexpress :(");
            close();
        }
        else {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["./infoOrder.js"]
            }).then(function () { return console.log("funciono GENTEEEEE"); })
                .catch(function (err) { return console.log(err); });
        }
    });
}
