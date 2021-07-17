import Nullstack from 'nullstack';
import mysql from 'mysql2/promise/';
import session from 'express-session'

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './Application.scss';
//components
import Home from './Home';
import Login from './Login.njs';

class Application extends Nullstack {

  prepare({ page }) {
    page.locale = 'pt-BR';
  }

  static async start(context) {
    const maxAge = 1000 * 60 * 60 * 24
    context.server.use(
      session({
        secret: context.secrets.privateKey,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge },
      })
    )

    const database = await mysql.createPool({
      host: context.secrets.mysqlHost,
      user: context.secrets.mysqlUser,
      password: context.secrets.mysqlPassword,
      database: context.secrets.mysqlDatabase,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await database.query("USE " + context.secrets.mysqlDatabase);

    context.database = database;

  }

  static async getUser({ request }) {
    return request.session.user;
  }

  async initiate(context) {
    context.user = await this.getUser();
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
      </head>
    )
  }

  render({ user }) {
    return (
      <main>
        <Head />
        {!user && <Login route="*" />}
        <Home route="/" />
      </main>
    )
  }

}

export default Application;