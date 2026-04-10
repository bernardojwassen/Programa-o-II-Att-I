/*Defina o caminho para o arquivo JSON e a variável de dados em memória*/
const filename = __dirname + '/data.todo.json';
let list: string[] = null!;

/*Implemente a função para carregar dados do arquivo*/
async function loadFromFile() {
  if (list !== null)
    return
  try {
    const file = Bun.file(filename);
    const content = await file.text();
    list = JSON.parse(content) as string[];
  } catch (error) {
    Bun.write(filename, "[]");
    list = [];
  }
}

/*Implemente a função para salvar dados no arquivo*/
async function saveToFile() {
  await Bun.write(filename, JSON.stringify(list));
}

/*Implemente a função para criar*/
export async function addItem(item: string) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  list.push(item);      // Adiciona a nova tarefa ao array `list`
  await saveToFile();   // Salva os dados atualizados no arquivo JSON
}

/*Implemente a função para ler*/
export async function getItems() {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  return list;         // Retorna o array de tarefas
}

/*Implemente a função para atualizar */
export async function updateItem(index: number, newItem: string) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  // Verifica se o índice é válido
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites"); 
  list[index] = newItem; // Atualiza a tarefa no array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}

/* Implemente a função para deletar*/
export async function removeItem(index: number) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  // Verifica se o índice é válido
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites");
  list.splice(index, 1); // Remove a tarefa do array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}

/* Implemente a função para limpar a lista*/
export async function clearItems() {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  list = [];           // Limpa o array `list`
  await saveToFile();  // Salva os dados atualizados no arquivo JSON
}

/*Exporte as funções para uso externo*/
export default { addItem, getItems, updateItem, removeItem, clearItems };