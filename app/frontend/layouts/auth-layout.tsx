import AuthCardLayoutTemplate from '@/layouts/auth/auth-card-layout';
import AuthSimpleLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import AuthSplitLayoutTemplate from '@/layouts/auth/auth-split-layout';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  layout?: "simple" | "split" | "card";
}

export default function AuthLayout({ children, title, description, ...props }: AuthLayoutProps) {
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
