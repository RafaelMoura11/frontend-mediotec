export default function CreatePage() {
    return (
        <div class="container">
            <form class="form-user">
                <h1>Novo Usuário</h1>
                <div class="profile-picture">
                    <img src="https://via.placeholder.com/100" alt="Foto do perfil" />
                    <div class="edit-icon">&#9998;</div>
                </div>
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" id="name" placeholder="Nome completo" />
                </div>
                <div class="form-group">
                    <label for="tipo">Tipo</label>
                    <select id="tipo">
                        <option value="" disabled selected>Selecione o tipo de usuário</option>
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="coordenador">Coordenador</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input type="text" id="cpf" placeholder="xxx.xxx.xxx-xx" />
                </div>
                <div class="form-group">
                    <label for="birth-date">Data de Nascimento</label>
                    <input type="date" id="birth-date" />
                </div>
                <div class="form-group">
                    <label for="gender">Gênero</label>
                    <select id="gender">
                        <option value="" disabled selected>Selecione o gênero</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="user.new@email.com" />
                </div>
                <div class="form-group">
                    <label for="telefone">Telefone</label>
                    <input type="tel" id="telefone" placeholder="(xx) xxxxx-xxxx" />
                </div>
                <div class="form-group">
                    <label for="responsavel-contato">Contato do responsável</label>
                    <input type="tel" id="responsavel-contato" placeholder="(xx) xxxxx-xxxx" />
                </div>
                <div class="form-group">
                    <label for="responsavel">Responsável</label>
                    <input type="text" id="responsavel" placeholder="Nome completo do responsável" />
                </div>
                <div class="form-group">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" placeholder="*********" />
                </div>
                <div class="form-group">
                    <label for="confirmar-senha">Confirmar senha</label>
                    <input type="password" id="confirmar-senha" placeholder="*********" />
                </div>
                <div class="buttons">
                    <button type="button" class="btn-cancelar">Cancelar</button>
                    <button type="submit" class="btn-salvar">Salvar</button>
                </div>
            </form>
        </div>
    )
}