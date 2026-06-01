function validateCreditCard(cardNumber) {

    const cleanNumber = cardNumber.replace(/[\s-]/g, '');


    if (cleanNumber.length < 13 || cleanNumber.length > 16) {
        return { type: "Invalid", status: "Invalid length" };
    }

    let type = "Invalid Card";
    if (cleanNumber.startsWith('4')) type = "Visa";
    else if (cleanNumber.startsWith('5')) type = "MasterCard";
    else if (cleanNumber.startsWith('37')) type = "American Express";
    else if (cleanNumber.startsWith('6')) type = "Discover";


    const digits = cleanNumber.split('').map(Number);
    let sum = 0;
    let doubleNumber = false;


    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if (doubleNumber) {
            digit *= 2;
            if (digit > 9) {

                digit = Math.floor(digit / 10) + (digit % 10);
            }
        }

        sum += digit;
        doubleNumber = !doubleNumber;
    }

    const isValid = (sum % 10 === 0);

    return {
        type: type,
        number: cleanNumber,
        length: cleanNumber.length,
        status: isValid ? "Valid" : "Invalid"
    };
}


const result = validateCreditCard("5399831619690404");
console.log(result);