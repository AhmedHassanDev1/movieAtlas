
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
 
  locales: ['en','ar', 'de','fr','pt','zh','es'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});