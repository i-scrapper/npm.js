const request = require("@i-scrapper/plugins-request");
const iScrapperError = require("@i-scrapper/plugins-error");

module.exports = {
    BASEURL: "https://registry.npmjs.org",
    search: function (query, options = {}) {
        const rankings = ["size", "from", "quality", "popularity", "maintenance"];
        const optsEntries = Object.entries(options);
        if (!query || typeof query !== "string") throw new iScrapperError("<query> must be fill in & typeof stypeo");
        if (options.toString() !== '[object Object]') throw new iScrapperError("<options> must be typeof object");
        let searchURL = this.BASEURL.concat(`/-/v1/search?text=${query}`);
        for (var [key, val] of optsEntries) {
            if (rankings.includes(key)) {
                searchURL = searchURL.concat(`&${key.toLowerCase()}=${val}`);
            } 
            if (key.toLowerCase() === "qualifiers") {
                searchURL = searchURL.replace(/(text=(.+))/i, `text=${val}:${query}`);
            }
        }
        return new Promise((resolve, reject) => {
            request({
                url: searchURL,
            })
            .then((response) => resolve(response.data))
            .catch(reject);
        });
    },
    package: function (name, version = "") {
        if (!name || typeof name != "string") throw new iScrapperError("<name> must be fill in & typeof string");
        if (version && typeof version != "string") throw new iScrapperError("<version> must be typeof string");
        const packageURL = this.BASEURL.concat(`/${name}/${version}`);
        return new Promise((resolve, reject) => {
            request({
                url: packageURL,
            })
            .then((response) => resolve(response.data))
            .catch(reject);
        });
    },
    user: function (username) {
        if (!username || typeof username != "string") throw new iScrapperError("<username> must be fill in & typeof string");
        return new Promise((resolve, reject) => {
            request({
                url: `https://www.npmjs.com/~${username}`,
            })
            .then((response) => {
                const $ = response.parseDOM;
                const windowContext = JSON.parse($("script:nth-child(2)").html().split(/= (.+)/)[1]).context;
                const data = {
                    ...windowContext.scope,
                    orgs: windowContext.orgs,
                    packages: windowContext.packages,
                };
                data.parent.avatars.url = "https://www.npmjs.com" + data.parent.avatars.large;
                resolve(data);
            })
            .catch(reject);
        });
    },
};