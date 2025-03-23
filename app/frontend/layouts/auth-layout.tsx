import { AuthCardLayout as AuthCardLayoutTemplate } from '@/layouts/auth/auth-card-layout';
import { AuthSimpleLayout as AuthSimpleLayoutTemplate } from '@/layouts/auth/auth-simple-layout';
import { AuthSplitLayout as AuthSplitLayoutTemplate } from '@/layouts/auth/auth-split-layout';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  layout?: "simple" | "split" | "card";
}

export function AuthLayout({ children, title, description, ...props }: AuthLayoutProps) {
  switch (props.layout) {
    case "card":
      return (
        <AuthCardLayoutTemplate title={title} description={description} {...props}>
          {children}
        </AuthCardLayoutTemplate>
      );
    case "split":
      return (
        <AuthSplitLayoutTemplate title={title} description={description} {...props}>
          {children}
        </AuthSplitLayoutTemplate>
      );
    case "simple":
    default:
      return (
        <AuthSimpleLayoutTemplate title={title} description={description} {...props}>
          {children}
        </AuthSimpleLayoutTemplate>
      );
  }
}
