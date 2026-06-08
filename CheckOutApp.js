const prompt = require('prompt-sync')({ sigint: true });

function runCheckoutSystem() {
    const cart = [];

    console.log("--- SEMICOLON STORES ---");

    const customerName = prompt("What is the customer's Name: ");

    let addMore = "yes";
    while (addMore.toLowerCase() === "yes") {
        const itemName = prompt("What did the user buy? ");
        const quantity = parseInt(prompt("How many pieces? "), 10);
        const unitPrice = parseFloat(prompt("How much per unit? "));


        cart.push({
            name: itemName,
            qty: quantity,
            price: unitPrice,
            total: quantity * unitPrice
        });

        addMore = prompt("Add more Items? (yes/no): ");
    }

    const cashierName = prompt("What is your name? (Cashier): ");
    const discountPercentage = parseFloat(prompt("How much discount will he get (%): "));


    let subTotal = 0;
    cart.forEach(item => subTotal += item.total);

    const discountAmount = subTotal * (discountPercentage / 100);
    const vatAmount = subTotal * 0.175;
    const billTotal = subTotal - discountAmount + vatAmount;

    // 4. Helper Function to Print the Uniform Receipt Layout
    function printInvoiceReceipt(isFinalReceipt, amountPaid = 0, balance = 0) {
        console.log("\n=======================================================");
        console.log("SEMICOLON STORES");
        console.log("MAIN BRANCH");
        console.log("LOCATION: 312, HERBERT MACAULAY WAY, SABO YABA, LAGOS.");
        console.log("TEL: 03293828343");
        console.log(`Date: ${new Date().toLocaleString()}`);
        console.log(`Cashier: ${cashierName}`);
        console.log(`Customer Name: ${customerName}`);
        console.log("=======================================================");

        // Formatted Headers using padEnd and padStart for crisp terminal alignment
        console.log("ITEM".padEnd(18) + "QTY".padStart(6) + "PRICE".padStart(14) + "TOTAL (NGN)".padStart(15));
        console.log("-------------------------------------------------------");

        cart.forEach(item => {
            console.log(
                item.name.padEnd(18) +
                item.qty.toString().padStart(6) +
                item.price.toFixed(2).padStart(14) +
                item.total.toFixed(2).padStart(15)
            );
        });

        console.log("-------------------------------------------------------");
        console.log(`Sub Total:`.padEnd(38) + subTotal.toFixed(2).padStart(15));
        console.log(`Discount:`.padEnd(38) + discountAmount.toFixed(2).padStart(15));
        console.log(`VAT @ 17.50%:`.padEnd(38) + vatAmount.toFixed(2).padStart(15));
        console.log("=======================================================");
        console.log(`Bill Total:`.padEnd(38) + billTotal.toFixed(2).padStart(15));

        if (!isFinalReceipt) {
            console.log("=======================================================");
            console.log(`THIS IS NOT A RECEIPT. KINDLY PAY: NGN ${billTotal.toFixed(2)}`);
            console.log("=======================================================\n");
        } else {
            console.log(`Amount Paid:`.padEnd(38) + amountPaid.toFixed(2).padStart(15));
            console.log(`Balance:`.padEnd(38) + balance.toFixed(2).padStart(15));
            console.log("=======================================================");
            console.log("           THANK YOU FOR YOUR PATRONAGE                ");
            console.log("=======================================================\n");
        }
    }

    printInvoiceReceipt(false);


    const rawCashGiven = prompt("How much did the customer give to you? ");
    const cashGiven = parseFloat(rawCashGiven);
    const customerBalance = cashGiven - billTotal;

    printInvoiceReceipt(true, cashGiven, customerBalance);
}

runCheckoutSystem();