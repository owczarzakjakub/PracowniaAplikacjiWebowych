const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res, next) => {
  try{
    const {tytul, tresc, kategoriaID} = req.body;
    if(!tytul || !tresc || !kategoriaID){
      return next({
        status: 400,
        message: "Pola tytul, tresc i kategoria sa wymagane"
      })
    }

    const category = await prisma.kategoria.findUnique({where: {id: kategoriaID}})
    if(!category){
      return next({
        status: 400,
        message: "Podana kategoria nie istnieje"
      })
    }

    const newWpis = await prisma.wpis.create({
      data: {tytul, tresc, kategoriaID},
    })

    res.status(201).json(newWpis)
  }catch(err){
    next(err);
  }
})
router.get('/', async (req, res, next) => {
  try{
    const wpisy = await prisma.wpis.findMany();
    res.status(200).json(wpisy);
  }catch(err){
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const wpisPoID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisPoID){
      return next({
        status: 404,
        message: "Wpis o podanym id nie istnieje"
      })
    }
    res.status(200).json(wpisPoID);
  }catch (err){
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id)
    const {tytul, tresc, kategoriaID} = req.body;
    if(!tytul || !tresc || !kategoriaID){
      return next({
        status: 400,
        message: "Pola tytul, tresc i kategoria sa wymagane"
      })
    }

    const wpisID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisID){
      return next({
        status: 400,
        message: "Wpis o podanym id nie istnieje"
      })
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


router.delete('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);

    const wpisID = await prisma.wpis.findUnique({where: {id: id}})
    if(!wpisID){
      return next({
        status: 400,
        message: "Wpis o podanym id nie istnieje"
      })
    }

    const deletedWpis = await prisma.wpis.delete({where: {id: id}});

    res.status(200).json(deletedWpis);
  }
  catch(err){
    next(err)
  }
})

module.exports = router;