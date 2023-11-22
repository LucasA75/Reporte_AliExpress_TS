const btn = document.getElementById("btn_extraer");
btn!.addEventListener("click", extractBtn);

function extractBtn() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const adress = tabs[0].url;

    const url = adress!.split('/')[2]
    if(!url.includes('aliexpress')){
        alert("It can only work in aliexpress :(")
        close()
    }
    else{
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id! },
            files: ["./infoOrder.js"]
        }).then(()=>console.log("funciono GENTEEEEE"))
        .catch(function (err) { return console.log(err); });
    }
  });
}
