import { Router, Request, Response } from 'express';
import { Laborer } from '../models/laborer';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegúrate de que el directorio exista
const imageDir = path.join(__dirname, '../assets/');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets'));
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

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
router.post('/laborers', upload.single('picture'), async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { firstName, lastName, email, role, hireDate } = req.body;

    const picturePath = req.file ? ` /backend/src/assets/${req.file.filename}` : '';

    const laborer = await Laborer.create({
      id,
      firstName,
      lastName,
      email,
      role,
      hireDate,
      picture: picturePath,
    });

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

// try {

//   const laborer = await Laborer.create(req.body);
//   res.status(201).json(laborer);
// } catch (error) {
//   res.status(400).json({error: error})

// }





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