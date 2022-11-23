import prisma from "../../../helper/client";

export default async function handler(req, res) {
  if (req?.method !== "GET") {
    res?.send({ message: "yntkts" });
    return;
  }

  try {
    if (!req?.query?.id) {
      const item = await prisma.car.findMany();
      res?.send(item);
    }

    const item = await prisma.car.findUnique({
      where: {
        id: req?.query?.id,
      },
    });

    res?.send(item);
  } catch (error) {
    res?.send(error);
  }
}
