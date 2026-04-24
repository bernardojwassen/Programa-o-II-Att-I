/*Com a lógica encapsulada em classes, o cli.ts fica responsável por ler o caminho do arquivo e o comando, 
criar a instância de ToDo, instanciar Item quando necessário e chamar os métodos adequados.*/
import { ToDo, Item } from './core.ts';

const file = process.argv[2]
const command = process.argv[3];

if (!file) {
  console.error("Por favor, forneça o caminho do arquivo.");
  process.exit(1);
}

const todo = new ToDo(file);

if (command === "add") {
  const itemDescription = process.argv[4];
  
  if (!itemDescription) {
    console.error("Por favor, forneça uma descrição para o item.");
    process.exit(1);
  }

  const item = new Item(itemDescription);
  await todo.addItem(item);
  console.log(`Item "${itemDescription}" adicionado com sucesso!`);
  process.exit(0);
}

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de itens:");
  items.forEach((item, index) => console.log(`${index}: ${item.toJSON().description}`));
  process.exit(0);
}

if (command === "update") {
  // ...
}

if (command === "remove") {
  // ...
}

console.error("Comando desconhecido. Use 'add', 'list', 'update' ou 'remove'.");
process.exit(1);

if (command === "update") {
  const index = Number(process.argv[4]);
  const newDescription = process.argv[5];

  if (isNaN(index) || !newDescription) {
    console.error("Uso: update <index> <nova descrição>");
    process.exit(1);
  }

  try {
    const newItem = new Item(newDescription);
    await todo.updateItem(index, newItem);
    console.log(`Item ${index} atualizado com sucesso!`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao atualizar item:", error.message);
    process.exit(1);
  }
}

if (command === "remove") {
  const index = Number(process.argv[4]);

  if (isNaN(index)) {
    console.error("Uso: remove <index>");
    process.exit(1);
  }

  try {
    await todo.removeItem(index);
    console.log(`Item ${index} removido com sucesso!`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao remover item:", error.message);
    process.exit(1);
  }
}