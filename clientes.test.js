const request = require('supertest')
const app =  require('../index')
const db = require('../db.json')

describe('GET /clientes', () =>{
    it('pegar a lista de clientes com sucesso', async () => {
        const res = await request(app).get('/clientes').send();
        expect(res.status).toBe(200);
    });
    it('verificar se a lista de clientes esta cheia', async () => {
        const res = await request(app).get('/clientes').send();
        expect(res.body).toBeDefined();
    });
})

describe('Criar /clientes', ()=>{
    it('criar cliente com sucesso', async () => {
        
        const res = (await request(app).post('/clientes').send(
        {
            nome: 'vitor teste',
            email: 'vitor@gmail.com',
            senha: '1234'

        }))
    expect(res.status).toBe(204)
    const clientes = db.clientes;
    const novoCliente = clientes.find(cliente => cliente.nome === 'vitor teste' && cliente.email === 'vitor@gmail.com');
    const clientId = novoCliente.id;
    console.log(clientId)
    })
})

describe('Atualizar /clientes/:id', ()=>{
    it('atualizar clientes com sucesso', async () => {
      const id = 2
      const dados = {
        id: 2,
        nome: 'Maria Oliveria',
        email: 'maria.oliveira@example.com'
      };
  
      const res = (await request(app).post(`/produtos/${id}`).send(dados));
      expect(res.status).toBe(200);
  
      const clienteAtualizado = await updateCliente(id, dados);
      expect(clienteAtualizado.nome).toBe('Vitor');
      expect(clienteAtualizado.email).toBe('vitorsilva@gmail.com');
    })
  })


describe('Deletar cliente', () => {
    let clientId;
  
    beforeEach(async () => {
      const res = await request(app).post('/clientes').send({
        nome: 'cliente teste',
        email: 'cliente@gmail.com',
        senha: '1234'
      });
      expect(res.status).toBe(204);
  
      const clientes = db.clientes;
      const novoCliente = clientes.find(cliente => cliente.nome === 'cliente teste' && cliente.email === 'cliente@gmail.com');
  
      clientId = novoCliente.id;
    });
  
    afterEach(async () => {
      await request(app).delete(`/clientes/${clientId}`);
    });
  
    it('verificar se o cliente foi deletado', async () => {
      const res = await request(app).get(`/clientes/${clientId}`);
      expect(res.status).toBe(404);
    });
  });