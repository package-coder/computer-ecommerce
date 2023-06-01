import express from "express";
import { Service } from "../entity/Service";
import { dataSource } from "../data-source";
import _ from "lodash";
import authMiddleware from "./AuthMiddleware";
const router = express.Router();

router.get("/services", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(Service);
  const services = await repository.find();
  res.json(services);
});

router.get("/service/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(Service);
  const service = await repository.findOneByOrFail({ id: req?.params?.id });
  res.json(service);
});

router.post("/add/service", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(Service);
  let service = req?.body;

  service.name = _.startCase(service.name);
  service.category = _.lowerCase(service.category);

  service = repository.create(service);
  service = repository.save(service);
  return res.send(service);
});

router.put("/update/service/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(Service);
  let service = await repository.findOneByOrFail({ id: req?.params?.id });
  repository.merge(service, req?.body);
  repository.save(service);
  return res.send(service);
});

router.delete("/delete/service/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(Service);
  let service = await repository.delete(req?.params?.id);
  return res.send(service);
});

export default router;
