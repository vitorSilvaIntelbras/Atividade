const request = require('supertest')
const app =  require('../index')
const db = require('../db.json')

describe('GET /produtos', () =>{
    it('pegar a lista de clientes com sucesso', async () => {
        const res = await request(app).get('/produtos').send();
        expect(res.status).toBe(200);
    });
    it('verificar se a lista de produtos esta cheia', async () => {
        const res = await request(app).get('/produtos').send();
        expect(res.body).toBeDefined();
    });
})

describe('Criar /produtos', ()=>{
    it('criar produtos com sucesso', async () => {
        
        const res = (await request(app).post('/produtos').send(
        {
            nome: 'Camisa',
            preco: 190           

        }))
    expect(res.status).toBe(204)
    const produtos = db.produtos;
    const novoProdutos = produtos.find(produtos => produtos.nome === 'Camiseta' && produtos.preco === 30);
    const produtosId = novoProdutos.id;
    console.log(produtosId)
    })
})

describe('Atualizar /produtos/:id', ()=>{
    it('atualizar produtos com sucesso', async () => {
      const id = 'cae49646-d6da-443a-972c-b64f3eb05405';
      const dados = {
        nome: 'Camiseta',
        preco: 30
      };
  
      const res = (await request(app).post(`/produtos/${id}`).send(dados));
      expect(res.status).toBe(200);
  
      const produtosAtualizado = await updateCliente(id, dados);
      expect(produtosAtualizado.nome).toBe('Blusa');
      expect(produtosAtualizado.preco).toBe(90);
    })
  })


  describe('Deletar produtos', () => {
    let clientId;
  
    beforeEach(async () => {
      const res = await request(app).post('/produtos').send({
        nome: 'cliente teste',
        email: 'cliente@gmail.com',
        
      });
      expect(res.status).toBe(204);
  
      const produtos = db.produtos;
      const novoProdutos = produtos.find(produtos => produtos.nome === 'Camiseta' && produtos.preco === 30);
  
      produtosId = novoProdutos.id;
    });
  
    afterEach(async () => {
      await request(app).delete(`/produtos/${produtosId}`);
    });
  
    it('verificar se o produtos foi deletado', async () => {
      const res = await request(app).get(`/produtos/${produtosId}`);
      expect(res.status).toBe(404);
    });
  });