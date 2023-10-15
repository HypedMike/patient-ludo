import {Builder, Browser, By, Key, until} from 'selenium-webdriver';
import { CheckTickets } from './lib/checkTickets.js';

(new Builder().forBrowser(Browser.CHROME).build()).then((res) => {
    var ct = new CheckTickets(res, process.argv[2] ?? "ed-sheeran");
    (async () => {
        await ct.goToWebsite();
        await ct.closeCookies();
        await ct.tryToQueue();
    })()
})

