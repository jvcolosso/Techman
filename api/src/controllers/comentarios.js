const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    try {
        const result = await prisma.comentario.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readbyequip = async (req, res) => {
    try {
        const result = await prisma.comentario.findMany({
            where: {
                equipamento: Number(req.params.id)
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

const create = async (req, res) => {
    const { comentario, equipamentoId, perfilId } = req.body;
  
    try {
      const result = await prisma.comentario.create({
        data: {
          comentario,
          equipamento: equipamentoId,
          perfil: perfilId,           
          data: new Date(),          
        }
      });
  
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar comentário.' });
    }
  };


  const update = async (req, res) => {
    const { id } = req.params;
    const { comentario } = req.body;

    try {
        const existingComentario = await prisma.comentario.findUnique({
            where: { id: Number(id) },
        });

        if (!existingComentario) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        const result = await prisma.comentario.update({
            where: { id: Number(id) },
            data: { comentario },
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao atualizar comentário:', error);
        res.status(500).json({ error: 'Erro ao atualizar comentário.' });
    }
};


const del = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.comentario.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    read,
    readbyequip,
    create,
    update,
    del
};