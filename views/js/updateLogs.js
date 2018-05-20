setInterval(() => {
    var logsHTML = '';
    var logsArr = [];

    var counter = 0;
    for (let i in localStorage) {
        if (i.substring(0,2) == "15") {
            var date = String(new Date(Number(i)));
            var productName;
       
            if (localStorage[i] > 4) {
                productName = productNames[2][localStorage[i]-4];
            } else {
                productName = productNames[1][localStorage[i]];
            }
            console.log(productName)
            logsArr.push(
                `
                <tr>
                        
                        <td>${date.substring(0, date.length - 15)}</td>
                        <td>${productName}</td>
                        
                              
                </tr>
                    
                `
            );
        }  
    }

    for (let g = logsArr.length-1; g >= 0; g--) {
        logsHTML += logsArr[g];
    }

    document.getElementById('tx_logs').innerHTML = logsHTML;
}, 5000);