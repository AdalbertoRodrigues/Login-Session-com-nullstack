import Nullstack from 'nullstack';
import Logo from 'nullstack/logo';
import mysql2 from 'mysql2';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.scss';


class Home extends Nullstack {

  users = [];

  async prepare({ project, page, router }) {
    page.title = `${project.name} - Nulla-chan te dá as boas vindas!`;
    page.description = `${project.name} foi feito com Nullstack`;

    if (await this.isLoggedIn() ==  false)
      router.url = "/login";

  }

  static async isLoggedIn({ request }) {
    return !!request.session.user;
  }

  static async getUsers({ database }) {
    const [users] = await database.query("SELECT * FROM users");
    return users;
  }

  async initiate() {
    this.users = await this.getUsers();
  }

  render({ project }) {
    return (
      <section>
        <div class="container">
          <div class="row">
            <h3>Usuários</h3>
            <table class="table table-dark">
              <tr>
                <th>Usuário</th>
                <th>Ativo</th>
              </tr>
              {this.users.map((element) => {
                return (<tr>
                  <td>{element.username}</td>
                  <td>{element.active ? "Sim" : "Não"}</td>
                </tr>
                );
              })}
            </table>
          </div>
          <div class="row">
            <button class="btn btn-primary">Cadastrar Usuário</button>
          </div>
        </div>
      </section>
    )
  }

}

export default Home;