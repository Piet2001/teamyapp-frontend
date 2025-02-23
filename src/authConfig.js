import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        clientId: "c077597d-aa24-46a7-aaec-58cad7ac4b46", // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/3b94b4c6-59a7-4d4f-b594-532eadaff784", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-frontend.web.app/" : "http://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        //postLogoutRedirectUri: process.env.NODE_ENV === 'production' ? "https://vitaapp-frontend.web.app/" : "http://localhost:3000", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["api://c077597d-aa24-46a7-aaec-58cad7ac4b46/User.All"],
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */

export const protectedResources = {
    graphMe: {
        endpoint: "http://159.223.240.117",
        scopes: ["User.Read"],
    },
    // apiActivity: {
    //     endpoint: process.env.NODE_ENV === 'production' ? "http://vitaappgw.northeurope.cloudapp.azure.com/activity/" : "http://localhost:5000/activity/",
    //     scopes: ["api://fbb04eec-10f5-4677-b91e-b366a1e0303a/Activity.All"], // e.g. api://xxxxxx/access_as_user
    // },
    apiUser: {
        endpoint: process.env.NODE_ENV === 'production' ? "http://vitaappgw.northeurope.cloudapp.azure.com/user/" : "http://localhost:5000/user/",
        scopes: ["api://c077597d-aa24-46a7-aaec-58cad7ac4b46/User.All"]
    },
    // apiBadge: {
    //     endpoint: process.env.NODE_ENV === 'production' ? "http://vitaappgw.northeurope.cloudapp.azure.com/badge/" : "http://localhost:5000/badge/",
    //     scopes: ["api://787cafa0-a56b-429c-a0a2-d67f139b2c64/Badge.All"]
    // },
    // apiChallenge: {
    //     endpoint: process.env.NODE_ENV === 'production' ? "http://vitaappgw.northeurope.cloudapp.azure.com/challenge/" : "http://localhost:5000/challenge/",
    //     scopes: ["api://15e8abf0-9951-4e65-9d1c-1d14b82e6268/Challenge.All"]
    // }
}

