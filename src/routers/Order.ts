import express from "express";
import { Service } from "../entity/Service";
import { dataSource } from "../data-source";
import _ from "lodash";
import { ServiceOrder } from "../entity/ServiceOrder";
import { ProductOrder } from "../entity/ProductOrder";
import authMiddleware from "./AuthMiddleware";
const router = express.Router();

router.get("/orders/services", authMiddleware, async (req, res) => {
  const { user } = res.locals;
  switch (user.role) {
    case "ADMIN":
      break;

    case "CUSTOMER":
      break;
  }
  const repository = dataSource.getRepository(ServiceOrder);
  const orders = await repository.find();
  res.json(orders);
});

router.get("/orders/products", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ProductOrder);
  const orders = await repository.find();
  res.json(orders);
});

router.get("/order/services/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ServiceOrder);
  const order = await repository.findOneByOrFail({ id: req?.params?.id });
  res.json(order);
});

router.get("/order/services/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ProductOrder);
  const order = await repository.findOneByOrFail({ id: req?.params?.id });
  res.json(order);
});

router.post("/add/order/services", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ServiceOrder);
  let order = req?.body;

  order = repository.create(order);
  order = repository.save(order);
  return res.send(order);
});

router.post("/add/order/products", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ProductOrder);
  let order = req?.body;

  order = repository.create(order);
  order = repository.save(order);
  return res.send(order);
});

router.put("/update/order/services/:id", authMiddleware, async (req, res) => {
  const repository = dataSource.getRepository(ServiceOrder);
  let service = await repository.findOneByOrFail({ id: req?.params?.id });
  repository.merge(service, req?.body);
  repository.save(service);
  return res.send(service);
});

router.delete(
  "/delete/order/products/:id",
  authMiddleware,
  async (req, res) => {
    const repository = dataSource.getRepository(ProductOrder);
    let service = await repository.delete(req?.params?.id);
    return res.send(service);
  }
);

export default router;