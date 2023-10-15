var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Builder, Browser } from 'selenium-webdriver';
import { CheckTickets } from './lib/checkTickets.js';
(new Builder().forBrowser(Browser.CHROME).build()).then((res) => {
    var _a;
    var ct = new CheckTickets(res, (_a = process.argv[2]) !== null && _a !== void 0 ? _a : "ed-sheeran");
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield ct.goToWebsite();
        yield ct.closeCookies();
        yield ct.tryToQueue();
    }))();
});
//# sourceMappingURL=main.js.map