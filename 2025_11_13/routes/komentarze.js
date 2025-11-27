const express = require('express');
const router = express.Router();
const {PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//CREATE
router.post('/', async (req, res, next) => {
  try{
    const { tresc, autor } = req.body;
    if(!tresc || !autor){
      return res.status(400).json({error: "tresc i autor sa wymagane"})
    }

    const newKom = await prisma.komentarz.create({
      data: {tresc: tresc, autor: autor}
    });
    res.status(201).json(newKom);
  }catch(err){
    next(err)
  }
})

//FIND ALL
router.get('/', async (req, res, next) => {
  try{
    const komentarze = await prisma.komentarz.findMany();
    res.status(200).json(komentarze);
  }catch(err){
    next(err)
  }
})

//FIND ONE
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarz.findUnique({where: {id: id}});
    if(!idKom){
      return res.status(404).json({error: "Komentarz o podanym id nie istnieje"})
    }
    res.status(200).json(idKom);
  }catch(err){
    next(err)
  }
})

//UPDATE

router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarz.findUnique({where: {id: id}});
    const { tresc, autor } = req.body;
    if(!tresc || !autor){
      return res.status(400).json({error: "tresc i autor sa wymagane"})
    }
    if(!idKom){
      return res.status(404).json({error: "Komentarz o podanym ID nie istnieje"})
    }
    const updatedKom = await prisma.komentarz.update({where: {id: id}, data: {tresc: tresc, autor: autor}});
    res.status(200).json(updatedKom);
  }catch(err){
    next(err)
  }
})

//DELETE
router.delete('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const idKom = await prisma.komentarze.findUnique({where: {id: id}});
    if(!idKom){
      return res.status(404).json({error: "Komantarz o podanym ID nie istnieje"})
    }
    const deletedKom = await prisma.komentarz.delete({where: {id: id}});
    res.status(200).json(deletedKom);
  }catch(err){
    next(err)
  }
})

module.exports = router;