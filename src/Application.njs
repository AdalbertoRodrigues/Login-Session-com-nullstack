import Nullstack from 'nullstack';
import mysql from 'mysql2/promise/';
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
    const database = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'usuarios',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await database.query("USE usuarios");

    context.database = database;
    
  }

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head />
        <Home route="/" />
        <Login route="/login" />
      </main>
    )
  }

}

export default Application;