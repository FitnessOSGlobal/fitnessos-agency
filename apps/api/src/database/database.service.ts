import { Injectable } from '@nestjs/common';

import { db } from './client';

@Injectable()
export class DatabaseService {
  readonly db = db;
}