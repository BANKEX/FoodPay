function addProduct(tokenNum) {
    let nameProduct;
    if (tokenNum > 4) {
        nameProduct = productNames[2][tokenNum - 4];
    } else {
        nameProduct = productNames[1][tokenNum];
    }
    productId[tokenNum] += 1;
    console.log(productId)
    document.getElementById('prodC' + tokenNum).innerHTML = productId[tokenNum] + '<br><br><br>';
    document.getElementById('prodT' + tokenNum).innerHTML = nameProduct + '<br><br><br>';
    document.getElementById('prodD' + tokenNum).innerHTML = `<button id="delProd${tokenNum}" onclick="delProduct(${tokenNum})" class="btn btn-danger"><p class="pminus"><strong>-</strong></p></button><br><br>`;
}

function delProduct(tokenNum) {
    let nameProduct;
    if (tokenNum > 3) {
        nameProduct = productNames[2][tokenNum - 3];
    } else {
        nameProduct = productNames[1][tokenNum];
    }
    if (productId[tokenNum] > 0) {
        productId[tokenNum] -= 1;
        if (productId[tokenNum] == 0) {
            document.getElementById('prodC' + tokenNum).innerHTML = '';
            document.getElementById('prodT' + tokenNum).innerHTML = '';
            document.getElementById('prodD' + tokenNum).innerHTML = '';
            return;
        }
        document.getElementById('prodC' + tokenNum).innerHTML = productId[tokenNum] + '<br><br><br>';
        document.getElementById('prodT' + tokenNum).innerHTML = nameProduct + '<br><br><br>';
        document.getElementById('prodD' + tokenNum).innerHTML = `<button id="delProd${tokenNum}" onclick="delProduct(${tokenNum})" class="btn btn-danger"><p class="pminus"><strong>-</strong></p></button><br><br>`;
    }
}

function setMoneyBack() {
    localStorage.setItem('state', '1');
    document.getElementById('successAdd').innerText = 'Попросите поднести QR Code к web камере, чтобы вернуть средства';
    document.getElementById('successAdd').innerText = 'Попросите поднести QR Code к web камере';
    setTimeout(() => {
        document.getElementById('successAdd').innerText = '';
    }, 10000);
    var checkCountOfProducts = 0;
    for (let i in productId) {
        if (productId[i] > 0) {
            checkCountOfProducts += 1;
        }
    }
    if (checkCountOfProducts > 0) {
        localStorage.setItem('pay', productId[1] + "," + productId[2] + "," + productId[3] + "," + productId[4] + "," + productId[5] + "," + productId[6] + "," + productId[7]);

    } else {

    }
}

function proceedToСheckout() {
    localStorage.setItem('state', '0');
    document.getElementById('successAdd').innerText = 'Попросите поднести QR Code к web камере';
    setTimeout(() => {
        document.getElementById('successAdd').innerText = '';
    }, 10000);
    var checkCountOfProducts = 0;
    for (let i in productId) {
        if (productId[i] > 0) {
            checkCountOfProducts += 1;
        }
    }
    if (checkCountOfProducts > 0) {
        localStorage.setItem('pay', productId[1] + "," + productId[2] + "," + productId[3] + "," + productId[4] + "," + productId[5] + "," + productId[6]+ "," + productId[7]);

    } else {

    }
}

function cancelPay() {
    localStorage.removeItem('pay');
}

function kp(e) {

    if (e) keyCode = e.which
    else if (event) keyCode = event.keyCode
    else return
    if (keyCode == keys["1"]) document.getElementById("addProd1").click()
    if (keyCode == keys["2"]) document.getElementById("addProd2").click()
    if (keyCode == keys["3"]) document.getElementById("addProd3").click()
    if (keyCode == keys["4"]) document.getElementById("addProd4").click()
    if (keyCode == keys["5"]) document.getElementById("addProd5").click()
    if (keyCode == keys["q"]) document.getElementById("addProd6").click()
    if (keyCode == keys["w"]) document.getElementById("addProd7").click()
    if (keyCode == keys["e"]) document.getElementById("addProd8").click()
    if (keyCode == keys["r"]) document.getElementById("addProd9").click()
    if (keyCode == keys["t"]) document.getElementById("addProd10").click()
    if (keyCode == keys["a"]) document.getElementById("addProd11").click()
    if (keyCode == keys["s"]) document.getElementById("addProd12").click()
    if (keyCode == keys["d"]) document.getElementById("addProd13").click()
    if (keyCode == keys["f"]) document.getElementById("addProd14").click()
    if (keyCode == keys["g"]) document.getElementById("addProd15").click()
    if (keyCode == keys["z"]) document.getElementById("addProd16").click()
    if (keyCode == keys["x"]) document.getElementById("addProd17").click()
    if (keyCode == keys["c"]) document.getElementById("addProd18").click()
    if (keyCode == keys["v"]) document.getElementById("addProd19").click()
    if (keyCode == keys["b"]) document.getElementById("addProd20").click()
    if (keyCode == keys["!"]) document.getElementById("delProd1").click()
    if (keyCode == keys["@"]) document.getElementById("delProd2").click()
    if (keyCode == keys["#"]) document.getElementById("delProd3").click()
    if (keyCode == keys["$"]) document.getElementById("delProd4").click()
    if (keyCode == keys["%"]) document.getElementById("delProd5").click()
    if (keyCode == keys["Q"]) document.getElementById("delProd6").click()
    if (keyCode == keys["W"]) document.getElementById("delProd7").click()
    if (keyCode == keys["E"]) document.getElementById("delProd8").click()
    if (keyCode == keys["R"]) document.getElementById("delProd9").click()
    if (keyCode == keys["T"]) document.getElementById("delProd10").click()
    if (keyCode == keys["A"]) document.getElementById("delProd11").click()
    if (keyCode == keys["S"]) document.getElementById("delProd12").click()
    if (keyCode == keys["D"]) document.getElementById("delProd13").click()
    if (keyCode == keys["F"]) document.getElementById("delProd14").click()
    if (keyCode == keys["G"]) document.getElementById("delProd15").click()
    if (keyCode == keys["Z"]) document.getElementById("delProd16").click()
    if (keyCode == keys["X"]) document.getElementById("delProd17").click()
    if (keyCode == keys["C"]) document.getElementById("delProd18").click()
    if (keyCode == keys["V"]) document.getElementById("delProd19").click()
    if (keyCode == keys["B"]) document.getElementById("delProd20").click()
    if (keyCode == 13) document.getElementById("goToTx").click()
    if (keyCode == 32) document.getElementById("moneyBack").click()

}
document.onkeypress = kp;



if (navigator.appName == 'Netscape') {
    window.captureEvents(Event.KEYPRESS);
    window.onKeyPress = kp;
}
document.getElementById('scanStream').innerHTML = `<video id="preview"></video>`;
createScanner("preview", (err, content) => {

})

// если баланс ноль, очищать стораж