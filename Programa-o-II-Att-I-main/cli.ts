/*Implemente a interface de linha de comando (cli.ts)*/
import todo from './core.ts';
const command = process.argv[2];

/*Implemente a lógica para o comando "add"*/
if (command === "add") {
  const item = process.argv[3];
  if (!item) {
    console.error("Por favor, forneça um item para adicionar.");
    process.exit(1);
  }
  await todo.addItem(item);
  console.log(`Item "${item}" adicionado com sucesso!`);
  process.exit(0);
}

/*Implemente a lógica para o comando "list"*/
if (command === "list") {
  const items = await todo.getItems();
  if (items.length === 0) {
    console.log("Nenhum item na lista.");
    process.exit(0);
  }

  console.log("Lista de itens:");
  items.forEach((item, index) => {
    console.log(`${index}: ${item}`);
  });
  process.exit(0);
}

/*Implemente a lógica para o comando "update"*/
if (command === "update") {
  const index = parseInt(process.argv[3]);
  const newItem = process.argv[4];
  if (isNaN(index) || !newItem) {
    console.error("Por favor, forneça um índice válido e um novo item.");
    process.exit(1);
  }

  try {
    await todo.updateItem(index, newItem);
    console.log(`Item no índice ${index} atualizado para "${newItem}".`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

/*Implemente a lógica para o comando "remove"*/
if (command === "remove") {
  const index = parseInt(process.argv[3]);
  if (isNaN(index)) {
    console.error("Por favor, forneça um índice válido para remover.");
    process.exit(1);
  }
  
  try {
    await todo.removeItem(index);
    console.log(`Item no índice ${index} removido com sucesso.`);
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

/*Implemente a lógica para o comando "clear"*/
if (command === "clear") {
  try {
    await todo.clearItems();
    console.log("Lista de tarefas limpa com sucesso!");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

/*Implemente a lógica para comando desconhecido*/
console.error("Comando desconhecido. Use 'add', 'list', 'update', 'remove' ou 'clear'.");
process.exit(1);
