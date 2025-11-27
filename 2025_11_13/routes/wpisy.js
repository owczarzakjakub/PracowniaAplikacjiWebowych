const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//CREATE
router.post('/', async (req, res, next) => {
  try{
    const {tytul, tresc, kategoriaID} = req.body;
    if(!tytul || !tresc || !kategoriaID){
      return res.status(400).json({error: "Pola tytul, tresc i kategoria sa wymagane"})
    }

    const category = await prisma.kategoria.findUnique({where: {id: kategoriaID}})
    if(!category){
      return res.status(400).json({error: "Podana kategoria nie istnieje"})
    }

    const newWpis = await prisma.wpis.create({
      data: {tytul, tresc, kategoriaID},
    })

    res.status(201).json(newWpis)
  }catch(err){
    next(err);
  }
})
 //READ ALL
router.get('/', async (req, res, next) => {
  try{
    const wpisy = await prisma.wpis.findMany();
    res.status(200).json(wpisy);
  }catch(err){
    next(err)
  }
})

//READ (ID)
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const wpisPoID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisPoID){
      return res.status(404).json({error: "Wpis o podanym ID nie istnieje"})
    }
    res.status(200).json(wpisPoID);
  }catch (err){
    next(err)
  }
})

//UPDATE

router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id)
    const {tytul, tresc, kategoriaID} = req.body;
    if(!tytul || !tresc || !kategoriaID){
      return res.status(400).json({error: "Pola tytul tresc i kategoria sa wymagane"});
    }

    const wpisID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisID){
      return res.status(400).json({error: "Wpis o podanym ID nie istnieje"});
    }

    const updatedWpis = await prisma.wpis.update({
      where: {id: id},
      data: {tytul: tytul, tresc: tresc, kategoriaID: kategoriaID}
    })

    res.status(200).json(updatedWpis);
  }
  catch(err){
    next(err)
  }
})

//DELETE

router.delete('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);

    const wpisID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisID){
      return res.status(400).json({error: "Wpis o podanym ID nie istnieje"})
    }

    const deletedWpis = await prisma.wpis.delete({where: {id: id}});

    res.status(200).json(deletedWpis);
  }
  catch(err){
    next(err)
  }
})

module.exports = router;