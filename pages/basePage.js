class BasePage {
    constructor(page) {
        this.page = page;
    }

    async openUrl(url) {
        return await this.page.goto(url, {waitUntil: 'networkidle'});
    }

    async elementToHasText(element){

        const elementIsVisible = await element.toBeVisible();
        if(!elementIsVisible) {
            throw new Error(`💀 element is not visible`);
        }

        const elementIsEnabled = await element.toBeEnabled();
        if(!elementIsEnabled) {
            throw new Error(`📛 element is not enabled`);
        }

        if(!elementIsVisible && !elementIsEnabled) {
            throw new Error(`⚡element is not visible and not enabled`);
        }
    }
}

module.exports = BasePage;