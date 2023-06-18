async function connect(){
  if(global.connection && global.connection.state !== 'disconnected'){
      return global.connection;
  }

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:5344@localhost:3306/copas");
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function selectTipoLance() {
  const conn = await connect ();
  const [row]= await conn.query('select * from tipo_lance;');

  return row;
}

async function selecionarUmTipoLancePeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from tipo_lance where id_tipo_lance='+id);

  return row
}

async function atualizarTipoLance(idTipoLance, nome){
  const conn = await connect ();
  const [row]= await conn.query(`update tipo_lance set nome = '${nome}' where id_tipo_lance=${idTipoLance}`);
}

async function inserirTipoLance(nome) {
  const conn = await connect();
  const [row] = await conn.query(`INSERT INTO tipo_lance (nome) VALUES (?)`, [nome]);
}

async function deletarTipoLance(idTipoLance) {
  console.log(`TEstando BD idTipoLance =  ${idTipoLance} `);
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM tipo_lance WHERE id_tipo_lance = ${idTipoLance}`);
  
  return row;

   
}

// FIM DO DA TABELA LANCE

// INICIO DA TABELA IDIOMA

async function selectIdioma(){
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM idioma;');
  
  return rows;
}

async function selecionarUmIdiomaPeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from idioma where id_idioma='+id);

  return row
}

  async function atualizarIdioma(idIdioma, nome){
    const conn = await connect ();
    const [row]= await conn.query(`update idioma set nome = '${nome}' where id_idioma=${idIdioma}`);
  }

async function inserirIdioma(nome) {
  if (!nome) {
    throw new Error('O parâmetro nome é obrigatório');
  }

  try {
    const conn = await connect();
    const [result] = await conn.query('INSERT INTO idioma (nome) VALUES (?)', [nome]);
    return result.insertId;
  } catch (err) {
    console.error(`Erro ao inserir idioma ${nome}: ${err.message}`);
    throw err;
  }
}

async function deletarIdioma(idIdioma) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM idioma WHERE id_idioma = ${idIdioma}`);
  return row;
}

//Fim da funções de idiomas

// Começo das funções de Continente

async function selectContinente() {
  const conn = await connect ();
  const [row]= await conn.query('select * from continente;');

  return row;
}

async function selecionarUmContinentePeloId(id){
  console.log("passando pelo BD continente");

  const conn = await connect ();
  const [row]= await conn.query('select * from continente where id_continente='+id);
  return row
}

async function atualizarContinente(idContinente, nome){
  const conn = await connect ();
  const [row]= await conn.query(`update continente set nome = '${nome}' where id_continente=${idContinente}`);
}

async function inserirContinente(nome) {
  const conn = await connect();
  const [row] = await conn.query(`INSERT INTO continente (nome) VALUES (?)`, [nome]);
}

async function deletarCon(idContinente) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM continente WHERE id_continente = ${idContinente}`);
  return row;
}

// FIM DAS FUNÇÕES DE CONTINENTE

// INICIO DAS FUNÇÕES DE PAIS SEDE

async function selectPaisSede() {
  try {
    const conn = await connect();
    const [rows] = await conn.query(`
      SELECT ps.ano_copa AS "Copa", se.nome AS "Sede",ps.id_pais AS idPaisSede
      FROM pais_sede ps
      INNER JOIN selecao se ON se.id_selecao = ps.id_pais
    `);

    console.log(rows); // Verifique o valor dos resultados no console

    return rows;
  } catch (err) {
    console.error(`Erro ao executar a consulta: ${err.message}`);
    throw err;
  }
}


async function selecionarUmPaisSedePeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from pais_sede where id_pais='+id);

  return row
}

async function atualizarPaisSede(nome,nome1,idPaisSede){
  const conn = await connect ();
  const [selecaoRow] = await conn.query('SELECT id_selecao FROM selecao WHERE nome = ?', [nome1]);
  const nomePais = selecaoRow[0].id_selecao;

  const [row]= await conn.query(`update pais_sede set id_pais = ${nomePais} ,ano_copa = ${nome} where id_pais =${idPaisSede}`);

 console.log(`Banco: nome: ${nome}, nome1:${nome1},nomePais:${nomePais},idPaisSede: ${idPaisSede}`)
}

//Alteraçao Xavier
async function inserirPaisSede(nome,nome1) {
  const conn = await connect();

  const [selecaoRow] = await conn.query('SELECT id_selecao FROM selecao WHERE nome = ?', [nome1]);
  const id_sel = selecaoRow[0].id_selecao;


  const [row] = await conn.query(`INSERT INTO pais_sede (id_pais,ano_copa) VALUES (?,?)`, [id_sel,nome]);
  console.log(` BANCO= nome: ${nome}, nome1:${nome1},id_sel: ${id_sel} `)
}

async function deletarPaisSede(idPaisSede) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM pais_sede WHERE id_pais= ${idPaisSede}`);
  
  console.log(`Banco: idPaisSede = ${idPaisSede}`)
  return row;

}

//FIM DE PAÍSES SEDE

//INICIO TABELA TECNICO

async function selectTecnico() {
  const conn = await connect ();
  const [row]= await conn.query('select * from tecnico;');

  return row;
}

async function selecionarUmTecnicoPeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from tecnico where id_tecnico='+id);

  return row
}

async function atualizarTecnico(idTecnico, nome, ano_nascimento ){
  const conn = await connect ();
  const [row]= await conn.query(`update tecnico set nome = '${nome}', ano_nascimento =${ano_nascimento} where id_tecnico=${idTecnico}`);
}

async function inserirTecnico(nome, ano_nascimento) {
  const conn = await connect();
  const [row] = await conn.query(`INSERT INTO tecnico (nome, ano_nascimento) VALUES (?,?)`, [nome, ano_nascimento]);
}

async function deletarTecnico(idTecnico) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM tecnico WHERE id_tecnico = ${idTecnico}`);
  return row;
}

//INICIO COPA 

//mosrta no 2ºinput do editCopa
async function selecionarTodosPaises(){
  const conn = await connect ();
  const [row]= await conn.query('select nome, id_selecao as id from selecao order by trim (nome)');

  return row
}

//mostra no copa.html
async function selectCopa() {
  const conn = await connect ();
  const [row]= await conn.query('select co.ano , se.nome , co.id_pais_sede from copa co inner Join selecao se on se.id_selecao = co.id_pais_sede order by co.ano')

  return row;
}

async function selecionarUmaCopaPeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from copa where id_pais_sede='+id);

  return row
}

async function atualizarCopa(idCopa, ano, idPais){
  const conn = await connect ();
  const [row]= await conn.query(`update copa set ano =${ano}, id_pais_sede = ${idPais} where id_pais_sede=${idCopa}`);
}

async function inserirCopa(ano,idPaisSede) {
  const conn = await connect();
  const [row] = await conn.query(`INSERT INTO copa (ano, id_pais_sede) VALUES (?, ?)`, [parseInt(ano),parseInt(idPaisSede)]);
}

async function deletarCopa(idCopa) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM copa WHERE ano = ${idCopa}`);
  return row;
}



//Incio das funções de Selecao



//Inclusao Xavier
async function selecionarTodosSelecao(){
  const conn = await connect ();
  const [row]= await conn.query('select nome, id_selecao as id from selecao order by trim (nome)');

  return row
}


async function selecionarTodosContinentes(){
  const conn = await connect ();
  const [row]= await conn.query('select nome, id_selecao as id from continente order by trim (nome)');

  return row
}


async function selecionarTodosPaises(){
  const conn = await connect ();
  const [row]= await conn.query('select nome, id_selecao as id from selecao order by trim (nome)');

  return row
}

async function selectSelecao() {
  const conn = await connect ();
  const [row]= await conn.query('select con.nome as continente , sel.nome as selecao,sel.id_selecao as idSelecao from selecao sel '
  +'inner Join continente con on con.id_continente = sel.id_continente order by trim (sel.nome)' 
)



  return row;
}

async function selecionarUmaSelecaoPeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from selecao where id_selecao='+id);

  return row
}

async function selecionarUmContinentePeloId(id){
  const conn = await connect ();
  const [row]= await conn.query('select * from continente where id_continente='+id);

  return row
}
/*
//alteracao XAVIER (faz select qdo tem preecnhida as selecoes no INPUT)
async function atualizarSelecao(idSelecao, idPais) {
  const conn = await connect();
  
  // Consulta para obter o nome do país com base no idPais
  const [selecaoRow] = await conn.query('SELECT nome FROM selecao WHERE id_selecao = ?', [idPais]);
  const nomePais = selecaoRow[0].nome;

  const [row] = await conn.query(`UPDATE selecao SET nome = '${nomePais}' WHERE id_selecao = ${idSelecao}`);
  
  console.log(`O nome da seleção com ID ${idSelecao} foi atualizado para ${nomePais}`);
  //console.log(`idSelecao =  ${idSelecao} nomePais= ${nomePais},idPais=${idPais}`);
}
*/

async function atualizarSelecao(idSelecao, idPais,continente){
  const conn = await connect ();

// Consulta para obter o id do Continente 
const [selecaoRow] = await conn.query('SELECT id_continente FROM continente WHERE nome = ?', [continente]);
const idContinente = selecaoRow[0].id_continente;

  const [row]= await conn.query(`update selecao set nome ='${idPais}',id_continente='${idContinente}' where id_selecao=${idSelecao}`);
   console.log(`Banco: idSelecao =  ${idSelecao},idPais=${idPais}, contnente: ${continente},id_continente:${idContinente}`);
}


//alteracao XAVIER
async function inserirSelecao(nomePais,ano) {
  const conn = await connect();
  const [continentRow] = await conn.query('SELECT id_continente FROM continente WHERE nome = ?', [ano]);
  const idContinente = continentRow[0].id_continente;
  const [row] = await conn.query(`INSERT INTO selecao (nome, id_continente) VALUES (?, ?)`, [nomePais,idContinente]);
}

async function deletarSelecao(idSelecao) {
  const conn = await connect();
  const [row] = await conn.query(`DELETE FROM selecao WHERE id_selecao = ${idSelecao}`);
  return row;
}




// Fim das funções de Selecao






//INICIO LANCE
async function selectLance(){
  const conn = await connect();
  const [row] = await conn.query('select la.id_lance as idLance, j1.nome as "Jogador1", '+
  'j2.nome as "Jogador2",s1.nome as "Seleção1", s2.nome as "Seleção2", '+
  'c.ano as Copa, ps.nome as "PaísSede",  ju.nome as "Juiz", '+
  'tl.nome as "TipodoLance"'+
  'from lance la '+
  'inner join jogador j1 on j1.id_jogador = la.id_jogador1 '+
  'inner join jogador j2 on j2.id_jogador = la.id_jogador2 '+
  'inner join jogo j on j.id_jogo = la.id_jogo '+
  'inner join selecao s1 on s1.id_selecao = j.id_selecao1 '+
  'inner join selecao s2 on s2.id_selecao = j.id_selecao2 '+
  'inner join juiz ju on ju.id_juiz = j.id_juiz '+
  'inner join copa c on c.ano = j.ano_copa '+
  'inner join selecao ps on ps.id_selecao = c.id_pais_sede '+
  'inner join tipo_lance tl on tl.id_tipo_lance = la.id_tipo_lance '+
  'WHERE s1.id_selecao = j1.id_selecao AND s2.id_selecao = j2.id_selecao;');
  
  return row;
}
async function selecionarIdLancePeloId(idLance){
  const conn = await connect ();
  const [row]= await conn.query(`select * from lance where id_tipo_lance=${idLance}`);

  return row
}
 



async function inserirLance(idLance,jogador1,jogador2,juiz) {

//Selects para pegar os ID
const conn = await connect();
  const [lanceRow] = await conn.query('SELECT id_tipo_lance FROM tipo_lance WHERE nome = ?', [idLance]);
  const idTipoLance = lanceRow[0].id_tipo_lance;

  const [jogador1Row] = await conn.query('SELECT id_jogador FROM jogador WHERE nome = ?', [jogador1]);
  const j1 = jogador1Row[0].id_jogador;

  const [jogador2Row] = await conn.query('SELECT id_jogador FROM jogador WHERE nome = ?', [jogador2]);
  const j2 = jogador2Row[0].id_jogador;

  const [idJuizRow] = await conn.query('SELECT id_juiz FROM juiz WHERE nome = ?', [juiz]);
  const idJui = idJuizRow[0].id_juiz;

  const [juizRow] = await conn.query('SELECT id_jogo FROM jogo WHERE id_juiz = ?', [idJui]);
  const idJogoJuiz = juizRow[0].id_jogo;


  const [row] = await conn.query(`INSERT INTO lance (id_jogador1,id_jogador2,id_jogo,id_tipo_lance) VALUES (?, ?, ?, ?)`, [j1,j2,idJogoJuiz,idTipoLance]);

  console.log(` Banco Inserir: jogador1 = ${j1}, idLance:${idLance}`);
 
}

async function deletarLance(idLance) {
  const conn = await connect();

  const [row] = await conn.query(`DELETE FROM lance WHERE id_lance = ${idLance}`);
  return row;
}


 
async function atualizarLance(jogador1,jogador2,tipodoLance,idLance){
  const conn = await connect ();

const [jogador1Row] = await conn.query('SELECT id_jogador FROM jogador WHERE nome = ?', [jogador1]);
const j1 = jogador1Row[0].id_jogador;

const [jogador2Row] = await conn.query('SELECT id_jogador FROM jogador WHERE nome = ?', [jogador2]);
const j2 = jogador2Row[0].id_jogador;

const [id_tipo_lanceRow] = await conn.query('SELECT id_tipo_lance FROM tipo_lance WHERE nome = ?', [tipodoLance]);
const tp_lance = id_tipo_lanceRow[0].id_tipo_lance;  


console.log(`Banco: tipodoLance =  ${tipodoLance},tp_lance: ${tp_lance}`);

  const [row]= await conn.query(`update lance set id_jogador1 ='${j1}',id_jogador2='${j2}',id_tipo_lance =${tp_lance}  where id_lance=${idLance}`);
 
   
}




async function selecionarTodosJuiz(){
  const conn = await connect ();
  const [row]= await conn.query('select DISTINCT nome from jogo j inner join juiz ju on ju.id_juiz = j.id_juiz;');

  return row
}



async function selecionarIdJogador(idLance){
  const conn = await connect ();

  console.log(`passando banco selecionarIdJogador idLance:${idLance}`)

  const [row]= await conn.query('select * from jogador where id_jogador ='+idLance);
  // const [row]= await conn.query('select * from jogador where id_jogador ='+idLance +' and id_selecao=57');

  return row
}

async function selecionarTodosJogador(){
  const conn = await connect ();


  const [row]= await conn.query('select nome, id_jogador as id from jogador order by trim (nome)');
  //const [row]= await conn.query('select nome, id_jogador as id from jogador where id_jogador ='+idJogador);

  return row
}














module.exports = {selectIdioma, selectLance, selectTipoLance, selecionarUmTipoLancePeloId,
  atualizarTipoLance,inserirTipoLance, deletarCon,deletarIdioma,selecionarUmIdiomaPeloId,atualizarIdioma,inserirIdioma,
  inserirContinente,atualizarContinente,selectContinente,selecionarUmContinentePeloId,inserirPaisSede,
  atualizarPaisSede,selecionarUmPaisSedePeloId,selectPaisSede, deletarTecnico, selectTecnico, selecionarUmTecnicoPeloId, 
  atualizarTecnico, inserirTecnico, selecionarTodosPaises, selectCopa, selecionarUmaCopaPeloId,selecionarTodosJuiz,selecionarTodosJogador,
  atualizarCopa, inserirCopa, deletarCopa,deletarPaisSede,inserirLance,deletarLance,atualizarLance,selecionarIdLancePeloId,selecionarIdJogador,
  selectSelecao, selecionarUmaSelecaoPeloId,atualizarSelecao,inserirSelecao,deletarSelecao,selecionarTodosSelecao,selecionarTodosContinentes,deletarTipoLance
 }


 



