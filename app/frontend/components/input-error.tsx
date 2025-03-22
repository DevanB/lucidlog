import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: Array<string> }) {
  return message?.map((msg) => (
    <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)} key={msg} >
      {msg}
    </p>
  ))
}
