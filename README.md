# FoodPay
Implementation of use ERC 888 token

Use
```
npm i  
node webServer.js
```
to start app on `localhost:3000`

* Cashbox: https://foodpay.bankex.team/cashbox
* Scaner: https://foodpay.bankex.team/scan
* Dashboard: https://foodpay.bankex.team/admin
 
## How to add new product or token?
### File: utils/config.js
#### Object: productId
The object properties is product number. 

The property value is the amount of product, which would be increased if we choose it.
```javascript
    var productId = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    };
```
#### Object: price
The object properties is product number.  
The property value is product price.
```javascript
    const price = {
        1: 4,
        2: 3,
        3: 7,
        4: 1,
        5: 2,
        6: 2,
        7: 1
    };
```
#### Object: productNames
First property of the productNames object is token number.     
Their nested properties is product’s names.
```javascript
    const productNames = {
        1: {
            1: "Octa",
            2: "Super Food",
            3: "Soylent",
            4: "RedBull"
        },
        2: {
            1: "Bottle",
            2: "T-shirt",
            3: "Sleeping bag"
        }
    };
```

### File: cashbox.hbs
1. Insert button code.   
    Example:
```html
        <button id="addProd1" onclick="addProduct(1)" class="btn btn-info btn-lg applybuttons">
            <p class="pas">1</p>
            Octa
        </button>
```
2. Find `<td>` with id: `countProd`, `prodType`, `Supper_tokens_logs` and insert `<div>` with your productID:   
    For example:  
```html
        <td id="countProd">
            <div id="prodC1"></div>
        </td>
        <td id="prodType">
            <div id="prodT1"></div>
        </td>
        <td id="Supper_tokens_logs">
            <div id="prodD1"></div>
        </td>
```    
    
### File: cashbox.js
#### Functions: addProduct and delProduct
```javascript
function addProduct(tokenNum) {
   let nameProduct;
   if (tokenNum > 4) {
       nameProduct = productNames[2][tokenNum - 4];
   } else {
       nameProduct = productNames[1][tokenNum];
   }
   productId[tokenNum] += 1;

   document.getElementById('prodC' + tokenNum).innerHTML = productId[tokenNum] + '<br><br><br>';
   document.getElementById('prodT' + tokenNum).innerHTML = nameProduct + '<br><br><br>';
   document.getElementById('prodD' + tokenNum).innerHTML = `<button id="delProd${tokenNum}" onclick="delProduct(${tokenNum})" class="btn btn-danger"><p class="pminus"><strong>-</strong></p></button><br><br>`;
}
```

We are interested in a block with a conditional operator:
```javascript
 if (tokenNum > 4) {
       nameProduct = productNames[2][tokenNum - 4];
   } else {
       nameProduct = productNames[1][tokenNum];
   }
```   
In our case we have Food Token and Thing Token. Food Token includes 4 products and Thing Token - 3.   
If you want to add new product to one of this tokens - you have to increment if condition and decrease array index.     
If we would like to add new product associated with Food Token - we have to increment `tokenNum > 4` to `tokenNum > 5` and `productNames[2][tokenNum - 4]` to `productNames[2][tokenNum - 5]`.    
It will see like this:
```javascript
 if (tokenNum > 5) {
       nameProduct = productNames[2][tokenNum - 5];
   } else {
       nameProduct = productNames[1][tokenNum];
   }
 ```  

Next we will repeat this actions in delProduct function.   

#### Functions: proceedToСheckout and setMoneyBack
Сonsider proceedToСheckout and setMoneyBack functions.     
And more specifically - this part: 
```javascript
localStorage.setItem('pay', productId[1] + "," + productId[2] + "," + productId[3] + "," + productId[4] + "," + productId[5] + "," + productId[6] + "," + productId[7]);
```
This piece of code used to get pay in tokens. Item `pay` stores counts of every product. If you would like to add new product - push ```productId[num]``` value here!


### File: index.js
#### Function: checkAllowanceOfTokens
If you would add new token - you have write next code in `checkAllowanceOfTokens` function
```javascript
let tokenBalance = getAllowance(NUMBER_OF_YOUR_NEW_TOKEN, contractOwnerAddress, customerAddress);
```
And then wait Promise. This is necessary to check the balance when the buyer makes a purchase.

#### Function: pay
Previously, we looked at an item `pay` in LocalStorage. Now we get array from this string.
```javascript
let basket = localStorage.getItem('pay').split(',');
```
In pay function you can next code:
`i` - is the product ID.
We have 4 products that can be exchanged for a Food Token. `i == 3` is the last product. If we want to add new product (Food Token) - we have to change condition `i > 3` to `i > 4` and change ```productNames[2][i - 3]``` to ```productNames[2][i - 4]```
```javascript
let tokenNumber;
if (i > 3) {
    tokenNumber = 2;
} else {
    tokenNumber = 1;
}

let nameProduct;
if (i > 3) {
    bal = 1;
    nameProduct = productNames[2][i - 3];
} else {
    bal = 0;
    nameProduct = productNames[1][i + 1];
}
```
### File: updateLogs.js
If we add new product - increase values like in `addProduct` function
It was:
```javascript
if (localStorage[i] > 4) {
    productName = productNames[2][localStorage[i]-4];
} else {
    productName = productNames[1][localStorage[i]];
}
```
It's become
```javascript
if (localStorage[i] > 5) {
    productName = productNames[2][localStorage[i]-5];
} else {
    productName = productNames[1][localStorage[i]];
}
```


    
    
    


