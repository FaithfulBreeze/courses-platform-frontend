import { IAuthContext } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export const useProtectedRoute = async (context: IAuthContext) => {
  if (!context.user.id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
      credentials: 'include',
      method: 'POST',
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      toast(parsedResponse.message);
      redirect('/auth');
    }

    if (!parsedResponse?.user) redirect('/auth');

    context.setUser(parsedResponse.user);
  }
};
