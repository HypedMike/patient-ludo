import open from 'open';
import { Builder, Browser, By, Key, until, ThenableWebDriver, WebDriver } from 'selenium-webdriver';

export class CheckTickets {
    driver: WebDriver;
    artistName: string;

    constructor(driver: WebDriver, artistName: string) {
        this.driver = driver;
        this.artistName = artistName;
    }

    /**
     * use selenium to move towards web page
     */
    async goToWebsite() {
        await this.driver.get(`https://www.ticketone.it/artist/${this.artistName}/`);
    };

    /**
     * custom action to close cookies popup
     */
    async closeCookies() {
        const button = await this.driver.findElements(By.className('cmpboxbtn cmpboxbtnyes cmptxt_btn_yes'));

        if (button.length > 0) {
            button[0].click();
        }else{
            console.log("something went wrong while closing cookies");
        }
    }

    /**
     * start iterating loop to get into queue
     */
    async tryToQueue() {
        var i = 0;
        var loop = true;
        while(loop){
            if (await this.checkEventStatus()) {
                // create event button
                const eventButton = await this.driver.findElements(By.className("listing-item event-listing-item list-element theme-element-radius"))

                // check amount of eventButtons and select first one
                if(eventButton.length > 0){
                    console.log("clicking on event");
                    await eventButton[0].click();
                }

                this.openInNewTab(await this.driver.getCurrentUrl());
                this.driver.close();
                loop = false;
                return;
            } else {
                console.log("not found after attempt n " + i++);
            }
            setInterval(() => {console.log("waiting 1 second")}, 1000);
            this.driver.navigate().refresh();
        };
    }

    async checkEventStatus(): Promise<boolean> {
        const buttons = await this.driver.findElements(By.linkText("Biglietti"));
        console.log(buttons.length > 0 ? "found button" : "button not found");
        return buttons.length > 0;
    }

    async openInNewTab(url: string) {
        open(url);
    }
}