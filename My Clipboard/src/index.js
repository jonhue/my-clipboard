import App from './app';
import Account from './account';
import History from './history';
import Layout from './layout';

let app = new App(),
    account = new Account(app);

$(document).ready(function() {
    // let history = History.init(account);
    let layout = Layout.init(account);
});
