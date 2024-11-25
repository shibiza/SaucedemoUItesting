class BasePage {
    constructor(page) {
        this.page = page;
    }

    async openUrl(url) {
        return await this.page.goto(url, {waitUntil: 'networkidle'});
    }

    async clickElement(elementLocator){
       await elementLocator.click(); 
    }
}

module.exports = BasePage;