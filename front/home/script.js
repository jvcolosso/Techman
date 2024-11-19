const equipamentos = document.querySelectorAll('.all');
        const main = document.querySelector('main');
        const modal = document.querySelector('.modal');
        const modal_equip = document.querySelector('#modal_equip');
        const modal_comments = document.querySelector('#modal_comments')
        const btn_equipamento = document.querySelector('.btn-equipamento');
        const btn_comment = document.querySelectorAll('#btn-comment');
        const overlay = document.querySelector('.overlay');
        const user = JSON.parse(window.localStorage.getItem("user"));
        const sair = document.querySelector('.sair');
        var listaequip = [];

        function verificarUsuario() {
            if (user.perfilId == 1) {
                sair.innerHTML = `<a href="../login/index.html"><i class="bi bi-box-arrow-in-right"></i></a>`;
            }
            fetchEquipamentos();
        }

        async function fetchEquipamentos() {
            listaequip = [];
            try {
                const response = await fetch('http://localhost:3000/equipamento');
                const data = await response.json();
                data.forEach((e) => {
                    listaequip.push(e);
                });

                if (user.perfilId == 1) {
                    renderEquipamentosUsuarioComum();
                } else {
                    renderEquipamentos();
                }
            } catch (error) {
                console.error('Erro ao buscar equipamentos:', error);
            }
        }

        function renderEquipamentos() {
            main.innerHTML = "";
            listaequip.forEach((e) => {
                const isAdmin = user.perfilId === 2;
                const deleteButton = isAdmin ? `<button class="del" id="del" onclick="del(${e.id})"><i class="bi bi-trash3-fill"></i></button>` : '';

                const card = `
        <div class="card">
            <img src="../assets/${e.imagem}" class="imgg">
            <div class="div-info-equip">
                <p> 
                    <strong>${e.equipamento}</strong><br>
                </p><br>
                <p> 
                    ${e.descricao}
                </p><br>
                <div class="all-btn">
                    <button class="btn-comment" id="btn-comment" onclick="comentario(${e.id})"><i class="bi bi-chat-right-text-fill"></i></button>
                    ${deleteButton} <!-- Botão de exclusão será renderizado apenas se o usuário for admin -->
                </div>
            </div>
        </div>
        `;
                main.innerHTML += card;
            });
        }


        function renderEquipamentosUsuarioComum() {
            main.innerHTML = "";
            listaequip.forEach((e) => {
                const card = `
        <div class="card">
            <img src="../assets/${e.imagem}" class="imgg">
            <div class="div-info-equip">
                <p> 
                    <strong>${e.equipamento}</strong><br>
                    ${e.descricao}
                </p>
                <div class="all-btn">
                    <button class="btn-comment" id="btn-comment" onclick="comentario(${e.id})"><i class="bi bi-chat-right-text-fill"></i></button>
                </div>
            </div>
        </div>
        `;
                main.innerHTML += card;
            });
        }

        let equipamentoIdToDelete;

        async function del(id) {
            equipamentoIdToDelete = id;
            document.getElementById('modal-delete').style.display = 'flex';
        }

        document.addEventListener('DOMContentLoaded', function () {
            const confirmDeleteButton = document.getElementById('confirm-delete');
            confirmDeleteButton.onclick = async function () {
                try {
                    await fetch(`http://localhost:3000/equipamento/${equipamentoIdToDelete}`, {
                        method: 'DELETE',
                    });

                    const index = listaequip.findIndex(e => e.id === equipamentoIdToDelete);
                    if (index !== -1) {
                        listaequip.splice(index, 1);
                    }
                    renderEquipamentos();
                    document.getElementById('modal-delete').style.display = 'none';
                    alert('Equipamento excluído com sucesso!');
                } catch (error) {
                    console.error('Erro ao deletar equipamento:', error);
                    alert('Erro ao excluir o equipamento. Tente novamente mais tarde.');
                    document.getElementById('modal-delete').style.display = 'none';
                }
            };


            const cancelDeleteButton = document.getElementById('cancel-delete');
            cancelDeleteButton.onclick = function () {
                document.getElementById('modal-delete').style.display = 'none';
            };
        });


        function comentario(id) {
            window.localStorage.setItem('idEquip', id);
            window.location.href = "../comentario/index.html";
        }

        function limparLocalStorage() {
            window.localStorage.clear();
        }