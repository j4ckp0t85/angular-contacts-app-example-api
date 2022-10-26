import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import 'es6-shim';
import { AppModule } from './app.module';
import { config } from './config';
import { IoAdapter } from '@nestjs/platform-socket.io';


(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (config.redis.enabled) {
    app.useWebSocketAdapter(new IoAdapter(app));
    console.log('INFO: Redis adapter enabled on port ' + config.redis.port + ' and host ' + config.redis.host);
  }
  await app.listen(config.serverPort);
  console.info('SERVER IS RUNNING ON PORT', config.serverPort);
})();
