const displayKIPCurrency = (num) => {
    const formatter = new Intl.NumberFormat('lo-LA', {
        style: "decimal", // Use decimal to format the number without currency symbol
        minimumFractionDigits: 0, // Adjust to display as many decimals as needed
    });

    // Format the number
    const formattedNumber = formatter.format(num);

    // Append the KIP symbol at the end
    return `${formattedNumber} ₭`;
}

export default displayKIPCurrency;
