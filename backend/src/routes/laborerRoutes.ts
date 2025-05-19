import { Router, Request, Response } from 'express';
import { Laborer } from '../models/laborer';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Laborer:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - hireDate
 *         - picture
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Laborer ID
 *         firstName:
 *           type: string
 *           description: Laborer's first name
 *         lastName:
 *           type: string
 *           description: Laborer's last name
 *         email:
 *           type: string
 *           description: Laborer's email address
 *         hireDate:
 *           type: string
 *           format: date-time
 *           description: Hire date
 *         picture:
 *           type: string
 *           description: URL of the laborer's picture
 *         role:
 *           type: string
 *           description: Laborer's role
 *           enum: [user, admin, supervisor]
 */

/**
 * @swagger
 * /laborers:
 *   get:
 *     summary: Get all laborers
 *     responses:
 *       200:
 *         description: List of laborers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Laborer ID
 *                   firstName:
 *                     type: string
 *                     description: Laborer's first name
 *                   lastName:
 *                     type: string
 *                     description: Laborer's last name
 *                   hireDate:
 *                     type: string
 *                     format: date-time
 *                     description: Hire date
 *                   email:
 *                     type: string
 *                     description: Laborer's email address
 *                   role:
 *                     type: string
 *                     enum: [user, admin, supervisor]
 *                     description: Laborer's role
 */

router.get('/laborers', async (req: Request, res: Response) => {
  try {
    const laborers = await Laborer.findAll({
      attributes: ['id', 'firstName', 'lastName', 'hireDate', 'email', 'role']
    });
    res.json(laborers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching laborers' });
  }
});

/**
 * @swagger
 * /laborers/{id}:
 *   get:
 *     summary: Get an laborer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Laborer ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laborer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laborer'
 *       404:
 *         description: Laborer not found
 */

router.get('/laborers/:id', async (req: Request, res: Response) => {
  try {
    const laborer = await Laborer.findByPk(req.params.id);
    if (laborer) {
      res.json(laborer);
    } else {
      res.status(404).json({ error: 'Laborer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching laborer' });
  }
});

/**
 * @swagger
 * /laborers:
 *   post:
 *     summary: Create a new laborer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laborer'
 *     responses:
 *       201:
 *         description: Laborer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laborer'
 */

router.post('/laborers', async (req: Request, res: Response) => {

  try {
    const laborerData = {
      ...req.body,
      id: uuidv4(),
    };

    const laborer = await Laborer.create(laborerData);
    res.status(201).json(laborer);
  } catch (error) {
    res.status(400).json({ error });
  }

  // try {

  //   const laborer = await Laborer.create(req.body);
  //   res.status(201).json(laborer);
  // } catch (error) {
  //   res.status(400).json({error: error})
  
  // }



});

/**
 * @swagger
 * /laborers/{id}:
 *   put:
 *     summary: Update an existing laborer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Laborer ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laborer'
 *     responses:
 *       200:
 *         description: Laborer updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laborer'
 *       404:
 *         description: Laborer not found
 */

router.post('/laborers', async (req: Request, res: Response) => {
  try {
    const laborer = await Laborer.create(req.body);
    res.status(201).json(laborer);
  } catch (error: any) {
    if (error?.name === 'SequelizeUniqueConstraintError') {

      const message = error.errors?.[0]?.message || 'Email must be unique';
      return res.status(400).json({ error: message });
    
    }

    console.error('Unexpected error creating laborer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;