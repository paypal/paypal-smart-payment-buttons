export const walletItemBuilder = (fundingOption) => {
    const {
        fundingInstrument: {
            image,
            name,
            issuerProductDescription,
            instrumentSubType: subType,
            lastDigits: digits,
            isPreferred
        },
        id
    } = fundingOption;

    const href = (image) ? image.url.href : '';

    const fundingOptionTitle = (subType === 'PAYPAL')
        ? 'PayPal Credit'
        : issuerProductDescription || name;
        
    const instrumentSubType = (subType === 'PAYPAL')
        ? 'Pay overtime for your purchase'
        : subType;

    const lastDigits = (subType === 'PAYPAL')
        ? ''
        : `•••• ${ digits || '' }`;

    return {
        id,
        fundingOptionIcon: href,
        fundingOptionTitle,
        instrumentSubType,
        showPreferredText: isPreferred,
        lastDigits
    }
};