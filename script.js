document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os elementos do HTML
    const form = document.getElementById('add-form');
    const input = document.getElementById('item-input');
    const shoppingList = document.getElementById('shopping-list');
    const alertToast = document.getElementById('alert-toast');
    let toastTimeout;

    // Itens pré-cadastrados (Requisito)
    const initialItems = ['Maçã', 'Pão Integral', 'Leite de Amêndoas'];

    // Função principal: Cria o HTML de um item (<li>) e seus eventos
    function createListItem(itemName) {
        const li = document.createElement('li');

        // Cria o Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            // Se marcado, adiciona a classe; se desmarcado, remove (Toggle)
            li.classList.toggle('completed');
        });

        // Cria o texto do item
        const span = document.createElement('span');
        span.textContent = itemName;

        // Cria o botão de lixeira
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn-remove');
        removeBtn.innerHTML = '🗑️'; // Ícone simples usando emoji
        removeBtn.addEventListener('click', () => {
            li.remove(); // Remove o <li> da lista
            showAlert(); // Dispara o aviso
        });

        // Monta o <li> colocando os filhos dentro dele
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeBtn);

        return li;
    }

    // Inicializa a lista com os itens pré-cadastrados
    initialItems.forEach(item => {
        const newItemElement = createListItem(item);
        shoppingList.appendChild(newItemElement);
    });

    // Evento de adicionar novo item (Submissão do Formulário)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que a página recarregue

        const itemName = input.value.trim();

        // Validação: Se o campo estiver vazio, avisa o usuário e para por aqui
        if (itemName === '') {
            alert('Por favor, digite o nome de um item.');
            return;
        }

        // Cria e adiciona o item na tela
        const newItemElement = createListItem(itemName);
        shoppingList.appendChild(newItemElement);

        // Limpa o input após adicionar
        input.value = '';
        input.focus(); // Devolve o cursor piscando pro input
    });

    // Função para mostrar e esconder o alerta de remoção
    function showAlert() {
        alertToast.classList.remove('hidden'); // Mostra

        // Limpa o tempo anterior caso o usuário apague vários itens rápido
        clearTimeout(toastTimeout);

        // Esconde o alerta automaticamente após 3 segundos (3000 ms)
        toastTimeout = setTimeout(() => {
            alertToast.classList.add('hidden');
        }, 3000);
    }
});