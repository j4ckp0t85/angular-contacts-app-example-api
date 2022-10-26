import { IoAdapter } from '@nestjs/platform-socket.io';
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

import * as redisIoAdapter from '@socket.io/redis-adapter';
import { INestApplicationContext } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {

  constructor(
    private readonly redisConfig: { host: string, port: number },
    appOrHttpServer?: INestApplicationContext | any
  ) {
    super(appOrHttpServer);
  }

  createIOServer(port: number, options?: any): any {
    const pubClient = createClient(this.redisConfig);
    const subClient = pubClient.duplicate();
    const redisAdapter = createAdapter(pubClient, subClient);
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
