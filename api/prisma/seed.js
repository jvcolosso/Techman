const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const comentario_json = require("../dados/comentarios.json");
const equipamento_json = require("../dados/equipamentos.json");
const perfil_json = require("../dados/perfis.json");
const usuario_json = require("../dados/usuarios.json");

async function importComentarios() {
  await prisma.comentario.createMany({
    data: comentario_json,
    skipDuplicates: true
    });
}

async function importEquipamentos() {
  await prisma.equipamento.createMany({
    data: equipamento_json,
    skipDuplicates: true
    });
}

async function importPerfis() {
  await prisma.perfil.createMany({
    data: perfil_json,
    skipDuplicates: true
    });
}

async function importUsuarios() {
  await prisma.usuario.createMany({
    data: usuario_json,
    skipDuplicates: true
    });
}

async function main() {
  await importComentarios();
  await importEquipamentos();
  await importPerfis();
  await importUsuarios();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  