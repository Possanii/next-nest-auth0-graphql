import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class UtilsService {
  createSlug(slug: string): string {
    return slugify(slug, {
      lower: true,
    });
  }
}
