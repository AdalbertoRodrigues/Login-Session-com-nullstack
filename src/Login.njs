import Nullstack from 'nullstack';

import './Login.scss';

class Login extends Nullstack {

    user = "";
    password = "";
    result;

    async prepare({ project, page, router}) {
        page.title = `${project.name} - Nulla-chan te dá as boas vindas!`;
        page.description = `${project.name} foi feito com Nullstack`;
        if(await this.isLoggedIn())
            router.url = "/";
    }

    async initiate({ router }) {
        if (await this.isLoggedIn())
            window.location.replace("/");
    }

    static async isLoggedIn({ request}) {
        return !!request.session.user;
    }

    static async login({ database, request, user, password }) {
        const [[result]] = await database.query("SELECT * FROM users WHERE username = ? AND password = PASSWORD(?)", [user, password]);
        console.log(result, user, password);
        if (!result)
            return { error: 'not found' };
        try {
            request.session.user = { id: result.id }
            return request.session.user;
        } catch (e) {
            request.session.user = null;
            return { error: 'unknown' };
        }
        return 1;
    }

    async loginButton({router}) {
        this.result = await this.login({ user: this.user, password: this.password });
        console.log(this.result)
        if(await this.isLoggedIn())
            router.url = "/";
    }



    render() {
        return (
            <div class="container login-container">
                <div class="row">
                    <div class="col-md-12 login-form">
                        <h3>Login</h3>
                        <form method="POST">
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