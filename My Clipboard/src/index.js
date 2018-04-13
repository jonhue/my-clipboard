import App from './app';
import Account from './account';
import History from './history';
import Layout from './layout';

let app = new App(),
    account = new Account(app);

$(document).ready(() => {
    account.history = History.init(account);
    account.layout = Layout.init(account);
});
