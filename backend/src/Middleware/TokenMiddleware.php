<?php

namespace App\Middleware;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

class TokenMiddleware
{
    public function __construct(private EntityManagerInterface $em) {}

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();
        $rotaAberta = ['/api/usuarios/login', '/api/usuarios/registrar']; //Libera rotas para registro e login

        if (in_array($request->getPathInfo(), $rotaAberta)) {
            return;
        }

        $token = $request->headers->get('Authorization');

        if (!$token) {
            $event->setResponse(new JsonResponse(['erro' => 'Token não fornecido.'], 401));
            return;
        }

        $usuario = $this->em->getRepository('App\Entity\Usuario')->findOneBy(['token' => $token]);

        if (!$usuario || !$usuario->isTokenValido()) {
            $event->setResponse(new JsonResponse(['erro' => 'Token inválido ou expirado.'], 401));
            return;
        }
    }
}
