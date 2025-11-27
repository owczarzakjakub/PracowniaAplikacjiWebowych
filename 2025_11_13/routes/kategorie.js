const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient()

//CREATE
router.post('/', async (req, res, next) => {
  try{
    const { nazwa } = req.body;
    if(!nazwa){
      return res.status(400).json({error: "Nazwa kategorii jest wymagana"})
    }

    const nazwaKat = await prisma.kategoria.findUnique({where: {nazwa: nazwa}})
    if(nazwaKat){
      return res.status(404).json({error: "Kategoria o podanej nazwie juz istnieje"});
    }

    const newKategoria = await prisma.kategoria.create({data: {nazwa: nazwa}});

    res.status(201).json(newKategoria);
  }catch(err){
    next(err)
  }


})

//GET ALL
router.get('/', async (req, res, next) => {
  try{
    const kategorie = await prisma.kategoria.findMany();
    res.status(200).json({kategorie});
  }catch(err){
    next(err)
  }
})

//GET ONE
router.get('/:id', async (req, res, next) => {
    try{
      const id = Number(req.params.id);

      const Kat = await prisma.kategoria.findUnique({where: {id: id}})
      if(!Kat){
        return res.status(404).json({error: "Kategoria o podanym id nie istnieje"})
      }

      return res.status(200).json(Kat);
    }catch(err){
      next(err);
    }
})

//UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const { nazwa } = req.body
    if (!nazwa) {
      return res.status(400).json({ error: 'Nazwa jest wymagana' })
    }
    const id = Number(req.params.id)
    const idKat = await prisma.kategoria.findUnique({ where: { id: id } })
    if (!idKat) {
      return res
        .status(404)
        .json({ error: 'Kategoria o podanym id nie istnieje' })
    }
    const updatedKat = prisma.kategoria.update({
      where: { id: id },
      data: { nazwa: nazwa }
    })
    res.status(200).json(updatedKat)
  } catch (err) {
    next(err)
  }
})

//DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const idKat = await prisma.kategoria.findUnique({where: {id: id}})
    if(!idKat){
      return res.status(404).json("Kategoria o podanym id nie istnieje")
    }
    const deletedKat = await prisma.kategoria.delete({where: {id: id}})
    res.status(200).json(deletedKat);
  }catch(err){
    next(err)
  }
})

module.exports = router;
