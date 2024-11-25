import BasePage from './basePage';

import {
    inventoryPageUrl,
    burgerMenue,
    logoutButton,
    cartIcon,

    swagLabsLogo,
    } from '../config';

class InventoryPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.inventoryPageUrl = inventoryPageUrl;
        this.burgerMenue = page.locator('button', { hasText: 'Open Menu' }); //Error while parsing selector `button:has-text("Open Menu")` - unexpected symbol ":" at position 6
        this.logoutButton = page.locator(logoutButton);
        this.cartIcon = page.locator(cartIcon);
    }

    async openInventoryPage() {
        await this.openUrl(inventoryPageUrl);
    }

    async openBurgerMenue() {
        await this.burgerMenue.click();
    }

     async logoutClick() {
        await this.logoutButton.click();
    }

    //polymorphism -override parents method in 2 ways:
    async assertBurgerMenuHasThreeLines() {
        // Verify the image source or alt text
        //<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LmRhNGE3ZTVlZiwgMjAyMi8xMS8yMi0xMzo1MDowNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjEgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA3QzBCMEVBRUYzMTFFREIwRThFMzc3OTlDRTMyNUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA3QzBCMEZBRUYzMTFFREIwRThFMzc3OTlDRTMyNUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDdDMEIwQ0FFRjMxMUVEQjBFOEUzNzc5OUNFMzI1QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDdDMEIwREFFRjMxMUVEQjBFOEUzNzc5OUNFMzI1QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq0LVkQAAAERSURBVHjaYvz//z/DQAImhgEGow5gARE379wx8IuN2f/2/XsBeliqqqj4YMHkKYHqKioXwCEwb+mSAnpZDgK3799XmL9sWT48CrQ1NS/QO+gtTUwOgmhGWDY8c+GCw9NnzxToYbm0lNQDEwODAygOGM2Gow4Y0ILo+YsXCgtWLM//+OkzXcoCfj7eDwkRURMlJcQfgB0wf/mygr6ZM/Pp6XNg7mOsKiwqGBxRkBAZNQFEf/r8hZ8elvLx8nxMiIyeMFoQjTpg8BREA1kdgx2wcdu2hOSiwvn09HlfY1NhXHj4BHAUHDt9yoHeQX/t5k19eBpIio6ZAGoo0styYUHBD4lRURNHC6JRB4w6AAQAAgwA/fRn191dMT8AAAAASUVORK5CYII=" 
        //class="bm-icon" srcset="/static/media/menu3x.52cc17a3.svg"
        // alt="Open Menu" data-test="open-menu" style="width: 100%; height: 100%;">
        const imageSrc = await this.burgerMenu.getAttribute('src');
        const altText = await this.burgerMenu.getAttribute('alt');
    
        // Assert for expected values
        expect(imageSrc).toContain('menu3x'); // Matches the src path
        expect(altText).toBe('Open Menu'); // Matches alt text
    }

     async assertLoginBtnHasText(element){
        const loginBtnToHaveText = await element.textContent('Login');
        if(!loginBtnToHaveText){
            throw new Error(`The Login button does not have "Login" text`)
        }
        await super.elementToHasText(element);
     }
}

module.exports = InventoryPage;