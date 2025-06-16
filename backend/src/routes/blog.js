import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@iotive/medium-common";
export const blogRouter = new Hono();
blogRouter.use('/*', async (c, next) => {
    try {
        const authHeader = c.req.header("authorization") || "";
        const user = await verify(authHeader, c.env.JWT_SECREAT);
        if (user) {
            c.set("userId", String(user.id));
            await next();
        }
        else {
            c.status(403);
            return c.json({
                message: "user is not logged in "
            });
        }
    }
    catch (e) {
        c.status(403);
        return c.json({
            message: "user is not logged in "
        });
    }
});
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const success = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("invalid inputs");
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorid: Number(authorId)
            }
        });
        return c.json({
            id: blog.id
        });
    }
    catch (e) {
        c.status(411);
        return c.json({ e });
    }
});
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const success = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("invalid inputs");
    }
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        });
        return c.json({
            id: blog.id
        });
    }
    catch (e) {
        c.status(411);
        return c.json({ e });
    }
});
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const blogs = await prisma.blog.findMany();
        return c.json({
            blogs
        });
    }
    catch (e) {
        c.status(411);
        return c.json({ e });
    }
});
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        });
        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        return c.json({ e });
    }
});
