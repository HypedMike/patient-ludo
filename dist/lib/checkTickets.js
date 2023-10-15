var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import open from 'open';
import { By } from 'selenium-webdriver';
export class CheckTickets {
    constructor(driver, artistName) {
        this.driver = driver;
        this.artistName = artistName;
    }
    /**
     * use selenium to move towards web page
     */
    goToWebsite() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.get(`https://www.ticketone.it/artist/${this.artistName}/`);
        });
    }
    ;
    /**
     * custom action to close cookies popup
     */
    closeCookies() {
        return __awaiter(this, void 0, void 0, function* () {
            const button = yield this.driver.findElements(By.className('cmpboxbtn cmpboxbtnyes cmptxt_btn_yes'));
            if (button.length > 0) {
                button[0].click();
            }
            else {
                console.log("something went wrong while closing cookies");
            }
        });
    }
    /**
     * start iterating loop to get into queue
     */
    tryToQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            var i = 0;
            var loop = true;
            while (loop) {
                if (yield this.checkEventStatus()) {
                    // create event button
                    const eventButton = yield this.driver.findElements(By.className("listing-item event-listing-item list-element theme-element-radius"));
                    // check amount of eventButtons and select first one
                    if (eventButton.length > 0) {
                        console.log("clicking on event");
                        yield eventButton[0].click();
                    }
                    this.openInNewTab(yield this.driver.getCurrentUrl());
                    this.driver.close();
                    loop = false;
                    return;
                }
                else {
                    console.log("not found after attempt n " + i++);
                }
                setInterval(() => { console.log("waiting 1 second"); }, 1000);
                this.driver.navigate().refresh();
            }
            ;
        });
    }
    checkEventStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const buttons = yield this.driver.findElements(By.linkText("Biglietti"));
            console.log(buttons.length > 0 ? "found button" : "button not found");
            return buttons.length > 0;
        });
    }
    openInNewTab(url) {
        return __awaiter(this, void 0, void 0, function* () {
            open(url);
        });
    }
}
//# sourceMappingURL=checkTickets.js.map