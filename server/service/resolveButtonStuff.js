/* @flow */

export async function resolveButtonStuff(req : ExpressRequest, { getButtonStuff, logger, clientID: clientId, merchantID: merchantId, buttonSessionID: buttonSessionId, currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, locale, defaultFundingEligibility, buttonLabel, installmentPeriod } : FundingEligibilityOptions) {
    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';
        
        return await getButtonStuff(req, {
            clientId, merchantId, buyerCountry, cookies, ip, currency, intent, commit,
            vault, disableFunding, disableCard, userAgent, buttonSessionId, clientAccessToken, locale,
            buttonLabel, installmentPeriod });
        
    } catch (err) {
        logger.error(req, 'spb_gql_query_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return {
            fundingEligibility: defaultFundingEligibility
        };
    }
}
