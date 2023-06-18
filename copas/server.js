const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

const db = require("./db")

// INICIO TIPO LANCE

app.get('/tipoLance', async (req, res) => {
  const tiposLances = await db.selectTipoLance();
  res.json(tiposLances);
})

app.get('/tipoLance/:idTipoLance', async (req, res) => {
  const idTipoLance = req.params.idTipoLance;
  console.log(`Passando pelo GET idTipoLance:${idTipoLance}`)

  const tiposLances = await db.selecionarUmTipoLancePeloId(idTipoLance);
  res.json(tiposLances);
})


app.patch('/tipoLance/:idTipoLance', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  console.log(req.body)
  const idTipoLance = req.params.idTipoLance;
  db.atualizarTipoLance(idTipoLance, nome);

  res.status(200).json({ message: 'Atualizado' })
});

app.post('/tipoLance', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirTipoLance(nome);

  res.status(201).json({ message: 'Criado' })
});

app.delete('/tipoLance/:idTipoLance', async (req, res) => {

  //const idTipoLance = req.params.idTipoLance;
  const idTipoLance =parseInt(req.params.idTipoLance);

  db.deletarTipoLance(idTipoLance);

  res.status(200).json({ message: 'Deletado' })
  //console.log(`TEstando servidor tipoLance =  ${idTipoLance} `);
});

// FIM LANCE

// INICIO IDIOMA

app.get('/idioma', async (req, res) => {
  const idiomas = await db.selectIdioma();
  res.json(idiomas);
})

app.get('/idioma/:idIdioma', async (req, res) => {
  const idIdioma = req.params.idIdioma;
  console.log(idIdioma)
  const idiomas = await db.selecionarUmIdiomaPeloId(idIdioma);
  res.json(idiomas);
})

app.patch('/idioma/:idIdioma', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  } 

  console.log(req.body)
  const idIdioma = req.params.idIdioma;
  db.atualizarIdioma(idIdioma, nome);

  res.status(200).json({ message: 'Atualizado' })
});

app.post('/idioma', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirIdioma(nome);

  res.status(201).json({ message: 'Criado' })
});

app.delete('/idioma/:idIdioma', async (req, res) => {
  const idIdioma = parseInt(req.params.idIdioma);

  db.deletarIdioma(idIdioma);

  res.status(200).json({ message: 'Deletado' })
});


// FIM IDIOMA

// INICIO CONTINENTE

app.get('/continente', async (req, res) => {
  const continentes = await db.selectContinente();
  res.json(continentes);
  
})

app.get('/continente/:idContinente', async (req, res) => {
  

  const idContinente = req.params.idContinente;
  console.log(`passando pelo getId continente: ${idContinente}`);
  
  const continentes = await db.selecionarUmContinentePeloId(idContinente);
  res.json(continentes);
})

app.patch('/continente/:idContinente', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  console.log(req.body)
  const idContinente = req.params.idContinente;
  db.atualizarContinente(idContinente, nome);

  res.status(200).json({ message: 'Atualizado' })
});

app.post('/continente', async (req, res) => {
  const nome = req.body.nome;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirContinente(nome);

  res.status(201).json({ message: 'Criado' })
});

app.delete('/continente/:idContinente', async (req, res) => {
  const idContinente = req.params.idContinente;

  db.deletarCon(idContinente);

  res.status(200).json({ message: 'Deletado' })
});

// FIM CONTINENTE


// INICIO PAIS-SEDE

app.get('/paisSede', async (req, res) => {
  const paisesSede = await db.selectPaisSede();
  res.json(paisesSede);
})

app.get('/paisesSede/:idPaisSede', async (req, res) => {
  const idPaisSede = req.params.idPaisSede;
  console.log(idPaisSede)
  const paisesSede = await db.selecionarUmPaisSedePeloId(idPaisSede);
  res.json(paisesSede);
})

app.patch('/paisSede/:idPaisSede', async (req, res) => {
  const nome = req.body.nome;
  const nome1 = req.body.nome1;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  //console.log(req.body)

  const idPaisSede = req.params.idPaisSede;

   
  console.log(`Server idPaisSede:${idPaisSede} nome:${nome},nome1:${nome1}`)
  db.atualizarPaisSede(nome,nome1, idPaisSede);



 
  res.status(200).json({ message: 'Atualizado' })
});

app.post('/paisSede', async (req, res) => {
  const nome = req.body.nome;
  const nome1 = req.body.nome1;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirPaisSede(nome,nome1);

  res.status(201).json({ message: 'Criado' })
  console.log(`server paisSede: nome= ${nome}, nome1= ${nome1}`);
});

app.delete('/paisSede/:idPaisSede', async (req, res) => {
  const idPaisSede = req.params.idPaisSede;

  db.deletarPaisSede(idPaisSede);
  console.log(`SERVER delete:idPaisSede ${idPaisSede}`);

  res.status(200).json({ message: 'Deletado' })
});

// FIM PAIS SEDE

// INICIO TECNICO

app.get('/tecnico', async (req, res) => {
  const tecnicos = await db.selectTecnico();
  res.json(tecnicos);
})

app.get('/tecnico/:idTecnico', async (req, res) => {
  const idTecnico = req.params.idTecnico;
  console.log(idTecnico)
  const tecnicos = await db.selecionarUmTecnicoPeloId(idTecnico);
  res.json(tecnicos);
})

app.patch('/tecnico/:idTecnico', async (req, res) => {
  const nome = req.body.nome;
  const ano_nascimento = req.body.ano_nascimento;
  if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  console.log(req.body)
  const idTecnico = req.params.idTecnico;
  db.atualizarTecnico(idTecnico, nome, ano_nascimento);

  res.status(200).json({ message: 'Atualizado' })
});

app.post('/tecnico', async (req, res) => {
  const nome = req.body.nome;
  const ano_nascimento = req.body.ano_nascimento;
  /*if (!nome || !nome.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }
*/
  db.inserirTecnico(nome, ano_nascimento);
  console.log(` nome = ${nome},nascimento = ${ano_nascimento}      `)

  res.status(201).json({ message: 'Criado' })
});

app.delete('/tecnico/:idTecnico', async (req, res) => {
  const idTecnico = req.params.idTecnico;

  db.deletarTecnico(idTecnico);

  res.status(200).json({ message: 'Deletado' })
});

// FIM TECNICO

//INIO COPA

app.get('/copa', async (req, res) => {
  const copas = await db.selectCopa();
  res.json(copas);
})

app.get('/paises', async (req, res) => {
  const paises = await db.selecionarTodosPaises();
  res.json(paises);
})

app.get('/copa/:idCopa', async (req, res) => {
  const idCopa = req.params.idCopa;
  console.log(idCopa)
  const copas = await db.selecionarUmaCopaPeloId(idCopa);
  res.json(copas);
})

app.patch('/copa/:idCopa', async (req, res) => {
  const ano = req.body.ano;
  const idPais = req.body.idPais;
  if (!ano || !ano.trim().length) {
    res.status(422).json({ message: 'Ano Inválido' });
    return;
  }

  console.log(req.body)
  const idCopa = req.params.idCopa;
  db.atualizarCopa(idCopa, ano, idPais);

  res.status(200).json({ message: 'Atualizado' })
});

// aqui que insere no banco copa (editCopa) e depois vai mostar no copas.html
app.post('/copa', async (req, res) => {
  const ano = req.body.ano;
  const nomePais = req.body.nomePais;
  if (!ano || !ano.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirCopa(ano, nomePais);

  res.status(201).json({ message: 'Criado' })
});

app.delete('/copa/:idCopa', async (req, res) => {
  const idCopa= req.params.idCopa;

  db.deletarCopa(idCopa);

  res.status(200).json({ message: 'Deletado' })
});

//FIM COPA

// Inicio Selecao

//mostra no selecao.html
app.get('/selecao', async (req, res) => {

  const selecoes = await db.selectSelecao();
  res.json(selecoes);
})

// inclusao Xavier(mostra no 2º input do editSelecao)
app.get('/sel', async (req, res) => {
  const sel = await db.selecionarTodosSelecao();
  res.json(sel);
})


app.get('/continente', async (req, res) => {
  const continente = await db.selecionarTodosContinentes();
  res.json(continente);
})


app.get('/selecao/:idSelecao', async (req, res) => {
  const idSelecao = req.params.idSelecao;
  //console.log("idSelecao = "+idSelecao)
  const selecoes = await db.selecionarUmaSelecaoPeloId(idSelecao);
  res.json(selecoes);
})

//update selecao
app.patch('/selecao/:idSelecoes', async (req, res) => {
 const continente = req.body.continente;
  const idPais = req.body.idPais;
  if (!idPais || !idPais.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  console.log(req.body)
  const idSelecoes = req.params.idSelecoes;
  //const idContinente = req.params.idContinente;
  db.atualizarSelecao(idSelecoes,idPais,continente);

  console.log(` Update_Server - idSelecoes = ${idSelecoes} +idPais= ${idPais},continente=${continente},`);

  res.status(200).json({ message: 'Atualizado' })
});




//insert selecao
app.post('/selecao', async (req, res) => {
  const nomePais = req.body.nomePais;
  const continente = req.body.continente;

  if (!continente || !continente.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }

  db.inserirSelecao( nomePais,continente);

  res.status(201).json({ message: 'Criado' })
});



app.delete('/selecao/:idSelecao', async (req, res) => {
  const idSelecao= req.params.idSelecao;

  db.deletarSelecao(idSelecao);

  res.status(200).json({ message: 'Deletado' })
});


//Fim selecao




// INICIO LANCE

app.get('/lance', async (req, res) => {
  const lances = await db.selectLance();
  res.json(lances);
})


app.get('/lance/:idLance', async (req, res) => {
 // const idLance = req.params.tipodoLance;
  const idLance = req.params.idLance;
   
   
  console.log(`passando pelo getId idLance: ${idLance}`)

  const idLances = await db.selecionarIdLancePeloId(idLance);
  res.json(idLances);
})




app.post('/lance', async (req, res) => {
  const tipodoLance = req.body.tipodoLance;
  const jogador1 = req.body.jogador1;
  const jogador2 = req.body.jogador2;
  const juiz = req.body.juiz;
/*
  if (!continente || !continente.trim().length) {
    res.status(422).json({ message: 'Nome inválido' });
    return;
  }
  */
  console.log(` Server Inserir: juiz= ${juiz},tipodoLance: ${tipodoLance}`);
  db.inserirLance(tipodoLance,jogador1,jogador2,juiz);

  res.status(201).json({ message: 'Criado' })
});



app.patch('/lance/:idLance', async (req, res) => {

  const tipodoLance = req.body.tipodoLance;
  const jogador1 = req.body.jogador1;
  const jogador2 = req.body.jogador2;

 /*
   if (!idPais || !idPais.trim().length) {
     res.status(422).json({ message: 'Nome inválido' });
     return;
   }
 */
   console.log(req.body)
   const idLance = req.params.idLance;
   

   console.log(` Update_Server - jogador1 = ${jogador1}, tipodoLance: ${tipodoLance},idLance: ${idLance} `);
   db.atualizarLance(jogador1,jogador2,tipodoLance,idLance);
 

   res.status(200).json({ message: 'Atualizado' })
 });
 




app.delete('/lance/:idLance', async (req, res) => {
  const idLance = req.params.idLance;

  db.deletarLance(idLance);
  console.log(`Server Delete Id_Lance: ${idLance}`);

  res.status(200).json({ message: 'Deletado' })
});



/////    FIM LANCE




// INICIO JUIZ
app.get('/juiz', async (req, res) => {


  const juiz = await db.selecionarTodosJuiz();
  res.json(juiz);
})


////   FIM JUIZ







// GETs jogadores PENDENTES!

app.get('/jogador/:idLance', async (req, res) => {
  const idLance = req.params.idLance;
  
  console.log(` GET jogador1 iDlance=${idLance} `);
   const idLances = await db.selecionarIdJogador(idLance);
   res.json(idLances);
 })


 
 app.get('/jogadores', async (req, res) => {
  
 const idLance = req.query.idLance
 const idLance2 = req.params.idLance;
  console.log(` GET 3 jogaderes iDlance1=${idLance},iDlance2=${idLance2} `);
  

  const jogadores = await db.selecionarTodosJogador();
  res.json(jogadores);
})









