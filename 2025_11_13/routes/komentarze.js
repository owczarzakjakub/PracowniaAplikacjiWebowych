const express = require('express');
const router = express.Router();
const {PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
  try{
    const { tresc, autor } = req.body;
    if(!tresc || !autor){
      return next({
        status: 400,
        message: 'Tresc i autor sa wymagane'
      })
    }

    const newKom = await prisma.komentarz.create({
      data: {tresc: tresc, autor: autor}
    });
    res.status(201).json(newKom);
  }catch(err){
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try{
    const komentarze = await prisma.komentarz.findMany();
    res.status(200).json(komentarze);
  }catch(err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarz.findUnique({where: {id: id}});
    if(!idKom){
      return next({
        status: 404,
        message: 'Komenatarz o podanym id nie istnieje'
      })
    }
    res.status(200).json(idKom);
  }catch(err){
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarz.findUnique({where: {id: id}});
    const { tresc, autor } = req.body;
    if(!tresc || !autor){
      return next({
        status: 400,
        message: 'Tresc i autor sa wymagane'
      })
    }
    if(!idKom){
      return next({
        status: 404,
        message: 'Komenatarz o podanym id nie istnieje'
      })
    }
    const updatedKom = await prisma.komentarz.update({where: {id: id}, data: {tresc: tresc, autor: autor}});
    res.status(200).json(updatedKom);
  }catch(err){
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarze.findUnique({where: {id: id}});
    if(!idKom){
      return next({
        status: 404,
        message: 'Komenatarz o podanym id nie istnieje'
      })
    }
    const deletedKom = await prisma.komentarz.delete({where: {id: id}});
    res.status(200).json(deletedKom);
  }catch(err){
    next(err)
  }
})

module.exports = router;