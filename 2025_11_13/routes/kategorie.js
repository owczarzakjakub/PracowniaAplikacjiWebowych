const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient()

router.post('/', async (req, res, next) => {
  try{
    const { nazwa } = req.body;
    if(!nazwa){
      return next({
        status: 400,
        message: "Nazwa kategorii jest wymagana"
      })
    }

    const nazwaKat = await prisma.kategoria.findUnique({where: {nazwa: nazwa}})
    if(nazwaKat){
      return next({
        status: 404,
        message: 'Kategoria o podanej nazwie juz istnieje'
      });
    }

    const newKategoria = await prisma.kategoria.create({data: {nazwa: nazwa}});

    res.status(201).json(newKategoria);
  }catch(err){
    next(err)
  }


})

router.get('/', async (req, res, next) => {
  try{
    const kategorie = await prisma.kategoria.findMany();
    res.status(200).json({kategorie});
  }catch(err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
    try{
      const id = Number(req.params.id);

      const Kat = await prisma.kategoria.findUnique({where: {id: id}})
      if(!Kat){
        return next({
          status: 404,
          message: 'Kategoria o podanym id nie istnieje'
        })
      }

      return res.status(200).json(Kat);
    }catch(err){
      next(err);
    }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { nazwa } = req.body
    if (!nazwa) {
      return next({
        status: 404,
        message: 'Nazwa jest wymagana'
      })
    }
    const id = Number(req.params.id)
    const idKat = await prisma.kategoria.findUnique({ where: { id: id } })
    if (!idKat) {
      return next({
        status: 404,
        message: 'Kategoria o podanym id nie istnieje'
      })
    }
    const updatedKat = await prisma.kategoria.update({
      where: { id: id },
      data: { nazwa: nazwa }
    })
    res.status(200).json(updatedKat)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const idKat = await prisma.kategoria.findUnique({where: {id: id}})
    if(!idKat){
      return next({
        status: 404,
        message: 'Kategoria o podanym id nie istnieje'
      })
    }
    const deletedKat = await prisma.kategoria.delete({where: {id: id}})
    res.status(200).json(deletedKat);
  }catch(err){
    next(err)
  }
})

module.exports = router;
