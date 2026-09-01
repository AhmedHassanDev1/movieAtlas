import { Global, Module } from '@nestjs/common';
import { CacheService } from '../services/cache.service';

class RedisMock {
  private cache = new Map<string, { value: string; expiry?: number }>();
  
  async set(key: string, value: string, ...args: any[]) {
    let ttl: number | undefined = undefined;
    if (args[0] === 'EX' && typeof args[1] === 'number') {
      ttl = args[1];
    }
    const expiry = ttl ? Date.now() + ttl * 1000 : undefined;
    this.cache.set(key, { value, expiry });
  }

  async get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  async del(key: string) {
    this.cache.delete(key);
  }
}

const mockRedisInstance = new RedisMock();

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: mockRedisInstance,
    },
    CacheService,
  ],
  exports: ["REDIS_CLIENT", CacheService],
})
export class RedisModule {}