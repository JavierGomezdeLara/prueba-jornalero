import { Router, Request, Response } from 'express';
import { Laborer } from '../models/laborer';

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
    const laborer = await Laborer.create(req.body);
    res.status(201).json(laborer);
  } catch (error) {
    res.status(400).json({ error: 'Error creating laborer' });
  }
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

router.put('/laborers/:id', async (req: Request, res: Response) => {
  try {
    const [updated] = await Laborer.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedLaborer = await Laborer.findByPk(req.params.id);
      res.json(updatedLaborer);
    } else {
      res.status(404).json({ error: 'Laborer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating laborer' });
  }
});

export default router;