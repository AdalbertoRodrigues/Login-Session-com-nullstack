import Nullstack from 'nullstack';

import './Login.scss';

class Login extends Nullstack {

    user = "";
    password = "";

    prepare({ project, page }) {
        page.title = `${project.name} - Nulla-chan te dá as boas vindas!`;
        page.description = `${project.name} foi feito com Nullstack`;
    }


    static async login({database, user, password}) {
        const [result] = await database.query("SELECT * FROM users WHERE username = ? AND password = PASSWORD(?)", [user, password]);
        console.log(result[0].id);
        try {

        } catch(e) {

        }
        return 1;
    }

    async loginButton() {
        await this.login({user: this.user, password: this.password});
    }



    render() {
        return (
            <div class="container login-container">
                <div class="row">
                    <div class="col-md-12 login-form">
                        <h3>Login</h3>
                        <form>
                            <input type="text" class="form-control" placeholder="Usuário" bind={this.user} />
                            <input type="password" class="form-control" placeholder="Senha" bind={this.password} />
                            <button type="submit" class="btn btn-primary" onclick={this.loginButton}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;