const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//CREATE
router.post('/', async (req, res, next) => {
  try{
    const {tytul, tresc, kategoria} = req.body;
    if(!tytul || !tresc || !kategoria){
      return res.status(400).json({error: "Pola tytul, tresc i kategoria sa wymagane"})
    }

    const category = await prisma.kategoria.findAll({where: {nazwa: kategoria}})
    if(!category){
      return res.status(400).json({error: "Podana kategoria nie istnieje"})
    }

    const newWpis = await prisma.wpis.create({
      data: {tytul, tresc, kategoria},
    })

    res.status(201).json(newWpis)
  }catch(err){
    next(err);
  }
})
 //READ ALL
router.get('/', async (req, res, next) => {
  try{
    const wpisy = prisma.wpisy.findMany();
    if(!wpisy){
      res.status(404).json({error: "Obecnie nie istnieja zadne wpisy"})
    }
    res.status(201).json(wpisy);
  }catch(err){
    next(err)
  }
})

//READ (ID)
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const wpisPoID = prisma.wpis.findUnique({where: {id: id}})
    if(!wpisPoID){
      res.status(404).json({error: "Wpis o podanym ID nie istnieje"})
    }
    res.status(201).json(wpisPoID);
  }catch (err){
    next(err)
  }
})

//UPDATE

router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id)
    const {tytul, tresc, kategoria} = req.body;
    if(!tytul || !tresc || !kategoria){
      res.status(400).json({error: "Pola tytul tresc i kategoria sa wymagane"});
    }

    const wpisID = prisma.Wpis.findUnique({where: {id: id}})
    if(!wpisID){
      res.status(400).json({error: "Wpis o podanym ID nie istnieje"});
    }

    const updatedWpis = prisma.Wpis.update({
      where: {id: id},
      data: {tytul: tytul, tresc: tresc, kategoria: kategoria,}
    })

    res.status(201).json(updatedWpis);
  }
  catch(err){
    next(err)
  }
})

//DELETE

router.delete('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);

    const wpisID = prisma.Wpisy.findUnique({where: {id: id}})
    if(!wpisID){
      res.status(400).json({error: "Wpis o podanym ID nie istnieje"})
    }

    const deletedWpis = prisma.Wpis.delete({where: {id: id}});

    res.status(200).json(deletedWpis);
  }
  catch(err){
    next(err)
  }
})