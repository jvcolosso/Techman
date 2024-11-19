const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const read = async (req, res) => {
  try {
    const result = await prisma.equipamento.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
      const { nome, imagem, descricao, status } = req.body;

      const ativo = status === 'ativo' ? 1 : 0;

      const result = await prisma.equipamento.create({
          data: {
              equipamento: nome,
              imagem: imagem,
              descricao: descricao,
              ativo: ativo, 
              data: new Date()
          }
      });

      res.json(result);
  } catch (error) {
      console.error("Erro ao criar equipamento:", error);
      res.status(500).json({ error: "Erro ao criar equipamento" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.equipamento.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const del = async (req, res) => {
  const id = req.params.id;

  try {
      // Tenta excluir o equipamento com o ID fornecido
      const result = await db.equipamentos.delete({ where: { id } });

      // Verifica se algum registro foi excluído
      if (result === 0) {
          return res.status(404).send({ message: 'Equipamento não encontrado.' });
      }

      // Responde com 204 No Content se a exclusão foi bem-sucedida
      return res.status(204).send();
  } catch (error) {
      console.error('Erro ao excluir equipamento:', error);
      // Retorna uma resposta de erro genérica em caso de falha
      return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
}




module.exports = {
  read,
  create,
  update,
  del,
};