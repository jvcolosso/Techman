const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { senha } = req.body;

    try {
        const usuario = await prisma.usuario.findFirst({
            where: { 
                senha: senha }
        });

        if (!usuario) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        res.status(200).json({ perfil: usuario.perfilId });
    } catch (error) {
        console.error('Erro ao processar login:', error);
        res.status(500).json({ error: "Erro no servidor ao processar login" });
    }
};

const read = async (req, res) => {
    try {
        const result = await prisma.usuario.findMany();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const result = await prisma.usuario.create({
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.usuario.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.usuario.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    read,
    create,
    update,
    del,
    login
};