class BasePage {
    constructor(page) {
        this.page = page;
    }

    async openUrl(url) {
        return await this.page.goto(url, {waitUntil: 'networkidle'});
    }
}

module.exports = BasePage;