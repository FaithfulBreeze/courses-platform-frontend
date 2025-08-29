'use client';

import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useContext, useEffect, useState } from 'react';
import { fetchCourse } from '@/repositories/fetchCourse';
import { fetchUser } from '@/repositories/fetchUser';
import { ClientContext } from '@/contexts/ClientContext';
import { AuthContext } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import { Course, User } from '@/types.generated';
import { BACKEND_URL } from '@/common/constants';

interface ICheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default function Checkout({ params }: ICheckoutPageProps) {
  const router = useRouter();
  const { client } = useContext(ClientContext);
  const authContext = useContext(AuthContext);

  const [courseId, setCourseId] = useState<number | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Protege rota, redireciona se não logado
  useEffect(() => {
    useProtectedRoute(authContext);
  }, [authContext]);

  // Pega id do curso dos params
  useEffect(() => {
    params.then(({ id }) => setCourseId(Number(id))).catch(console.error);
  }, [params]);

  // Busca curso via client/context
  useEffect(() => {
    if (!client || courseId === null) return;
    fetchCourse({ client, id: courseId }).then(setCourse).catch(console.error);
  }, [client, courseId]);

  // Busca usuário completo via client/context
  useEffect(() => {
    if (!client || !authContext.user?.id) return;
    fetchUser({ client, id: authContext.user.id }).then(setUser).catch(console.error);
  }, [client, authContext.user?.id]);

  // Inicializa Mercado Pago
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || '', {
      locale: 'pt-BR',
      siteId: 'MLB',
    });
  }, []);

  if(course && course?.students.find(s =>s.id === authContext.user.id)) {
    redirect(`/course/${course.id}`)
  }

  // Função chamada pelo CardPayment no submit (token + dados)
  const handleSubmit = async (formData: any) => {
    if (!course || !user) {
      toast.error('Informações incompletas para processar o pagamento.');
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/courses/${course.id}/create-payment`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: formData.token,
          paymentMethodId: formData.payment_method_id,
          installments: formData.installments,
          issuerId: formData.issuer_id,
          payerEmail: formData.payer.email,
          cpf: formData.payer.identification.number
        }),
      });

      const data = await res.json();

      if (data.status_detail === 'accredited') {
        toast.success('Pagamento aprovado!');
        setTimeout(() => router.push(`/course/${course.id}`), 1000);
      } else {
        toast.error(`Pagamento: ${data.status_detail || 'Recusado'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro ao processar pagamento.');
    }
  };

  if (!course || !user) return <p>Carregando...</p>;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-transparent z-10 backdrop-blur-sm" />

      <div className="z-20 w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{course.title}</h2>
        <p className="text-center text-sm text-gray-500 mb-6">Complete sua compra para ter acesso</p>

        <CardPayment
          initialization={{ amount: course.price / 100 }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
